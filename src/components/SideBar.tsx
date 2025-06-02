import { NavLink } from "react-router-dom";
import "../assets/styles/components/sidebar.css";

const SideBar = () => {
	return (
		<nav className='sidebar'>
			<NavLink to='' className='link'>
				Dahsboard
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
