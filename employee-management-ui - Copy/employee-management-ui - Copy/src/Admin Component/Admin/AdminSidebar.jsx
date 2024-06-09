import { Dashboard } from "@mui/icons-material";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
// import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import HelpIcon from "@mui/icons-material/Help";
import SupportIcon from "@mui/icons-material/Support";
// import PaymentsIcon from "@mui/icons-material/Payments";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import GroupsIcon from "@mui/icons-material/Groups";

const menu = [
  { title: "Dashboard", icon: <Dashboard />, path: "/" },
  { title: "Employees", icon: <GroupsIcon />, path: "/employees" },
  { title: "Projects", icon: <EventIcon />, path: "/projects" },
  { title: "Finance", icon: <AssignmentIndIcon />, path: "/finance" },
  { title: "Support", icon: <SupportIcon />, path: "/support" },
  { title: "FAQ'S", icon: <HelpIcon />, path: "/faqs" },
  //   { title: "Details", icon: <AdminPanelSettingsIcon />, path: "/details" },
  // { title: "Pay Slips", icon: <CloudDownloadIcon />, path: "/pay-slips" },
  {
    title: "Logout",
    icon: <LogoutIcon />,
    path: "/logout",
  },
];

const AdminSidebar = () => {
  const isSmallScreen = useMediaQuery("(max-width: 1080px)");
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      handleLogout();
      return;
    }
    setSelectedItem(item.path);
    navigate(`/admin${item.path}`);
  };

  return (
    <div>
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        //   onClose={handelClose}
        anchor="left"
        open={true}
        sx={{
          zIndex: 1,
          color: "#646cff",
          backgroundColor: "gray.900",
          //   color: "white",
          opacity: 0.9,
        }}
      >
        <div
          className="w-[40vw] lg:w-[20vw] h-screen flex flex-col 
          justify-center text-xl hover:bg-indigo-300"
          style={{ backgroundColor: "#0d0e12", color: "#679dff" }}
        >
          {menu.map((item, i) => (
            <>
              <div
                onClick={() => handleNavigate(item)}
                className="px-5 flex items-center gap-5 cursor-pointer py-7 "
                style={{
                  backgroundColor:
                    selectedItem === item.path ? "#646cff" : "transparent",
                  color: selectedItem === item.path ? "white" : "#679dff",
                  width: "",
                }}
              >
                {item.icon}
                <span className="opacity-100">{item.title}</span>
              </div>
              {i !== menu.length - 1 && (
                <Divider sx={{ borderColor: "#679dff", opacity: 0.1 }} />
              )}
            </>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default AdminSidebar;
