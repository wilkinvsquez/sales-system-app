import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/components/discounts.css";
import productService from "../../services/productService";

import discountService from "../../services/discountService";

const DiscountForm = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState("");
	const [product, setProduct] = useState("");
	const [type, setType] = useState("percentage");
	const [discount, setDiscount] = useState("");
	const [initDate, setInitDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [status, setStatus] = useState("1");

	const navigate = useNavigate();

	useEffect(() => {
		const loadProducts = async () => {
			try {
				const response = await productService.getProducts();
				setProducts(response.data);
				setProduct(response.data[0].id);
			} catch (error) {
				console.error("Error al cargar los productos:", error);
				setError("No se pudieron cargar los productos.");
			}
		};

		loadProducts();
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const discountData = {
			product_id: Number(product),
			discount_type: type,
			discount_value: parseFloat(discount),
			startDate: initDate,
			endDate: endDate,
			isActive: Number(status) === 1 ? true : false,
		};

		if (!product || !discount || !initDate || !endDate) {
			setError("Todos los campos son obligatorios.");
			return;
		}
		try {
			await discountService.createDiscount(discountData);
			navigate("/discounts");
		} catch (error) {
			console.error("Error al crear el descuento:", error);
			setError("No se pudo crear el descuento.");
		}
	};

	return (
		<div className=''>
			<form
				className='product-form-container'
				action=''
				onSubmit={handleSubmit}>
				<div>
					<div className='product-header'>
						<h2>Crear nuevo descuento</h2>
					</div>
					{error && <p style={{ color: "red" }}>{error}</p>}
					<div className='input-group'>
						<label>Digita el código del producto:</label>
						<select
							name='Products'
							onChange={e => setProduct(e.target.value)}>
							{products.map((product: any) => (
								<option key={product.id} value={product.id}>
									{product.code} - {product.name}
								</option>
							))}
						</select>
					</div>
					<div className='input-group'>
						<label>Tipo de descuento:</label>
						<input
							type='text'
							placeholder='percentage'
							value={type}
							onChange={e => setType(e.target.value)}
							disabled
						/>
					</div>
					<div className='input-group'>
						<label>Descuento:</label>
						<input
							type='number'
							placeholder='5%. '
							value={discount}
							onChange={e => setDiscount(e.target.value)}
							required
						/>
					</div>
					<div className='input-group'>
						<label>Fecha de inicio:</label>
						<input
							type='date'
							placeholder='70'
							value={initDate}
							onChange={e => setInitDate(e.target.value)}
							required
						/>
					</div>
					<div className='input-group'>
						<label>Fecha final</label>
						<input
							type='date'
							placeholder='70'
							value={endDate}
							onChange={e => setEndDate(e.target.value)}
							required
						/>
					</div>
					<div className='input-group'>
						<label>Estado</label>
						<select
							name='status'
							id='status'
							onChange={e => setStatus(e.target.value)}
							value={status}>
							<option value={1}>Activo</option>
							<option value={0}>Inactivo</option>
						</select>
					</div>

					<button className='btn-submit' type='submit'>
						Guardar Descuento
					</button>
				</div>
			</form>
		</div>
	);
};

export default DiscountForm;
