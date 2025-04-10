import { Outlet } from "react-router-dom";
import Aside from "./components/Aside";

const DashboardLayout = () => {
  return (
    <div className="wrapper d-flex">
      <Aside />
      <div className="content p-3" style={{ flexGrow: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
