import React, {useState} from 'react';
import './Login.css';
import robotImg from '../../recording_robo.png';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Snackbar} from "@mui/material";

const Login = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');


    const handleOpenSnackbar = (message) => {
        setMessage(message);
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 5000);
    };

    const handleCloseSnackbar = () => {
        setOpen(false);
    };
    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);

        if (newEmail.trim() === '') {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(validateEmail(newEmail));
        }
    };

    const handlePasswordChange = (event) => {
        const newPass = event.target.value;
        setPassword(newPass);
    };

    const handleNameChange = (event) => {
        const newName = event.target.value;
        setName(newName);
    };

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    };
    const handleClearClick = () => {
        setEmail('');
        setIsValidEmail(true);
    };

    const handleError = (err) => {
        handleOpenSnackbar(err);
    };
    const handleSuccess = (msg) => {
        handleOpenSnackbar(msg);
    };

    const requestBody = {
        email: email,
        password: password,
    };

    const handleSignUpRequest = () => {
        handleOpenSnackbar("Please wait !!");

        setTimeout(() => {
            navigate("/register");
        }, 1000);
    };

    const requestBodyRegister = {
        email: email,
        password: password,
        username: name,
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password)
        try {
            const { data } = await axios.post(
                "http://localhost:4000/login",
                    requestBody,
                { withCredentials: true }
            );
            console.log("data from api >>>>>",data);
            handleOpenSnackbar(data);
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/");
                }, 10);
            } else {
                handleError(message);
                try {
                    const { data } = await axios.post(
                        "http://localhost:4000/signup",
                        requestBodyRegister,
                        { withCredentials: true }
                    );
                    console.log("data from api >>>>>",data);
                    // handleOpenSnackbar(data);
                    const { success, message } = data;
                    if (success) {
                        handleSuccess(message);
                        setTimeout(() => {
                            navigate("/");
                        }, 2000);
                    } else {
                        handleError(message);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleCloseSnackbar}
                message={message}
                autoHideDuration={3000}
            />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 col-md-12 section red-section">
                        <div className="image-container">
                            <img src={robotImg} alt="robo.png"/>
                        </div>
                        <div className="div-container">
                            <h1>&lt;RECORD/&gt;</h1>
                            <h2>Screen and Webcam</h2>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 section blue-section">
                        <h3 className="header">Login</h3>
                        <div className="section-2-login-panel">
                            <div className="container mt-4">
                                <div className="form-group">
                                    <div className="form-floating mb-3">
                                        <input type="email"
                                               className={`form-control  ${isValidEmail ? '' : 'is-invalid'}`}
                                               id="floatingInput"
                                               placeholder="name@example.com"
                                               value={email}
                                               onChange={handleEmailChange}
                                        ></input>
                                        <label for="floatingInput" className="text-email-head">Email address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" onChange={handleNameChange} className="form-control"
                                                placeholder="Name" id="floatingName"></input>
                                        <label htmlFor="floatingName" className="text-email-head">Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" onChange={handlePasswordChange} className="form-control"
                                               id="floatingPassword" placeholder="Password"></input>
                                        <label htmlFor="floatingPassword" className="text-email-head">Password</label>
                                    </div>

                                    {!isValidEmail && (
                                        <div className="invalid-feedback">Please enter a valid email address.</div>
                                    )}

                                    <div className="d-grid gap-2 col-6 mx-auto">
                                        <button className="btn btn-outline-secondary" onClick={handleSubmit}
                                                type="submit">login
                                        </button>
                                    </div>
                                    {/*<div className="input-group-append">*/}
                                    {/*    <button type="button" className="btn btn-outline-secondary" onClick={handleClearClick}>*/}
                                    {/*        Clear*/}
                                    {/*    </button>*/}
                                    {/*</div>*/}
                                    <div className="sign-up-ask">

                                        <p className="text-email-head space-text">Don't have an account?</p>
                                        <span onClick={handleSignUpRequest} className="text-email-head span-text">Sign up</span>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Login;