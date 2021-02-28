import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";
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

export default function Home({ staffs, departments, positions }) {
  const { search } = useSelector((state) => state.search);
  const router = useRouter();
  const p = router.query.p || 1;
  const { department, position } = router.query;
  const perPage = 15;
  const [allStaffs, setAllStaffs] = useState(staffs);
  const [filteredStaffs, setFilteredStaffs] = useState(allStaffs);
  console.log(allStaffs);
  const [searchedStaffs, setSearchedStaffs] = useState("");
  const filterByDepartment = (department) => {
    const department_id = departments.find(
      (item) => item.department.replaceAll(" ", "-") === department
    )._id;
    setFilteredStaffs(
      allStaffs.filter((staff) => {
        return staff.department_id === department_id;
      })
    );
  };
  const filterByPosition = (position) => {
    const position_id = positions.find(
      (item) => item.position.replaceAll(" ", "-") === position
    )._id;
    setFilteredStaffs(
      allStaffs.filter((staff) => {
        return staff.position_id === position_id;
      })
    );
  };
  useEffect(() => {
    console.log("run");
    if (department) {
      filterByDepartment(department);
    } else if (position) {
      filterByPosition(position);
    } else {
      setFilteredStaffs(allStaffs);
    }
  }, [department, position]);
  useEffect(() => {
    if (search) {
      setSearchedStaffs(
        filteredStaffs.filter(
          (staff) =>
            staff.full_name.toLowerCase().indexOf(search.toLowerCase()) > -1
        )
      );
    } else {
      setSearchedStaffs("");
    }
  }, [search]);

  const deleteStaff = async (id) => {
    const res = await axios.post("/api/staffs", { id });
    setAllStaffs(allStaffs.filter((e) => e._id !== id));
    setFilteredStaffs(filteredStaffs.filter((e) => e._id !== id));
    console.log(res);
  };
  const displayStaffs = searchedStaffs
    ? searchedStaffs.slice((p - 1) * perPage, p * perPage)
    : filteredStaffs.slice((p - 1) * perPage, p * perPage);

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
        <NewStaffModal />
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
        staffs={displayStaffs}
        positions={positions}
        departments={departments}
        p={p}
        deleteStaff={deleteStaff}
      />

      <Pagination
        p={p}
        total={searchedStaffs.length || filteredStaffs.length}
        perPage={perPage}
        department={department}
        position={position}
      />
    </Box>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();
  const staffs = await db.collection("staff_info").find({}).toArray();
  const departments = await db.collection("department").find({}).toArray();
  const positions = await db.collection("position").find({}).toArray();
  return {
    props: {
      staffs: JSON.parse(JSON.stringify(staffs)),
      departments: JSON.parse(JSON.stringify(departments)),
      positions: JSON.parse(JSON.stringify(positions)),
    },
    revalidate: 1,
  };
}
