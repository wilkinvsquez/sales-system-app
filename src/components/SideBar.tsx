import { NavLink } from "react-router-dom";
import "../assets/styles/components/sidebar.css";

const SideBar = () => {
	return (
		<nav className='sidebar'>
			<h2>Sales System</h2>
			<NavLink to='discounts' className='link'>
				Discounts
			</NavLink>
			<NavLink to='sales' className='link'>
				Ventas
			</NavLink>
			<NavLink to='products' className='link'>
				Productos
			</NavLink>
			<NavLink to='reports' className='link'>
				Reportes
			</NavLink>
		</nav>
	);
};

export default SideBar;
