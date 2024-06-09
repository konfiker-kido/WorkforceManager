import { Button } from "@mui/material";

const Home = () => {
  return (
    <div className="py-20">
      <section className="banner -z-50 relative flex flex-col justify-center items-center ">
        <div className="w-[65vw]  text-center">
          <p className="text-6xl lg:text-8xl font-bold z-10 py-5">
            All of Your <span className="text-indigo-300">Employee</span> Data
            In One Inbox
          </p>
          <p className="z-10 text-gray-300 text-xl lg:text-2xl py-10">
            Add Employees to Projects in a Easy Way......
          </p>
        </div>
      </section>
      <div className="flex justify-center">
        <Button
          sx={{
            fontSize: "16px",
            backgroundColor: "#679dff",
            borderRadius: "25px 25px 25px 8px",
            padding: "8px 50px",
          }}
          className="cursor-pointer hover:bg-indigo-400"
          // color="success"
          variant="contained"
          // onClick={}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Home;
