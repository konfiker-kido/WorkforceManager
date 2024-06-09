/* eslint-disable react/prop-types */
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Button } from "@mui/material";

const PaySlip = ({ employeeId, close }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDownload = async () => {
    const month = selectedDate
      .toLocaleString("default", { month: "long" })
      .toUpperCase();
    try {
      const response = await axios.get(`/api/employee/download/${employeeId}`, {
        params: { month },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `payslip_${month}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      close();
    } catch (error) {
      console.error("Error downloading the payslip", error);
    }
  };

  return (
    <div className="flex flex-col px-10">
      <DatePicker
        className="bg-white text-black border w-[100%] text-xl mb-5 mt-5 rounded-md px-5 p-2 border-black"
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        showFullMonthYearPicker
        placeholderText="Select Month"
      />
      <Button
        // className="float-right"
        sx={{ backgroundColor: "#646cff", width: "30%", float: "right" }}
        style={{ float: "right" }}
        variant="contained"
        onClick={handleDownload}
      >
        Download
      </Button>
    </div>
  );
};

export default PaySlip;
