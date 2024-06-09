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
import { useEffect, useState } from "react";

const category = [
  { value: "FULLSTACK", label: "Fullstack" },
  { value: "FRONTEND", label: "Frontend" },
  { value: "BACKEND", label: "Backend" },
];

const technologiesList = [
  "React",
  "Node Js",
  "TypeScript",
  "Angular",
  "Spring Boot",
  "Node Js",
  "MySql",
  "Mongo DB",
  "Java",
  "Python",
];
const ProjectUpdateForm = ({ projectId, onClose, setProjects }) => {
  const [projectData, setProjectData] = useState({
    id: "",
    name: "",
    description: "",
    technologies: [],
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTechnologiesChange = (event) => {
    const {
      target: { value },
    } = event;
    setProjectData((prevData) => ({
      ...prevData,
      technologies: typeof value === "string" ? value.split(",") : value,
    }));
  };

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get(
          `http://localhost:9000/api/admin/projects/${projectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProjectData(response.data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    if (projectId) {
      fetchProjectDetails();
    }
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      await axios.put(
        `http://localhost:9000/api/admin/projects/${projectId}`,
        projectData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const response = await axios.get(
        `http://localhost:9000/api/admin/projects/all`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProjects(response.data);
      onClose();
      console.log("Project updated successfully.......!", projectData);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Name"
        name="name"
        value={projectData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={projectData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel id="demo-multiple-chip-label">Technologies</InputLabel>
        <Select
          name="technologies"
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={projectData.technologies}
          onChange={handleTechnologiesChange}
          input={
            <OutlinedInput id="select-multiple-chip" label="Technologies" />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {technologiesList.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="category"
          value={setProjectData.category}
          label="Category"
          name="category"
          onChange={handleChange}
        >
          {category.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button onClick={onClose} sx={{ mr: 2, color: "#646cff" }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" sx={{ bgcolor: "#646cff" }}>
          Update Project
        </Button>
      </Box>
    </Box>
  );
};

export default ProjectUpdateForm;
