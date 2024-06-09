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

const EmployeeAdditionalDetails = ({ details }) => {
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
                  Address
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  City
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  State
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Mobile No.
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Adhaar No.
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                >
                  Pan No.
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
                  {details.address}
                </TableCell>
                <TableCell component="th" scope="row">
                  {details.city}
                </TableCell>
                <TableCell align="left">{details.state}</TableCell>
                <TableCell align="left">{details.mobileNo}</TableCell>
                <TableCell align="left">{details.adhaar}</TableCell>
                <TableCell align="left">{details.panNo}</TableCell>
              </TableRow>
              {/* ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default EmployeeAdditionalDetails;
