import { Navigate, Route, Routes } from "react-router-dom";
import { type ReactElement } from "react";
import { LoginPage } from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardLayout from "../layouts/DashboardLayout";
import Products from "../components/Products";
import Sales from "../components/Sales";

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
				<Route path='sales' element={<Sales />} />
				<Route index element={<Navigate to='products' />} />
			</Route>
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	);
};
