/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

const categories = [
  { value: "FULLSTACK", label: "Fullstack" },
  { value: "FRONTEND", label: "Frontend" },
  { value: "BACKEND", label: "Backend" },
];

const technologiesList = [
  { id: 1, name: "React" },
  { id: 2, name: "Node.js" },
  { id: 3, name: "TypeScript" },
];

const CreateProjectForm = ({ onClose, setProjects }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    coordinator: "",
    technologies: [],
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTechnologiesChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData((prevData) => ({
      ...prevData,
      technologies: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      await axios.post(
        "http://localhost:9000/api/admin/projects/create-project",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const response = await axios.get(
        "http://localhost:9000/api/admin/projects/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProjects(response.data);
      onClose();
      console.log("Project created successfully!", formData);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleDelete = (chipToDelete) => {
    setFormData((prevData) => ({
      ...prevData,
      technologies: prevData.technologies.filter(
        (tech) => tech !== chipToDelete
      ),
    }));
  };

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit} className="space-y-5">
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Project Name"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.name}
        />
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Project Description"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.description}
        />
        <TextField
          fullWidth
          id="coordinator"
          name="coordinator"
          label="Coordinator"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.coordinator}
        />
        <FormControl fullWidth>
          <InputLabel id="technologies-label">Technologies</InputLabel>
          <Select
            name="technologies"
            labelId="technologies-label"
            id="technologies"
            multiple
            value={formData.technologies}
            onChange={handleTechnologiesChange}
            input={
              <OutlinedInput id="select-multiple-chip" label="Technologies" />
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value, index) => (
                  <Chip
                    key={index}
                    label={value}
                    onDelete={() => handleDelete(value)}
                  />
                ))}
              </Box>
            )}
          >
            {technologiesList.map((tech) => (
              <MenuItem key={tech.id} value={tech.name}>
                {tech.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.value} value={cat.value}>
                {cat.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" type="submit" sx={{ bgcolor: "#646cff" }}>
          Create Project
        </Button>
      </form>
    </div>
  );
};

export default CreateProjectForm;
