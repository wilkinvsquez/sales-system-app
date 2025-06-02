import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextType {
	isAuthenticated: boolean;
	login: (token: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [token, setToken] = useState(sessionStorage.getItem("token"));

	const login = (newToken: string) => {
		sessionStorage.setItem("token", newToken);
		setToken(newToken);
	};

	const logout = () => {
		sessionStorage.removeItem("token");
		setToken(null);
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated: !!token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
