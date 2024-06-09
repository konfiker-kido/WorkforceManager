import axios from "axios";

const API_URL = "http://localhost:9000/api/admin/employees/all";

const getEmployees = async (token) => {
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

const deleteEmployee = async (id) => {
  const token = localStorage.getItem("jwt");
  try {
    const response = await axios.delete(
      `http://localhost:9000/api/admin/employees/${id}`,
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

const getEmployeeProfessionalDetails = async (id, token) => {
  const response = await axios.get(
    `http://localhost:9000/api/admin/employees/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const updateEmployee = async (id, employeeData) => {
  const token = localStorage.getItem("jwt");
  const response = await axios.put(`/api/employees/${id}`, employeeData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default {
  getEmployees,
  deleteEmployee,
  getEmployeeProfessionalDetails,
  updateEmployee,
};
