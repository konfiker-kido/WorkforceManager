/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Collapse,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

const CreateEmployeeForm = ({ onSuccess, close }) => {
  const { handleSubmit, control, reset } = useForm();
  const [activeSection, setActiveSection] = useState("personalDetails");
  const [error, setError] = useState(null);
  // const [formData, setFormData] = useState({
  //   personalDetails: {},
  //   professionalDetails: {},
  //   additionalDetails: {},
  // });

  const handleSectionToggle = (section) => {
    setActiveSection((prevSection) => (prevSection === section ? "" : section));
  };

  const onSubmit = async (data) => {
    setError(null);
    // const currentData = getValues();
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [activeSection]: currentData,
    // }));
    // console.log("Form Data:", { ...formData, [activeSection]: currentData });
    try {
      const token = localStorage.getItem("jwt"); // Get JWT token from localStorage
      const response = await axios.post(
        "http://localhost:9000/api/admin/employees/employee",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        }
      );
      // if (response.status === 200) {
      console.log("Employee created successfully:", response.data);
      // setFormData(response.data);
      close();
      onSuccess();
      reset();
      // } else {
      //   console.error("Failed to create employee");
      //   setError("Failed to create employee");
      // }
    } catch (error) {
      console.error("Error creating employee:", error);
      setError("Error creating employee");
    }
  };

  return (
    <Paper className="p-6 w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Box className="mb-4">
          <Typography
            variant="h6"
            onClick={() => handleSectionToggle("personalDetails")}
            className="cursor-pointer"
          >
            Personal Details
          </Typography>
          <Collapse in={activeSection === "personalDetails"}>
            <Box className="space-y-4 mt-2">
              <Controller
                name="name"
                control={control}
                // defaultValue={formData.personalDetails.name || ""}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Name"
                    variant="outlined"
                    fullWidth
                    className="bg-white"
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                // defaultValue={formData.personalDetails.email || ""}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    className="bg-white"
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                // defaultValue={formData.personalDetails.password || ""}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    className="bg-white"
                  />
                )}
              />
              <Controller
                name="mobileNo"
                control={control}
                // defaultValue={formData.personalDetails.password || ""}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Mobile No."
                    variant="outlined"
                    fullWidth
                    type="text"
                    className="bg-white"
                  />
                )}
              />
              <Controller
                name="gender"
                control={control}
                // defaultValue={formData.personalDetails.gender || ""}
                defaultValue=""
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      {...field}
                      labelId="gender-label"
                      id="gender"
                      name="gender"
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                name="dateOfBirth"
                control={control}
                // defaultValue={formData.personalDetails.dob || ""}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Date of Birth"
                    type="date"
                    variant="outlined"
                    fullWidth
                    className="bg-white"
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Box>
          </Collapse>
        </Box>

        <Box className="mb-4">
          <Typography
            variant="h6"
            onClick={() => handleSectionToggle("professionalDetails")}
            className="cursor-pointer"
          >
            Professional Details
          </Typography>
          <Collapse in={activeSection === "professionalDetails"}>
            <Box className="space-y-4 mt-2">
              <Controller
                name="companyName"
                control={control}
                // defaultValue={formData.professionalDetails.companyName || ""}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Company Name"
                    variant="outlined"
                    fullWidth
                    className="bg-white"
                  />
                )}
              />
              <Controller
                name="salary"
                control={control}
                // defaultValue={formData.professionalDetails.salary || ""}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Salary"
                    variant="outlined"
                    fullWidth
                    className="bg-white"
                  />
                )}
              />
              <Controller
                name="experience"
                control={control}
                // defaultValue={formData.professionalDetails.experience || ""}
                defaultValue=""
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="experience-label">Experience</InputLabel>
                    <Select
                      {...field}
                      labelId="experience-label"
                      id="experience"
                      name="experience"
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map(
                        (year) => (
                          <MenuItem key={year} value={year}>
                            {year} year{year > 1 ? "s" : ""}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                name="companyLocation"
                control={control}
                // defaultValue={
                //   formData.professionalDetails.companyLocation || ""
                // }
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Company Location"
                    variant="outlined"
                    fullWidth
                    className="bg-white"
                  />
                )}
              />
              <Controller
                name="category"
                control={control}
                // defaultValue={formData.professionalDetails.bankName || ""}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Category"
                    variant="outlined"
                    fullWidth
                    className="bg-white"
                  />
                )}
              />
              <Controller
                name="bankName"
                control={control}
                // defaultValue={formData.professionalDetails.bankName || ""}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Bank Name"
                    variant="outlined"
                    fullWidth
                    className="bg-white"
                  />
                )}
              />
              <Controller
                name="accountNumber"
                control={control}
                // defaultValue={formData.professionalDetails.accountNumber || ""}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Account Number"
                    variant="outlined"
                    fullWidth
                    className="bg-white"
                  />
                )}
              />
              <Controller
                name="ifscCode"
                control={control}
                // defaultValue={formData.professionalDetails.ifscCode || ""}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="IFSC Code"
                    variant="outlined"
                    fullWidth
                    className="bg-white"
                  />
                )}
              />
            </Box>
          </Collapse>
        </Box>

        <Box className="mb-4">
          <Typography
            variant="h6"
            onClick={() => handleSectionToggle("additionalDetails")}
            className="cursor-pointer"
          >
            Additional Details
          </Typography>
          <Collapse in={activeSection === "additionalDetails"}>
            <Box className="space-y-4 mt-2">
              <Controller
                name="address"
                control={control}
                // defaultValue={formData.additionalDetails.address || ""}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Address"
                    variant="outlined"
                    fullWidth
                    className="bg-white"
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                // defaultValue={formData.additionalDetails.city || ""}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="City"
                    variant="outlined"
                    fullWidth
                    className="bg-white"
                  />
                )}
              />
              <Controller
                name="state"
                control={control}
                // defaultValue={formData.additionalDetails.state || ""}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="State"
                    variant="outlined"
                    fullWidth
                    className="bg-white"
                  />
                )}
              />
              <Controller
                name="adhaar"
                control={control}
                // defaultValue={formData.additionalDetails.aadhaarNo || ""}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Aadhaar No"
                    variant="outlined"
                    fullWidth
                    className="bg-white"
                  />
                )}
              />
              <Controller
                name="panNo"
                control={control}
                // defaultValue={formData.additionalDetails.panNo || ""}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="PAN No"
                    variant="outlined"
                    fullWidth
                    className="bg-white"
                  />
                )}
              />
            </Box>
          </Collapse>
        </Box>

        <Box className="flex justify-end mt-4">
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: "#646cff" }}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CreateEmployeeForm;
