import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Snackbar} from "@mui/material";
import robotImg2 from "../../robot-2.png";

const Register = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false); // Controls Snackbar visibility
    const [message, setMessage] = useState(''); // Message to be displayed in Snackbar
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

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
            setIsValidEmail(true); // Empty input should not trigger validation
        } else {
            setIsValidEmail(validateEmail(newEmail));
        }
    };

    const validateEmail = (email) => {
        // Basic email validation for Gmail addresses
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    };

    const handlePasswordChange = (event) => {
        const newPass = event.target.value;
        setPassword(newPass);
    };

    const handleUsernameChange = (event) => {
        const newUsername = event.target.value;
        setUsername(newUsername);
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
        username: username,
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password)
        try {
            const { data } = await axios.post(
                "http://localhost:4000/signup",
                requestBody,
                { withCredentials: true }
            );
            console.log("data from api >>>>>",data);
            handleOpenSnackbar(data);
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
        }

    };

    const handleLoginRequest = () => {
        handleOpenSnackbar("Please wait !!");

        setTimeout(() => {
            navigate("/login");
        }, 1000);
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
                            <img src={robotImg2} alt="robo.png"/>
                        </div>
                        <div className="div-container">
                            <h1>&lt;RECORD/&gt;</h1>
                            <h2>Screen and Webcam</h2>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 section blue-section">
                        <h3 className="header">Register</h3>
                        <div className="section-2-login-panel">
                            <div className="container mt-4">
                                <div className="form-group">
                                    <div className="form-floating mb-3">
                                        <input type="email" className={`form-control  ${isValidEmail ? '' : 'is-invalid'}`} id="floatingInput"
                                               placeholder="name@example.com"
                                               value={email}
                                               onChange={handleEmailChange}
                                        ></input>
                                        <label htmlFor="floatingInput" className="text-email-head">Email address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="password" onChange={handlePasswordChange} className="form-control" id="floatingPassword" placeholder="Password"></input>
                                        <label htmlFor="floatingPassword" className="text-email-head">Password</label>
                                    </div>
                                    {!isValidEmail && (
                                        <div className="invalid-feedback">Please enter a valid email address.</div>
                                    )}
                                    <div className="form-floating mb-3">
                                        <input type="text" onChange={handleUsernameChange} className="form-control" id="floatingPassword" placeholder="Username"></input>
                                        <label htmlFor="floatingPassword" className="text-email-head">Username</label>
                                    </div>
                                    <div className="d-grid gap-2 col-6 mx-auto">
                                        <button className="btn btn-outline-secondary" onClick={handleSubmit} type="submit">Register</button>
                                    </div>

                                    <div className="sign-up-ask">

                                        <p className="text-email-head space-text">Already a user?</p>
                                        <span onClick={handleLoginRequest} className="text-email-head span-text">Login</span>

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

export default Register;