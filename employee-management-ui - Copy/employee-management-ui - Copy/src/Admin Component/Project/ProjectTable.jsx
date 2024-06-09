import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Input,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import CreateProjectForm from "./CreateProjectForm";
import ProjectCard from "./ProjectCard";
import projectService from "../Utils/projectService";

const ProjectTable = () => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [projects, setProjects] = useState([]);

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleCloseCreateProject = () => {
    setOpen(false);
  };
  const handleOpenCreateProject = () => {
    setOpen(true);
  };
  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const data = await projectService.getProjects(token);
      setProjects(data);
      console.log("Projects data", data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <section className="projectListSection w-full pt-10 lg:w-[100%] lg:pt-1 lg:space-x-24">
        <div className="flex gap-2 items-center pb-5 justify-between w-[100%] lg:w-[90%]">
          <div className="relative p-0 w-full lg:w-[30rem] ">
            <Input
              onChange={handleSearchChange}
              placeholder="Search Project"
              className="w-[70%] px-9 text-white border rounded-md pt-1 lg:ml-24"
              sx={{ color: "white", borderColor: "white" }}
            />
            <SearchIcon className="absolute top-2 left-3 lg:left-28 -ml-1" />
          </div>
          <div className="-mb-5">
            <span>Create Project</span>
            <IconButton
              onClick={handleOpenCreateProject}
              sx={{ color: "white" }}
            >
              <AddIcon />
            </IconButton>
          </div>
        </div>
        <div>
          <div className="space-y-5 min-h-[74vh]">
            {projects
              .filter((project) =>
                project.name.toLowerCase().includes(keyword.toLowerCase())
              )
              .map((item) => (
                <ProjectCard
                  key={item.id}
                  project={item}
                  setProjects={setProjects}
                />
              ))}
          </div>
        </div>
      </section>
      <Dialog
        open={open}
        onClose={handleCloseCreateProject}
        fullWidth
        // maxWidth="lg"
      >
        <DialogTitle>
          <div className="font-semibold text-2xl text-indigo-600">
            Create a Project
            <IconButton
              onClick={handleCloseCreateProject}
              style={{ float: "right", color: "#646cff", cursor: "pointer" }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <CreateProjectForm
            setProjects={setProjects}
            fetchProjects={fetchProjects}
            onClose={handleCloseCreateProject}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProjectTable;
