import { Grid } from "@mui/material";
import EmployeeTable from "./EmployeeTable";

const Employee = () => {
  return (
    <div className="px-10 py-10">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <EmployeeTable />
        </Grid>
      </Grid>
    </div>
  );
};

export default Employee;
