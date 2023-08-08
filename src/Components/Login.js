import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import "./CSS/login.css";
import Axios from "../Config/Axios";


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        let body = { email: email };
        const config = {
            headers: {
                "content-type": "application/json",
            },
            mode: "cors",
        };

        const result = await Axios.post('/getId/getAgentId', body, config);
        var agentId = result.data.agentId;
        
        setLoading(false);
        setEmail("");
        navigate("/home")
        localStorage.setItem("AgentId", agentId);
    }

    return (
        <>
            <div className="login-box">
                <h2>Login</h2>
                <div className="form">
                    <label className="margin-top" htmlFor="login-username">
                        Email Id:
                    </label>
                    <input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        type="text"
                        id="login-username"
                        name="login-username"
                        required
                    />

                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <button className="submitButton" onClick={() => handleSubmit()}>
                            Login
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

export default Login;