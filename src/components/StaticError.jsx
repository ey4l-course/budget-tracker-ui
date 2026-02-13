import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "../assets/ErrorPage.css";
import errImg from "../assets/errorMsg.png"
import ntwrkErrImg from "../assets/networkErrorMsg.png"

export const StaticError = () => {
    const location = useLocation();
    const nav = useNavigate();
    const err = location.state?.error;

    useEffect(() => {
        if (!err)
            nav("/login");
    }, [err, nav]);
    
    if (!err){
        return null;
    }

    const mailtoHref = `mailto:support@app.local?subject=ticket ${err.logID || "Unknown"}`;

return (
        <div className="main">
            <div className="error-content-wrapper">

                {err.status === 500 && (
                    <div className="error-message-group">
                        <img src={errImg} alt="Error illustration" className="error-illustration" />
                        <h2>Hmmm... This is awkward...</h2>
                        <p>guess it could happen</p>
                        
                        <div className="log-id-container">
                            <span className="log-id-text">Log ID: {err.logID}</span>
                        </div>

                        <div className="error-footer">
                            <a href={mailtoHref} className="contact-link">
                                <button type="button">Contact us</button>
                            </a>
                        </div>
                    </div>
                )}

                {err.status === "NETWORK" && (
                    <div className="error-message-group">
                        <img src={ntwrkErrImg} alt="Network Error illustration" className="error-illustration" />
                        <h2>Network error</h2>
                        <p>Description: {err.details}</p>
                        <button type="button" onClick={() => window.location.reload()}>
                            Retry Connection
                        </button>
                    </div>
                )}

                <footer className="back-to-login">
                    <Link to="/login">Back to Login</Link>
                </footer>
            </div>
        </div>
    );
}