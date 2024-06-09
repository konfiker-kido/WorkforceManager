import { Grid } from "@mui/material";
import ProjectTable from "./ProjectTable";

const Project = () => {
  return (
    <div className="px-10 py-10">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <ProjectTable />
        </Grid>
      </Grid>
    </div>
  );
};

export default Project;
