import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import MediaRecorder from "./MediaRecorder";
import './MediaRecorder.css';

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
                navigate("/login");
            }
            const { data } = await axios.post(
                "http://localhost:4000",
                {},
                { withCredentials: true }
            );
            const { status, user } = data;
            setUsername(user);
            return status
                ? <h1>hi</h1>
                : (removeCookie("token"), navigate("/login"));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    const Logout = () => {
        removeCookie("token");
        navigate("/login");
    };
    return (
        <div>
            <div className="media-recorder-full">
                <h4>Welcome {username}</h4>
                <br/>
                <MediaRecorder/>
                <button type="button" className="btn btn-dark" onClick={Logout}>LOGOUT</button>

            </div>

        </div>
    );
};

export default Home;