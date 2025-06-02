import { useEffect, useState } from "react";
import discountService from "../../services/discountService";
import deleteIcon from "../../assets/icons/icon-delete.svg";
import activateIcon from "../../assets/icons/icon-activate.svg";
import "../../assets/styles/components/discounts.css";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const Discounts = () => {
	//const [searchValue, setSearchValue] = useState("");
	const [discounts, setDiscounts] = useState([]);

	const navigate = useNavigate();
	const loadDiscounts = async () => {
		try {
			const response = await discountService.getAllDiscounts();
			setDiscounts(response.data);
		} catch (error) {
			console.error("Error al cargar los descuentos:", error);
		}
	};
	useEffect(() => {
		loadDiscounts();
	}, []);

	const handleDeactivate = async (id: number) => {
		if (
			window.confirm(
				"¿Estás seguro de que quieres eliminar este descuento?",
			)
		) {
			try {
				await discountService.deleteDiscount(id);
				await loadDiscounts();
			} catch (error) {
				console.error("Error al eliminar el descuento:", error);
			}
		}
	};

	const handleActivate = async (id: number) => {
		if (
			window.confirm(
				"¿Estás seguro de que quieres activar este descuento?",
			)
		) {
			try {
				await discountService.activateDiscount(id);
				await loadDiscounts();
			} catch (error) {
				console.error("Error al activar el descuento:", error);
			}
		}
	};

	return (
		<div className='discounts-container'>
			<div className='discounts-header'>
				<h2>Descuentos</h2>
				<div className='discounts-actions'>
					<div className='search-bar'>
						<form className='search-form'>
							<input
								type='text'
								placeholder='Buscar descuentos...'
								className='search-input'
							/>
							<button className='search-button'>Buscar</button>
						</form>
					</div>
					<button
						className='search-button'
						onClick={() => navigate("/discounts/new")}>
						Nuevo Descuento
					</button>
				</div>
			</div>
			<div className='table-scroll'>
				<table className='discounts-table'>
					<thead>
						<tr>
							<th>Código Producto</th>
							<th>Producto</th>
							<th>Descuento</th>
							<th>Inicio</th>
							<th>Final</th>
							<th>Estado</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{discounts.map((discount: any) => (
							<tr key={discount.id}>
								<td>{discount.product_code}</td>
								<td>{discount.product_name}</td>
								<td>
									{discount.discount_type === "percentage"
										? `${discount.discount_value}%`
										: `$${discount.discount_value}`}
								</td>
								<td>
									{format(discount.start_date, "yyyy-MM-dd")}
								</td>
								<td>
									{format(discount.end_date, "yyyy-MM-dd")}
								</td>
								<td>
									{discount.is_active ? "Activo" : "Inactivo"}
								</td>
								<td className='actions-buttons'>
									{discount.is_active ? (
										<button
											onClick={() =>
												handleDeactivate(discount.id)
											}>
											<img
												src={deleteIcon}
												alt='delete'
											/>
										</button>
									) : (
										<button
											onClick={() =>
												handleActivate(discount.id)
											}>
											<img
												src={activateIcon}
												alt='activate'
											/>
										</button>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Discounts;
