import { useEffect, useState } from "react";
import "../../assets/styles/components/sales.css";
import { useNavigate } from "react-router-dom";
import salesService from "../../services/salesService";

const Sales = () => {
	const [searchValue, setSearchValue] = useState("");
	const [sales, setSales] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const loadSales = async () => {
			try {
				const response = await salesService.getSales();
				if (response.success) setSales(response.data);
			} catch (error) {
				console.error("Error loading sales:", error);
			}
		};

		loadSales();
	}, []);
	const handleNewSale = () => {
		navigate("/sales/new");
	};
	const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Implement search functionality here
		console.log("Searching for:", searchValue);
	};
	return (
		<div className='sales-container'>
			<div className='sales-header'>
				<h2>Sales</h2>
				<div className='sales-actions'>
					<div className='search-bar'>
						<form onSubmit={handleSearch} className='search-form'>
							<input
								type='text'
								placeholder='Search sales...'
								className='search-input'
								value={searchValue}
								onChange={e => setSearchValue(e.target.value)}
							/>
							<button className='search-button'>Search</button>
						</form>
					</div>
					<button className='search-button' onClick={handleNewSale}>
						New Sale
					</button>
				</div>
			</div>
			<div className='table-scroll'>
				<table className='sales-table'>
					<thead>
						<tr>
							<th>Transaccion</th>
							<th>Cliente</th>
							<th>Total</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{sales.map((sale: any) => (
							<tr key={sale.id}>
								<td>{sale.transaction_code}</td>
								<td>
									{sale.customer_name} {sale.customer_surname}
								</td>
								<td>${sale.total}</td>
								<td className='actions-buttons'>
									<button>Ver </button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Sales;
