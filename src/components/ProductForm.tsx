import { useState } from "react";
import "../assets/styles/components/productForm.css";

import productService from "../services/productService";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
	const [code, setCode] = useState("");
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [unit, setUnit] = useState("unit");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!code || !name || !price || !description || !unit) {
			setError("Todos los campos son obligatorios.");
			return;
		}
		try {
			const productData = {
				code,
				name,
				price: parseFloat(price),
				description,
				unit,
			};

			const response = await productService.createProduct(productData);
			if (response.success) {
				alert("Producto guardado exitosamente.");
				navigate("/products");
				cleanForm();
			}
		} catch (error) {
			console.error("Error al guardar el producto:", error);
			setError("Error al guardar el producto. Inténtalo de nuevo.");
		}
	};
	const cleanForm = () => {
		setCode("");
		setName("");
		setPrice("");
		setDescription("");
		setUnit("");
		setError("");
	};
	return (
		<div className=''>
			<form
				className='product-form-container'
				action=''
				onSubmit={handleSubmit}>
				<div>
					<div className='product-header'>
						<h2>Añade un nuevo producto:</h2>
					</div>
					{error && <p style={{ color: "red" }}>{error}</p>}
					<div className='input-group'>
						<label>Digita el código del producto:</label>
						<input
							type='text'
							placeholder='P001'
							value={code}
							onChange={e => setCode(e.target.value)}
							required
						/>
					</div>
					<div className='input-group'>
						<label>Nombre del producto:</label>
						<input
							type='text'
							placeholder='Martillo'
							value={name}
							onChange={e => setName(e.target.value)}
							required
						/>
					</div>
					<div className='input-group'>
						<label>Descripçion del producto:</label>
						<input
							type='text'
							placeholder='Herramienta de mano con cabeza metálica y mango de madera o fibra. '
							value={description}
							onChange={e => setDescription(e.target.value)}
							required
						/>
					</div>
					<div className='input-group'>
						<label>Precio:</label>
						<input
							type='number'
							placeholder='70'
							value={price}
							onChange={e => setPrice(e.target.value)}
							required
						/>
					</div>
					<div className='input-group'>
						<label>Escoje una unidad de medida:</label>
						<select
							name='unit'
							id='unit'
							onChange={e => setUnit(e.target.value)}
							value={unit}>
							<option value='unit'>Unidad</option>
							<option value='liter'>Litro</option>
							<option value='kilo'>Kilo</option>
							<option value='gram'>Gramo</option>
							<option value='metter'>Metro</option>
						</select>
					</div>
					<button className='btn-submit' type='submit'>
						Guardar producto
					</button>
				</div>
			</form>
		</div>
	);
};

export default ProductForm;
