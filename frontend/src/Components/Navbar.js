import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { FaFacebook, FaYoutube, FaReddit, FaUserAlt } from "react-icons/fa";
import { FaBaby, FaXTwitter } from "react-icons/fa6";
import { FaHouse } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { AuthContext } from "../Context/AuthContext";

const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--background);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Brand = styled.h1`
    font-weight: bolder;
    font-size: 36px;
    flex: 1;
    text-align: center;
    color: var(--tertiary);
`;

const Social = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
`;

const Links = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
    justify-content: space-between;
    text-align: right;
    padding: 12px;
    color: var(--tertiary);
    font-weight: bolder;
    font-size: 12px;
`;

const Navbar = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const logout = () => {
        setUser({});
        setAuth("no_auth");
        setIsLoggedIn(false);
        localStorage.clear();
        navigate("/login");
    };

    useEffect(() => {
        if (auth !== "no_auth") {
            setIsLoggedIn(true);
            setUser(JSON.parse(localStorage.getItem("user")));
        } else {
            setIsLoggedIn(false);
            setUser({});
        }
    }, [auth]);

    return (
        <Nav>
            <Social>
                <FaFacebook style={{ color: "#3b5998" }} />
                <FaXTwitter style={{ color: "var(--highlight)" }} />
                <FaYoutube style={{ color: "#c4302b" }} />
                <FaReddit style={{ color: "#ff5700" }} />
            </Social>
            <Brand>{"Nanoforum".toUpperCase()}</Brand>
            <Links>
                <Link to="/">
                    <FaHouse style={{ color: "var(--secondary)" }} />
                    &nbsp;HOME
                </Link>
                <Link to="/">
                    <FaBaby style={{ color: "var(--secondary)" }} />
                    &nbsp;ABOUT
                </Link>
                <Link to="/">
                    <FaPhone style={{ color: "var(--secondary)" }} />
                    &nbsp;CONTACT
                </Link>
                {isLoggedIn ? (
                    <>
                        <Link to={`users/${user._id}`}>
                            <FaUserAlt /> &nbsp;{user.firstname.toUpperCase()}
                        </Link>
                        <button onClick={logout}>SIGN OUT</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <FaUser style={{ color: "var(--secondary)" }} />
                            &nbsp;SIGN IN
                        </Link>
                        <Link to="/register">
                            <FaUser style={{ color: "var(--secondary)" }} />
                            &nbsp;SIGN UP
                        </Link>
                    </>
                )}
            </Links>
        </Nav>
    );
};

export default Navbar;
