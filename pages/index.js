import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { connectToDatabase } from "../util/mongodb";
import Pagination from "../comps/Pagination";

import {
  Box,
  Text,
  Flex,
  Spacer,
  TableCaption,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function Home({ staffs, departments, positions }) {
  const { search } = useSelector((state) => state.search);
  const router = useRouter();
  const p = router.query.p || 1;
  const { department, position } = router.query;
  let numberOrder = (p - 1) * 15 + 1;
  const perPage = 15;

  let filteredStaffs = staffs;
  if (search) {
    filteredStaffs = filteredStaffs.filter((staff) => {
      return staff.full_name.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  }
  if (department) {
    filteredStaffs = filteredStaffs.filter((staff) => {
      return staff.department.toLowerCase().replaceAll(" ", "") === department;
    });
  }
  if (position) {
    filteredStaffs = filteredStaffs.filter((staff) => {
      return staff.position.toLowerCase().replaceAll(" ", "") === position;
    });
  }
  const displayStaffs = filteredStaffs.slice((p - 1) * perPage, p * perPage);

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
        {/* Filter Department */}
        <Menu>
          <MenuButton h="2.2rem" as={Button} rightIcon={<ChevronDownIcon />}>
            Department
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => router.push(`/?p=${p}`)}>All</MenuItem>
            {departments.map((department) => (
              <MenuItem
                key={department}
                onClick={() =>
                  router.push(
                    `/?p=1&department=${department
                      .toLowerCase()
                      .replaceAll(" ", "")}`
                  )
                }
              >
                {department}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        {/* Filter Position */}
        <Menu>
          <MenuButton
            h="2.2rem"
            as={Button}
            margin="0 2rem"
            rightIcon={<ChevronDownIcon />}
          >
            Position
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => router.push(`/?p=${p}`)}>All</MenuItem>
            {positions.slice(30, 44).map((position) => (
              <MenuItem
                key={position}
                onClick={() =>
                  router.push(
                    `/?p=1&position=${position
                      .toLowerCase()
                      .replaceAll(" ", "")}`
                  )
                }
              >
                {position}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>

      <Table variant="simple" size="sm">
        <TableCaption>Staff</TableCaption>
        <Thead>
          <Tr>
            <Th>No.</Th>
            <Th>Full name</Th>
            <Th>Birth day</Th>
            <Th>Gender</Th>
            <Th>Position</Th>
            <Th>Department</Th>
            <Th>Phone number</Th>
            <Th>Address</Th>
            <Th>City</Th>
          </Tr>
        </Thead>
        <Tbody>
          {displayStaffs.map((staff) => (
            <Tr key={staff._id}>
              <Td>{numberOrder++}</Td>
              <Td>{staff.full_name}</Td>
              <Td>{staff.birth_day}</Td>
              <Td>{staff.gender}</Td>
              <Td>{staff.position}</Td>
              <Td>{staff.department}</Td>
              <Td>{staff.phone_number}</Td>
              <Td>{staff.address}</Td>
              <Td>{staff.province}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Pagination
        p={p}
        total={filteredStaffs.length}
        perPage={perPage}
        department={department}
        position={position}
      />
    </Box>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();
  // const total = await db.collection("staff_info").countDocuments();
  const staffs = await db.collection("staff_info").find({}).toArray();
  const departments = await db.collection("staff_info").distinct("department");
  const positions = await db.collection("staff_info").distinct("position");
  return {
    props: {
      staffs: JSON.parse(JSON.stringify(staffs)),
      departments,
      positions,
    },
  };
}
