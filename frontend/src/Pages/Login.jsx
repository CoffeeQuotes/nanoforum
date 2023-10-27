import styled from "styled-components";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const LoginContainer = styled.div`
    width: 40%;
    margin: var(--standard-margin) auto auto;
    background-color: var(--container-background);
`;
const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/v1/users/login",
                { email, password }
            );
            const userData = response.data.data.user;
            const token = response.data.data.token;
            // Set token and user data in localStorage before updating context state
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userData));
            // Update context state synchronously after setting localStorage data
            setAuth(token);
            // Navigate after updating context state
            navigate("/");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <LoginContainer>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Sign in</button>
        </LoginContainer>
    );
};
export default Login;
