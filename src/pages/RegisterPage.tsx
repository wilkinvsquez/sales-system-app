import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/context/AuthContext";
import authService from "../services/authService";
import "../assets/styles/pages/register.css";

const RegisterPage = () => {
	const [name, setName] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setError("Las contraseñas no coinciden.");
			return;
		}
		try {
			const { token } = await authService.register(name, password);
			login(token);
			navigate("/");
		} catch (error) {
			setError(
				"Error al registrar. Intenta con usuario o revisa tus datos.",
			);
		}
	};
	return (
		<div className='register-container'>
			<form
				className='auth-form-container'
				action=''
				onSubmit={handleSubmit}>
				<div>
					<div className='register-header'>
						<h2>Registro</h2>
					</div>
					{error && <p style={{ color: "red" }}>{error}</p>}
					<div className='input-group'>
						<input
							type='text'
							placeholder='Nombre'
							value={name}
							onChange={e => setName(e.target.value)}
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
							minLength={6}
						/>
					</div>
					<div className='input-group'>
						<input
							type='password'
							placeholder='Confirmar contraseña'
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
							required
							minLength={6}
						/>
					</div>
					<button className='btn-submit' type='submit'>
						Registrarse
					</button>
				</div>
			</form>

			<div>
				<p>
					¿Ya tienes una cuenta? <a href='/login'>Iniciar sesión</a>
				</p>
			</div>
		</div>
	);
};

export default RegisterPage;
