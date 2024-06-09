/* eslint-disable react/prop-types */
import { Card, Chip, Menu, MenuItem } from "@mui/material";
import ProjectEmployeeTable from "./ProjectEmployeeTable";
import { useState } from "react";
import axios from "axios";

const projectStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Completed", value: "COMPLETED" },
];

const ProjectDetails = ({ projects, projectId, setProjects }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateProjectStatus = async (projectId, projectStatus) => {
    const token = localStorage.getItem("jwt");
    console.log("Token:", token); // Log the token to verify

    if (!token) {
      console.error("No token found. Please login again.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:9000/api/admin/projects/project/${projectId}/${projectStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the project status in the state
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === projectId
            ? { ...project, status: projectStatus }
            : project
        )
      );
      handleClose();
      console.log("Project status updated successfully.......!", response);
    } catch (error) {
      console.error("Failed to update project status:", error);
    }
  };

  const getChipColor = (status) => {
    switch (status) {
      case "PENDING":
        return "gray";
      case "IN_PROGRESS":
        return "orange";
      case "COMPLETED":
        return "green";
      default:
        return "red";
    }
  };

  return (
    <Card className="px-14">
      <div className="text-gray-800 pb-10 w-full">
        <h1 className="text-2xl font-bold pb-5">{projects.name}</h1>
        <div className="space-y-5 pb-10 text-sm">
          <p className="w-full md:max-w-lg lg:max-w-xl text-base font-semibold">
            {projects.description}
          </p>
          <div className="flex text-base">
            <p className="w-36 font-semibold">Coordinator: </p>
            <p>{projects.coordinator}</p>
          </div>
          <div className="flex text-base">
            <p className="w-36 font-semibold">Category: </p>
            <p>{projects.category}</p>
          </div>
          <div className="flex text-base">
            <p className="w-36 font-semibold">Start Date: </p>
            <p>{projects.startDate}</p>
          </div>
          <div className="flex text-base">
            <p className="w-36 font-semibold">End Date: </p>
            <p>{projects.endDate}</p>
          </div>
          <div className="flex text-base">
            <p className="w-36 font-semibold">Status: </p>
            <Chip
              onClick={handleClick}
              label={projects.status}
              sx={{ bgcolor: getChipColor(projects.status), color: "white" }}
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {projectStatus.map((status) => (
                <MenuItem
                  key={status.value}
                  onClick={() =>
                    handleUpdateProjectStatus(projectId, status.value)
                  }
                >
                  {status.label}
                </MenuItem>
              ))}
            </Menu>
          </div>
          <div>
            <ProjectEmployeeTable
              projects={projects}
              projectId={projectId}
              setProjects={setProjects}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectDetails;
