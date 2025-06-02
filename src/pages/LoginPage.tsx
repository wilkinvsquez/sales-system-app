import { useState } from "react";
import authService from "../services/authService";
import { useAuth } from "../auth/context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../assets/styles/pages/login.css";

export const LoginPage = () => {
	const [username, setusername] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const response = await authService.login(username, password);
			if (response.token) {
				login(response.token);
				navigate("/");
			} else {
				alert("Login failed. Please check your credentials.");
			}
		} catch (error) {
			console.error("Login error:", error);
			alert("An error occurred during login. Please try again.");
		}
	};

	return (
		<>
			<div className='login-container'>
				<form
					className='auth-form-container'
					action=''
					onSubmit={handleSubmit}>
					<div className='login-header'>
						<h2>Iniciar Session</h2>
					</div>
					<div className='input-group'>
						<input
							type='text'
							placeholder='Nombre de usuario'
							value={username}
							onChange={e => setusername(e.target.value)}
							required
						/>
					</div>
					<div className='input-group'>
						<input
							type='password'
							placeholder='Contraseña'
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
						/>
					</div>
					<button className='btn-submit' type='submit'>
						Iniciar Session
					</button>
				</form>

				<div>
					<p>
						¿No tienes cuenta?{" "}
						<a href='/registration'>Regístrate aquí</a>
					</p>
				</div>
			</div>
		</>
	);
};
