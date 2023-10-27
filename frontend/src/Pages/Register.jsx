import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const RegisterContainer = styled.div`
    width: 40%;
    margin: var(--standard-margin) auto auto;
    background-color: var(--container-background);
`;
const Register = () => {
    const clearRegisterData = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirm_password: "",
    };

    const [registerFormData, setRegisterFormData] = useState(clearRegisterData);
    const navigate = useNavigate("/login");

    const registerNow = async () => {
        const newUser = {
            firstname: registerFormData.firstname,
            lastname: registerFormData.lastname,
            email: registerFormData.email,
            password: registerFormData.password,
            confirm_password: registerFormData.confirm_password,
        };

        try {
            await axios
                .post(`http://localhost:5000/api/v1/users`, newUser)
                .then((response) => {
                    navigate("/login");
                    setRegisterFormData(clearRegisterData);
                })
                .catch((e) => {
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        setRegisterFormData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirm_password: "",
        });
    }, []);

    return (
        <RegisterContainer>
            <label htmlFor="firstname">Firstname</label>
            <input
                type="text"
                id="firstname"
                name="firstname"
                onChange={(e) => {
                    setRegisterFormData({
                        ...registerFormData,
                        firstname: e.target.value,
                    });
                }}
                value={registerFormData.firstname}
            />
            <label htmlFor="lastname">Lastname</label>
            <input
                type="text"
                id="lastname"
                name="lastname"
                onChange={(e) => {
                    setRegisterFormData({
                        ...registerFormData,
                        lastname: e.target.value,
                    });
                }}
                value={registerFormData.lastname}
            />
            <label htmlFor="email">Email</label>
            <input
                type="text"
                id="email"
                name="email"
                onChange={(e) => {
                    setRegisterFormData({ ...registerFormData, email: e.target.value });
                }}
                value={registerFormData.email}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => {
                    setRegisterFormData({
                        ...registerFormData,
                        password: e.target.value,
                    });
                }}
                value={registerFormData.password}
            />
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                onChange={(e) => {
                    setRegisterFormData({
                        ...registerFormData,
                        confirm_password: e.target.value,
                    });
                }}
                value={registerFormData.confirm_password}
            />
            <button onClick={registerNow}>Sign Up</button>
        </RegisterContainer>
    );
};
export default Register;
