import { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewStaffModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [staffInfo, setStaffInfo] = useState({
    name: "",
    phone: "",
  });
  const [birthDay, setBirthDay] = useState(new Date());
  const handleChange = (name) => (e) => {
    setStaffInfo({ ...staffInfo, [name]: e.target.value });
  };
  return (
    <>
      <Button onClick={onOpen} h="2.2rem" mr="1rem">
        New Staff
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Staff</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <Input
                placeholder="Full name"
                id="name"
                onChange={handleChange("name")}
                value={staffInfo.name}
              />
              <FormLabel>Birth Day</FormLabel>
              <DatePicker
                selected={birthDay}
                onChange={(day) => setBirthDay(day)}
              />
              <FormLabel htmlFor="phone" mt="1rem">
                Phone
              </FormLabel>
              <Input
                placeholder="Phone"
                id="phone"
                onChange={handleChange("phone")}
                value={staffInfo.phone}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewStaffModal;
