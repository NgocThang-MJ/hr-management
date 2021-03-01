import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  FormControl,
  FormLabel,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Select,
  useToast,
} from "@chakra-ui/react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewStaffModal = ({ departments, positions }) => {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [staffInfo, setStaffInfo] = useState({
    full_name: "",
    phone_number: "",
    gender: "Male",
    address: "",
    province: "",
    department_id: departments[0]._id,
    position_id: positions[0]._id,
  });
  const [birthDay, setBirthDay] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (name) => (e) => {
    setStaffInfo({ ...staffInfo, [name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    setIsLoading(true);
    try {
      e.preventDefault();
      const staffData = {
        ...staffInfo,
        birth_day: birthDay.toLocaleDateString(),
      };
      const res = await axios.post("/api/staff/create", { staffData });
      onClose();
      router.push(router.asPath);
      toast({
        title: "Success",
        description: res.data.msg,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.msg,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setIsLoading(false);
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
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel htmlFor="name">Full name</FormLabel>
                <Input
                  placeholder="Full name"
                  id="name"
                  onChange={handleChange("full_name")}
                  value={staffInfo.full_name}
                  mb={4}
                />
                <FormLabel htmlFor="birth-day">Birth Day</FormLabel>
                <Flex justifyContent="space-between">
                  <Box
                    border="1px solid #CBD5E0"
                    borderRadius={5}
                    p={1}
                    w="50%"
                  >
                    <DatePicker
                      id="birth-day"
                      selected={birthDay}
                      onChange={(day) => setBirthDay(day)}
                    />
                  </Box>
                  <RadioGroup value={staffInfo.gender}>
                    <Stack direction="row">
                      <Radio
                        onClick={() =>
                          setStaffInfo({ ...staffInfo, gender: "Male" })
                        }
                        value="Male"
                      >
                        Male
                      </Radio>
                      <Radio
                        onClick={() =>
                          setStaffInfo({ ...staffInfo, gender: "Female" })
                        }
                        value="Female"
                      >
                        Female
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Flex>

                <FormLabel htmlFor="phone" mt="0.5rem">
                  Phone
                </FormLabel>
                <Input
                  placeholder="Phone"
                  id="phone"
                  onChange={handleChange("phone_number")}
                  value={staffInfo.phone_number}
                />
                <FormLabel htmlFor="address" mt="0.5rem">
                  Address
                </FormLabel>
                <Input
                  placeholder="address"
                  id="address"
                  onChange={handleChange("address")}
                  value={staffInfo.address}
                />
                <FormLabel htmlFor="city" mt="0.5rem">
                  City
                </FormLabel>
                <Input
                  placeholder="city"
                  id="city"
                  onChange={handleChange("province")}
                  value={staffInfo.province}
                />
                <Flex>
                  <Box mr={3}>
                    <FormLabel htmlFor="department">Department</FormLabel>
                    <Select id="department">
                      {departments.map((item) => (
                        <option
                          key={item._id}
                          onClick={() => {
                            setStaffInfo({
                              ...staffInfo,
                              department: item._id,
                            });
                          }}
                        >
                          {item.department}
                        </option>
                      ))}
                    </Select>
                  </Box>
                  <Box ml={3}>
                    <FormLabel htmlFor="position">Position</FormLabel>
                    <Select id="position">
                      {positions.map((item) => (
                        <option
                          key={item._id}
                          onClick={() => {
                            setStaffInfo({
                              ...staffInfo,
                              position: item._id,
                            });
                          }}
                        >
                          {item.position}
                        </option>
                      ))}
                    </Select>
                  </Box>
                </Flex>
              </FormControl>
              <Button
                isLoading={isLoading}
                type="submit"
                mt={4}
                mb={3}
                colorScheme="teal"
              >
                Create
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewStaffModal;
