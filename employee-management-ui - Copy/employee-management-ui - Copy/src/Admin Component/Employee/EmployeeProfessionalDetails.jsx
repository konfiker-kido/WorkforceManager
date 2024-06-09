/* eslint-disable react/prop-types */
import {
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const EmployeeProfessionalDetails = ({ details }) => {
  return (
    <div>
      <Card sx={{ mt: 1 }} className="border rounded-md border-indigo-200">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ fontWeight: "bold" }}>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Employee Id
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Company Name
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Category
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Salary
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Experience
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Bank Name
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Account Number
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  IFSC Code
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {[1].map((item) => ( */}
              <TableRow
                // key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {details.empId}
                </TableCell>
                <TableCell component="th" scope="row">
                  {details.companyName}
                </TableCell>
                <TableCell align="left">{details.category}</TableCell>
                <TableCell align="left">{details.salary}</TableCell>
                <TableCell align="left">
                  {details.experience} Year{details.experience > 1 ? "s" : ""}
                </TableCell>
                <TableCell align="left">{details.bankName}</TableCell>
                <TableCell align="left">{details.accountNumber}</TableCell>
                <TableCell align="left">{details.ifscCode}</TableCell>
              </TableRow>
              {/* ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default EmployeeProfessionalDetails;
