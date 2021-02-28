import {
  TableCaption,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
const TableStaffs = ({ staffs, positions, departments, p, deleteStaff }) => {
  let numberOrder = (p - 1) * 15 + 1;
  return (
    <Table variant="simple" size="sm">
      <TableCaption>Staff</TableCaption>
      <Thead>
        <Tr>
          <Th p="0.25rem 0.5rem">No.</Th>
          <Th p="0.25rem 0.5rem">Full name</Th>
          <Th p="0.25rem 0.5rem">Birth day</Th>
          <Th p="0.25rem 0.5rem">Gender</Th>
          <Th p="0.25rem 0.5rem">Position</Th>
          <Th p="0.25rem 0.5rem">Department</Th>
          <Th p="0.25rem 0.5rem">Phone number</Th>
          <Th p="0.25rem 0.5rem">Address</Th>
          <Th p="0.25rem 0.5rem">City</Th>
          <Th p="0.25rem 0.5rem">Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {staffs.map((staff) => (
          <Tr key={staff._id}>
            <Td p="0.5rem">{numberOrder++}</Td>
            <Td p="0.5rem">{staff.full_name}</Td>
            <Td p="0.5rem">{staff.birth_day}</Td>
            <Td p="0.5rem">{staff.gender}</Td>
            <Td p="0.5rem">
              {
                positions.find((item) => item._id === staff.position_id)
                  .position
              }
            </Td>
            <Td p="0.5rem">
              {
                departments.find((item) => item._id === staff.department_id)
                  .department
              }
            </Td>
            <Td p="0.5rem">{staff.phone_number}</Td>
            <Td p="0.5rem">{staff.address}</Td>
            <Td p="0.5rem">{staff.province}</Td>
            <Td p="0.5rem" display="flex">
              <IconButton size="sm" mr="0.25rem" icon={<EditIcon />} />
              <IconButton
                size="sm"
                icon={<DeleteIcon />}
                onClick={() => {
                  deleteStaff(staff._id);
                }}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TableStaffs;
