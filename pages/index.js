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
    const department_id = departments.find(
      (item) =>
        item.department.toLowerCase().replaceAll(" ", "") ===
        department.toLowerCase().replaceAll(" ", "")
    )._id;
    filteredStaffs = filteredStaffs.filter((staff) => {
      return staff.department_id === department_id;
    });
  }
  if (position) {
    const position_id = positions.find(
      (item) =>
        item.position.toLowerCase().replaceAll(" ", "") ===
        position.toLowerCase().replaceAll(" ", "")
    )._id;
    filteredStaffs = filteredStaffs.filter((staff) => {
      return staff.position_id === position_id;
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
            <MenuItem onClick={() => router.push("/")}>All</MenuItem>
            {departments.map((item) => (
              <MenuItem
                key={item._id}
                onClick={() =>
                  router.push(
                    `/?p=1&department=${item.department
                      .toLowerCase()
                      .replaceAll(" ", "")}`
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
            margin="0 2rem"
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
                    `/?p=1&position=${item.position
                      .toLowerCase()
                      .replaceAll(" ", "")}`
                  )
                }
              >
                {item.position}
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
              <Td>
                {
                  positions.find((item) => item._id === staff.position_id)
                    .position
                }
              </Td>
              <Td>
                {
                  departments.find((item) => item._id === staff.department_id)
                    .department
                }
              </Td>
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
  const staffs = await db.collection("staff_info").find({}).toArray();
  const departments = await db.collection("department").find({}).toArray();
  const positions = await db.collection("position").find({}).toArray();
  return {
    props: {
      staffs: JSON.parse(JSON.stringify(staffs)),
      departments: JSON.parse(JSON.stringify(departments)),
      positions: JSON.parse(JSON.stringify(positions)),
    },
  };
}
