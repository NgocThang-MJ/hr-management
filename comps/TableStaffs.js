import { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
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
  Button,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

import EditStaffModal from "./EditStaffModal";
const TableStaffs = ({ staffs, positions, departments, p }) => {
  let numberOrder = (p - 1) * 15 + 1;

  const router = useRouter();
  const toast = useToast();
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const confirm = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/staff/delete", { id });
      router.push(router.asPath);
      toast({
        title: "Success",
        description: res.data.msg,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.msg,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLoading(false);
    setIsOpenAlert(false);
  };
  const deleteStaff = (id_staff) => {
    setIsOpenAlert(true);
    setId(id_staff);
  };
  const editStaff = (id_staff) => {
    setId(id_staff);
    onOpen();
  };
  return (
    <>
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
                <IconButton
                  size="sm"
                  mr="0.25rem"
                  icon={<EditIcon />}
                  colorScheme="teal"
                  onClick={() => editStaff(staff._id)}
                />
                <IconButton
                  size="sm"
                  colorScheme="red"
                  icon={<DeleteIcon />}
                  onClick={() => deleteStaff(staff._id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <EditStaffModal
        departments={departments}
        positions={positions}
        isOpen={isOpen}
        onClose={onClose}
        staff={staffs.find((staff) => staff._id === id)}
      />

      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpenAlert(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Staff
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpenAlert(false)}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => confirm()}
                ml={3}
                isLoading={isLoading}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default TableStaffs;
