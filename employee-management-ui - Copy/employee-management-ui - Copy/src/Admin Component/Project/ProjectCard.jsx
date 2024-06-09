/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CircleIcon from "@mui/icons-material/Circle";
import ProjectDetails from "./ProjectDetails";
import CloseIcon from "@mui/icons-material/Close";
import projectService from "../Utils/projectService";
import ProjectUpdateForm from "./ProjectUpdateForm";

const ProjectCard = ({ project, setProjects }) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  // const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleProjectOpen = () => {
    setOpen(true);
  };
  const handleProjectClose = () => {
    setOpen(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(false);
  };

  const handleUpdateProjectOpen = () => {
    // setSelectedProjectId(id);
    setOpenUpdate(true);
  };
  const handleUpdateProjectClose = () => {
    setOpenUpdate(false);
    // setSelectedProjectId(null);
  };

  const handleDeleteProject = async (id) => {
    try {
      await projectService.deleteProject(id);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id)
      );
      console.log("Project deleted successfully.........!");
    } catch (error) {
      console.log("Error message", error);
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
    <div>
      <Card
        className="p-5 w-full lg:w-[90%] border rounded-md mb-5 shadow-xl shadow-white"
        sx={{ bgcolor: "#0d0e12", color: "white" }}
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="flex items-center gap-5">
                <h1
                  onClick={handleProjectOpen}
                  className="cursor-pointer font-bold text-lg text-white"
                >
                  {project.name}
                </h1>
                {/* <DotFilledIcon /> */}
                <CircleIcon sx={{ fontSize: ".5rem" }} />
                <p className="text-sm text-gray-400 font-semibold">
                  {project.category}
                </p>
                <CircleIcon sx={{ fontSize: ".5rem" }} />
                <Chip
                  label={project.status}
                  sx={{ bgcolor: getChipColor(project.status), color: "white" }}
                />
              </div>
              <div>
                <Button
                  id="demo-positioned-button"
                  aria-controls={anchorEl ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={anchorEl ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ color: "#535bf2" }}
                >
                  <MoreVertIcon />
                </Button>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <MenuItem
                    onClick={handleUpdateProjectOpen}
                    sx={{ color: "#535bf2" }}
                  >
                    Update
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleDeleteProject(project.id)}
                    sx={{ color: "red" }}
                  >
                    Delete
                  </MenuItem>
                </Menu>
              </div>
            </div>
            <p className="text-gray-400 text-sm">{project.description}</p>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {project.technologies.map((item) => (
              <Chip
                key={item}
                label={item}
                sx={{ bgcolor: "#535bf2", color: "white" }}
              />
            ))}
          </div>
        </div>
      </Card>
      <Dialog open={open} onClose={handleProjectClose} fullWidth maxWidth="lg">
        <DialogTitle>
          <div className="font-semibold text-2xl text-indigo-600">
            Project Details
            <IconButton
              onClick={handleProjectClose}
              style={{ float: "right", color: "#646cff", cursor: "pointer" }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <ProjectDetails
            projects={project}
            projectId={project.id}
            setProjects={setProjects}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={openUpdate}
        onClose={handleUpdateProjectClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <div className="font-semibold text-2xl text-indigo-600">
            Update Project Details
            <IconButton
              onClick={handleUpdateProjectClose}
              style={{ float: "right", color: "#646cff", cursor: "pointer" }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <ProjectUpdateForm
            projectId={project.id}
            onClose={handleUpdateProjectClose}
            setProjects={setProjects}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectCard;
