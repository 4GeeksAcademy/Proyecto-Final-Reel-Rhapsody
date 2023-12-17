import React, { useContext, useState, } from "react";
import { Context, } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/signup.css"
import Navbar from "./Navbar.jsx";

const LogIn = () => {

    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const logInNewUser = async () => {

        try {
            if (email == "" || password == "") {
                return "All spaces must be filled"
            }

            if (!validateEmail(email)) {
                return "Please enter a valid email address";
            }

            if (!validatePassword(password)) {
                return "Password must be at least 8 characters long";
            }

            let newLogIn = {
                email: email,
                password: password
            }

            const result = await actions.logIn(newLogIn);

            if (result.success) {
                setError("");
                navigate("/home");
            } else {
                setError(result.message || "There was an error creating the user.");
            }

        } catch (error) {
            setError("There was an error creating the user. Please try again.");
            console.log(error);
        }
    }

    return (

        <>

        <Navbar/>

            {error && <div className="error-message">{error}</div>}

            <div className='container-form'>

                <div className='information'>

                    <div className='info-childs'>

                        <h2>Welcome To Reel Rhapsody</h2>

                        <p>Do not you have an account yet?</p>

                        <p>Register now and start exploring a universe of entertainment!"</p>

                        <Link to={"/signup"}>

                            <button className="button-login">Sign In</button>

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

                            <button className='input-submit' onClick={logInNewUser} type='submit'>Log In</button>

                        </form>

                    </div>

                </div>

            </div>

        </>

    );
};

export default LogIn