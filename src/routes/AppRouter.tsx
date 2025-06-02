import { Navigate, Route, Routes } from "react-router-dom";
import { type ReactElement } from "react";
import { LoginPage } from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardLayout from "../layouts/DashboardLayout";
import Products from "../components/Products/Products";
import ProductForm from "../components/Products/ProductForm";
import Sales from "../components/Sales";
import Discounts from "../components/Discounts/Discounts";
import DiscountForm from "../components/Discounts/DiscountForm";

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
	const token = sessionStorage.getItem("token");
	if (!token) {
		return <LoginPage />;
	}
	return children;
};
export const AppRouter = () => {
	return (
		<Routes>
			<Route path='/login' element={<LoginPage />} />
			<Route path='/registration' element={<RegisterPage />} />
			<Route
				path='/'
				element={
					<ProtectedRoute>
						<DashboardLayout />
					</ProtectedRoute>
				}>
				<Route path='products' element={<Products />} />
				<Route path='products/new' element={<ProductForm />} />
				<Route path='products/edit/:id' element={<ProductForm />} />
				<Route path='sales' element={<Sales />} />
				<Route path='discounts' element={<Discounts />} />
				<Route path='discounts/new' element={<DiscountForm />} />
				<Route path='discounts/edit/:id' element={<DiscountForm />} />
				<Route index element={<Navigate to='products' />} />
			</Route>
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	);
};
