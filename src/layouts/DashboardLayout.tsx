import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";
import "../assets/styles/layouts/dashboardLayout.css";

const DashboardLayout = () => {
	return (
		<div className='dashboard-layout'>
			<div className='sidebar-container'>
				<Sidebar />
			</div>
			<div className='content-container'>
				<Outlet />
			</div>
		</div>
	);
};

export default DashboardLayout;
