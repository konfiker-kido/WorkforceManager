import axios from "axios";

const API_URL = "http://localhost:9000/api/admin/projects/all";

const getProjects = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};
const deleteProject = async (id) => {
  const token = localStorage.getItem("jwt");
  try {
    const response = await axios.delete(
      `http://localhost:9000/api/admin/projects/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting employee:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const updateProject = async (id, projectData) => {
  const token = localStorage.getItem("jwt");
  const response = await axios.put(
    `http://localhost:9000/api/admin/projects/${id}`,
    projectData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export default {
  getProjects,
  deleteProject,
  updateProject,
};
