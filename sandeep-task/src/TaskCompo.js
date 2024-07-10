import {
  Button,
  Center,
  Container,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";

const TaskCompo = () => {
  const toast = useToast();
  const [selectedDate, setSelectedDate] = useState(null);
  const CustomInput = ({ value, onClick }) => (
    <InputGroup>
      <Input
        placeholder="Date of Birth"
        value={value}
        onClick={onClick}
        readOnly
        width="390px"
      />
      <InputRightElement onClick={onClick}>
        <FaCalendarAlt cursor="pointer" />
      </InputRightElement>
    </InputGroup>
  );
  const [isSameAddress, setIsSameAddress] = useState(true);
  const [residentialAddress, setResidentialAddress] = useState({
    street1: "",
    street2: "",
  });
  const [permanentAddress, setPermanentAddress] = useState({
    street1: "",
    street2: "",
  });
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsSameAddress(isChecked);
    if (isChecked) {
      setPermanentAddress(residentialAddress);
    } else {
      setPermanentAddress({ street1: "", street2: "" });
    }
  };
  const handleResidentialAddressChange = (e) => {
    const { name, value } = e.target;
    const newAddress = { ...residentialAddress, [name]: value };
    setResidentialAddress(newAddress);
    if (isSameAddress) {
      setPermanentAddress(newAddress);
    }
  };
  const [rows, setRows] = useState([
    { fileName: "", fileType: "", file: null },
  ]);

  const handleAddRow = () => {
    const isAllFilled = rows.every(
      (row) => row.fileName && row.fileType && row.file
    );
    if (isAllFilled) {
      const newRows = [{ fileName: "", fileType: "", file: null }, ...rows];
      setRows(newRows);
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  };

  const handleDeleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };
    setRows(newRows);
  };

  const handleFileChange = (index, file) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], file };
    setRows(newRows);
  };
  const handleFileLabelClick = (index) => {
    if (index === 0) {
      document.getElementById(`fileInput-${index}`).click();
    }
  };

  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
      <div border=" " marginTop="70px" width="150%">
        <Text
          color="black"
          fontSize="xx-large"
          fontWeight="600"
          textAlign="center"
        >
          MERN STACK MACHINE TEST
        </Text>
        <Container maxW="850px" bg="white">
          <Center>
            {" "}
            <div className="row" style={{ width: "100%" }}>
              <div className="col-md-6" sty>
                <FormControl isRequired>
                  <FormLabel>First name</FormLabel>
                  <Input placeholder="First name" />
                </FormControl>
              </div>
              <div className="col-md-6">
                <FormControl isRequired>
                  <FormLabel>Last name</FormLabel>
                  <Input placeholder="First name" />
                </FormControl>
              </div>
            </div>
          </Center>
          <Center>
            <div className="row" style={{ width: "100%", marginTop: "20px" }}>
              <div className="col-md-6">
                <FormControl isRequired>
                  <FormLabel> Email</FormLabel>
                  <Input placeholder="ex.myname@example.com" />
                </FormControl>
              </div>
              <div className="col-md-6">
                <FormControl isRequired>
                  <FormLabel>Date of Birth</FormLabel>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    customInput={<CustomInput />}
                    dateFormat="MM/dd/yyyy"
                  />
                  <Text fontSize="small">(Min. age should be 18 Years)</Text>
                </FormControl>
              </div>
            </div>
          </Center>
          <Center>
            <div className="row" style={{ width: "100%", marginTop: "10px" }}>
              <Text fontSize="large" fontWeight="600" marginTop="10px">
                Residential Address
              </Text>
              <div className="col-md-6">
                <FormControl isRequired>
                  <FormLabel>Street 1</FormLabel>
                  <Input
                    placeholder="Street 1"
                    name="street1"
                    value={residentialAddress.street1}
                    onChange={handleResidentialAddressChange}
                  />
                </FormControl>
              </div>
              <div className="col-md-6">
                <FormControl isRequired>
                  <FormLabel>Street 2</FormLabel>
                  <Input
                    placeholder="Street 2"
                    name="street2"
                    value={residentialAddress.street2}
                    onChange={handleResidentialAddressChange}
                  />
                </FormControl>
              </div>
              <Checkbox
                marginTop="20px"
                defaultChecked
                onChange={handleCheckboxChange}
              >
                Same as Residential Address
              </Checkbox>
              <Text fontSize="large" fontWeight="600">
                Permanent Address
              </Text>
              <div className="col-md-6">
                <FormControl isRequired>
                  <FormLabel>Street 1</FormLabel>
                  <Input
                    placeholder="Street 1"
                    name="street1"
                    value={
                      isSameAddress
                        ? residentialAddress.street1
                        : permanentAddress.street1
                    }
                    onChange={(e) => {
                      if (!isSameAddress) {
                        setPermanentAddress({
                          ...permanentAddress,
                          street1: e.target.value,
                        });
                      }
                    }}
                  />
                </FormControl>
              </div>
              <div className="col-md-6">
                <FormControl isRequired>
                  <FormLabel>Street 2</FormLabel>
                  <Input
                    placeholder="Street 2"
                    name="street2"
                    value={
                      isSameAddress
                        ? residentialAddress.street2
                        : permanentAddress.street2
                    }
                    onChange={(e) => {
                      if (!isSameAddress) {
                        setPermanentAddress({
                          ...permanentAddress,
                          street2: e.target.value,
                        });
                      }
                    }}
                  />
                </FormControl>
              </div>
            </div>
          </Center>

          <Center>
            <div className="row" style={{ width: "100%" }}>
              <Text
                color="black"
                fontSize="large"
                fontWeight="600"
                marginTop="27px"
              >
                Upload Documents
              </Text>
              {rows.map((row, index) => (
                <div
                  key={index}
                  className="row"
                  style={{ width: "100%", marginTop: "10px" }}
                >
                  <div className="col-md-4">
                    <FormControl isRequired>
                      <FormLabel>File Name</FormLabel>
                      <Input
                        placeholder="File Name"
                        value={row.fileName}
                        onChange={(e) =>
                          handleInputChange(index, "fileName", e.target.value)
                        }
                        disabled={index !== 0} // Disable input for non-first rows
                      />
                    </FormControl>
                  </div>
                  <div className="col-md-3">
                    <FormControl isRequired>
                      <FormLabel>Type Of File</FormLabel>
                      <Select
                        placeholder="Type Of File"
                        value={row.fileType}
                        onChange={(e) =>
                          handleInputChange(index, "fileType", e.target.value)
                        }
                        disabled={index !== 0} // Disable select for non-first rows
                      >
                        <option value="document1">Aadhar Card</option>
                        <option value="document2">Pan Card</option>
                        <option value="document3">Experience Letter</option>
                        <option value="document4">Offer Letter</option>
                        <option value="document5">Image</option>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-md-3">
                    <FormControl isRequired>
                      <FormLabel>Upload Document</FormLabel>
                      <Input
                        id={`fileInput-${index}`}
                        type="file"
                        style={{ display: "none", border: "1px solid black" }}
                        onChange={(e) =>
                          handleFileChange(index, e.target.files[0])
                        }
                      />
                      <label
                        htmlFor={`fileInput-${index}`}
                        onClick={() => handleFileLabelClick(index)}
                        style={{ cursor: "pointer", width: "100%" }}
                      >
                        {row.file ? row.file.name : "Choose File"}
                      </label>
                    </FormControl>
                  </div>
                  <div
                    className="col-md-2"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "1.75rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    {index > 0 && (
                      <span
                        onClick={() => handleDeleteRow(index)}
                        style={{ background: "black" }}
                      >
                        <RiDeleteBin5Line
                          style={{
                            color: "white",
                            width: "30px",
                            height: "30px",
                            padding: "5px",
                          }}
                        />
                      </span>
                    )}
                    {index === 0 && (
                      <sapn
                        onClick={handleAddRow}
                        style={{ background: "black" }}
                      >
                        <IoMdAdd
                          style={{
                            color: "white",
                            width: "30px",
                            height: "30px",
                            padding: "5px",
                          }}
                        />
                      </sapn>
                    )}
                  </div>
                </div>
              ))}
              {showAlert &&
                toast({
                  title: "Please Fill the All Inputes.",
                  status: "error",
                  duration: 2000,
                  isClosable: true,
                  position: "top-right",
                })}
            </div>
          </Center>

          <Center>
            <Button
              width="50%"
              marginBottom="20px"
              marginTop="20px"
              style={{
                background: "black",
                color: "white",
                height: "60px",
                fontSize: "25px",
              }}
            >
              Submit
            </Button>
          </Center>
        </Container>
      </div>
    </>
  );
};

export default TaskCompo;
