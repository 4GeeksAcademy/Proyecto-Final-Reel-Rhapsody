import React, { useContext, useState, } from "react";
import { Context, } from "../store/appContext.js";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/signup.css"
import Navbar from "./Navbar.jsx";

const LogIn = () => {

    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [error, setError] = useState(null);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const handlerlogInNewUser = async () => {

        try {

            if (email == "" || password == "") {
                setError("All spaces must be filled");
                return
            }

            if (!validateEmail(email)) {
                setError("Please enter a valid email address");
                return
            }

            if (!validatePassword(password)) {
                setError("Password must be at least 8 characters long");
                return
            }

            let newLogIn = {
                email: email,
                password: password
            }

            const result = await actions.logIn(newLogIn);

            if (result.access_token) {

                localStorage.setItem("token", result.access_token);

                console.log("Usuario logueado:", result.fullName);
                actions.isAuth()

                navigate("/");
            } else {

                console.log("Hubo un problema al iniciar sesión");
            }

        } catch (e) {
            console.error(e);
            setError("An error occurred while logging in");
        }
    }

    return (

        <>

            <div className='container-form'>

                <div className='information'>

                    <div className='info-childs'>

                        <h2>Welcome To Reel Rhapsody</h2>

                        <p>Do not you have an account yet?</p>

                        <p>Register now and start exploring a universe of entertainment!"</p>

                        <Link to={"/signup"}>

                            <button className="button-login input-submit">Sign In</button>

                        </Link>

                    </div>

                </div>

                <div className='form-information'>

                    <div className='forminformation-childs'>

                        <h2>Log In</h2>

                        <div className='icons'>
                            <i className="fa-brands fa-google"></i>
                            <i className="fa-brands fa-facebook"></i>
                            <i className="fa-brands fa-instagram"></i>
                        </div>

                        <p>Use your email to register</p>

                        <form className='form'>

                            <label htmlFor='email'>
                                <i className="fa-solid fa-envelope"></i>
                                <input type='email' id='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </label>

                            <label htmlFor='password'>
                                <i className="fa-solid fa-lock"></i>
                                <input type='password' id='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </label>

                            <p className="text-primary mt-4">Forgot your password?</p>

                            {error && <p className="error-message">{error}</p>}

                            <button className='input-submit' onClick={handlerlogInNewUser} type='button'>Log In</button>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
};

export default LogIn