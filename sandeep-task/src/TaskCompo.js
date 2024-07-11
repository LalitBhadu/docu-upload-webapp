import {
  Button,
  Center,
  Container,
  Input,
  Select,
  Text,
  Checkbox,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
import * as mod from "./url";
import InputMask from "react-input-mask";

const TaskCompo = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [residentialAddress, setResidentialAddress] = useState({
    street1: "",
    street2: "",
  });
  const [permanentAddress, setPermanentAddress] = useState({
    street1: "",
    street2: "",
  });
  const [sameAsResidential, setSameAsResidential] = useState(true);
  const [rows, setRows] = useState([
    { fileName: "", fileType: "", file: null },
  ]);
  const [showAlert, setShowAlert] = useState(false);

  // Handle Changes
  const handleResidentialAddressChange = (e) => {
    const { name, value } = e.target;
    setResidentialAddress({ ...residentialAddress, [name]: value });
  };

  const handlePermanentAddressChange = (e) => {
    const { name, value } = e.target;
    if (!sameAsResidential) {
      setPermanentAddress({ ...permanentAddress, [name]: value });
    }
  };

  const handleCheckboxChange = (e) => {
    setSameAsResidential(e.target.checked);
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

  // Form Submission
  const submitHandler = async () => {
    setLoading(true);

    try {
      const requestData = {
        firstName,
        lastName,
        email,
        dob,
        residentialAddress,
        permanentAddress,
        rows,
      };

      const { data } = await axios.post(
        `${mod.api_url}/api/users`,
        requestData
      );

      // Clear form data after successful submission
      setFirstName("");
      setLastName("");
      setEmail("");
      setDob("");
      setResidentialAddress({ street1: "", street2: "" });
      setPermanentAddress({ street1: "", street2: "" });
      setRows([{ fileName: "", fileType: "", file: null }]);
      setSameAsResidential(true);

      toast({
        title: "Form Submitted Successfully.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.error("Error during Form Submission:", error);
      toast({
        title: "Error during Form Submission.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setLoading(false);
    }
  };

  const [error, setError] = useState("");
  const handleDobChange = (e) => {
    const value = e.target.value;
    setDob(value);

    // Simple validation to check if date is in correct format and age is at least 18
    const dobPattern = /^\d{4}-\d{2}-\d{2}$/;
    if (dobPattern.test(value)) {
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age >= 18) {
        setError("");
      } else {
        setError("You must be at least 18 years old.");
      }
    } else {
      setError("Please enter a valid date in YYYY-MM-DD format.");
    }
  };

  return (
    <Container maxW="850px" bg="white" marginTop="70px">
      <Center>
        <Text
          fontSize="xx-large"
          fontWeight="600"
          color="black"
          textAlign="center"
        >
          MERN STACK MACHINE TEST
        </Text>
      </Center>

      <Center>
        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-6">
            <FormControl isRequired>
              <FormLabel>First name</FormLabel>
              <Input
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>
          </div>
          <div className="col-md-6">
            <FormControl isRequired>
              <FormLabel>Last name</FormLabel>
              <Input
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormControl>
          </div>
        </div>
      </Center>

      <Center>
        <div className="row" style={{ width: "100%", marginTop: "20px" }}>
          <div className="col-md-6">
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          </div>
          <div className="col-md-6">
            <FormControl isRequired>
              <FormLabel>Date of Birth</FormLabel>
              <InputMask
                mask="9999-99-99"
                value={dob}
                onChange={handleDobChange}
                placeholder="2000/12/08"
              >
                {(inputProps) => <Input {...inputProps} type="text" />}
              </InputMask>
              <Text fontSize="small">(Minimum age should be 18 years)</Text>
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
          {!sameAsResidential && (
            <>
              <Text fontSize="large" fontWeight="600">
                Permanent Address
              </Text>
              <div className="col-md-6">
                <FormControl isRequired>
                  <FormLabel>Street 1</FormLabel>
                  <Input
                    placeholder="Street 1"
                    name="street1"
                    value={permanentAddress.street1}
                    onChange={handlePermanentAddressChange}
                  />
                </FormControl>
              </div>
              <div className="col-md-6">
                <FormControl isRequired>
                  <FormLabel>Street 2</FormLabel>
                  <Input
                    placeholder="Street 2"
                    name="street2"
                    value={permanentAddress.street2}
                    onChange={handlePermanentAddressChange}
                  />
                </FormControl>
              </div>
            </>
          )}
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
                    <option value="image">Image</option>
                    <option value="pdf">Pdf</option>
                  </Select>
                  <Text fontSize="small">(image, pdf)</Text>
                </FormControl>
              </div>
              <div className="col-md-3">
                <FormControl isRequired>
                  <FormLabel>Upload Document</FormLabel>
                  <Input
                    id={`fileInput-${index}`}
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileChange(index, e.target.files[0])}
                  />
                  <label
                    htmlFor={`fileInput-${index}`}
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
                    style={{ background: "black", cursor: "pointer" }}
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
                  <span
                    onClick={handleAddRow}
                    style={{ background: "black", cursor: "pointer" }}
                  >
                    <IoMdAdd
                      style={{
                        color: "white",
                        width: "30px",
                        height: "30px",
                        padding: "5px",
                      }}
                    />
                  </span>
                )}
              </div>
            </div>
          ))}
          {showAlert &&
            toast({
              title: "Please Fill All Fields.",
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
          onClick={submitHandler}
          isLoading={loading}
          loadingText="Submitting"
        >
          Submit
        </Button>
      </Center>
    </Container>
  );
};

export default TaskCompo;
