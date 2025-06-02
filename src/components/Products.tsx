import { useEffect, useState } from "react";
import productService from "../services/productService"; // Adjust the path as necessary
import "../assets/styles/components/products.css"; // Adjust the path as necessary

const Products = () => {
	const [searchValue, setSearchValue] = useState("");
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const loadProducts = async () => {
			try {
				const fetchProducts = await productService.getProducts();
				setProducts(fetchProducts);
			} catch (error) {
				console.error("Failed to load products", error);
			}
		};

		loadProducts();
	}, []);

	const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const searchProducts = await productService.searchProducts(searchValue);
		setProducts(searchProducts);
	};
	return (
		<div className='products-container'>
			<div className='products-header'>
				<h2>Products</h2>

				<div className='search-bar'>
					<form onSubmit={handleSearch} className='search-form'>
						<input
							type='text'
							placeholder='Search products...'
							className='search-input'
							value={searchValue}
							onChange={e => setSearchValue(e.target.value)}
						/>
						<button className='search-button'>Search</button>
					</form>
				</div>
			</div>

			<table className='products-table'>
				<thead>
					<tr>
						<th>Código</th>
						<th>Nombre</th>
						<th>Precio</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product: any) => (
						<tr key={product.id}>
							<td>{product.code}</td>
							<td>{product.name}</td>
							<td>${product.price}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Products;
