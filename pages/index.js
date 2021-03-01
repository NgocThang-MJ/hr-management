import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { connectToDatabase } from "../util/mongodb";
import Pagination from "../comps/Pagination";

import {
  Box,
  Text,
  Flex,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import NewStaffModal from "../comps/NewStaffModal";
import TableStaffs from "../comps/TableStaffs";

export default function Home({ staffs, departments, positions, total }) {
  const { search } = useSelector((state) => state.search);
  const router = useRouter();
  let { p, department, position } = router.query;
  p = p || 1;
  const perPage = 15;
  const [searchedStaffs, setSearchedStaffs] = useState("");
  useEffect(() => {
    if (search) {
      setSearchedStaffs(
        staffs.filter(
          (staff) =>
            staff.full_name.toLowerCase().indexOf(search.toLowerCase()) > -1
        )
      );
    } else {
      setSearchedStaffs("");
    }
  }, [search]);

  return (
    <Box p="1rem">
      <Head>
        <title>HR Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex>
        <Text fontSize="2rem" fontWeight="bold">
          Staff
        </Text>
        <Spacer />
        {/* New Staff Modal */}
        <NewStaffModal departments={departments} positions={positions} />
        {/* Filter Department */}
        <Menu>
          <MenuButton h="2.2rem" as={Button} rightIcon={<ChevronDownIcon />}>
            Department
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => router.push("/")}>All</MenuItem>
            {departments.map((item) => (
              <MenuItem
                key={item._id}
                onClick={() =>
                  router.push(
                    `/?p=1&department=${item.department.replaceAll(" ", "-")}`
                  )
                }
              >
                {item.department}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        {/* Filter Position */}
        <Menu>
          <MenuButton
            h="2.2rem"
            as={Button}
            margin="0 1rem"
            rightIcon={<ChevronDownIcon />}
          >
            Position
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => router.push("/")}>All</MenuItem>
            {positions.map((item) => (
              <MenuItem
                key={item._id}
                onClick={() =>
                  router.push(
                    `/?p=1&position=${item.position.replaceAll(" ", "-")}`
                  )
                }
              >
                {item.position}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>

      <TableStaffs
        staffs={searchedStaffs || staffs}
        positions={positions}
        departments={departments}
        p={p}
      />

      <Pagination
        p={p}
        total={total}
        perPage={perPage}
        department={department}
        position={position}
      />
    </Box>
  );
}

export async function getServerSideProps(context) {
  let { p, department, position } = context.query;
  const limit = 15;
  const { db } = await connectToDatabase();
  let query = {};
  if (department) {
    department = department.split("-").join(" ");
    let department_id = await db
      .collection("department")
      .findOne({ department });
    department_id = department_id._id;
    query = { department_id };
  } else if (position) {
    position = position.split("-").join(" ");
    let position_id = await db.collection("position").findOne({ position });
    position_id = position_id._id;
    query = { position_id };
  }
  const staffs = await db
    .collection("staff_info")
    .aggregate([
      {
        $match: query,
      },
      { $skip: (parseInt(p) - 1 || 1) * limit },
      { $limit: limit },
    ])
    .toArray();
  const total = await db.collection("staff_info").find(query).count();
  const departments = await db.collection("department").find({}).toArray();
  const positions = await db.collection("position").find({}).toArray();
  return {
    props: {
      staffs: JSON.parse(JSON.stringify(staffs)),
      departments: JSON.parse(JSON.stringify(departments)),
      positions: JSON.parse(JSON.stringify(positions)),
      total,
    },
  };
}
