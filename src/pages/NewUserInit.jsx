import React, { useState } from "react";
import { BankDetails } from "../components/BankDetails";
import { ManualInit } from "../components/ManualInit";
import './NewUserInit.css'
import { Bot, UserCog } from 'lucide-react';

export const NewUserInit = () => {
    const [mode, setMode] = useState ("auto");


    return (
        <div className="init-wrapper">
            <h2>Wellcome aboard</h2>
            <p>
                {/* Intro <Link>Terms of use</Link> more intro */}
            </p>
            <div className="form-wrapper">
                <div className="mode-buttons">
                    <button
                        className = {`tab-btn ${mode === "auto" ? "active" : ""}`}
                        onClick={() => setMode("auto")}
                    >
                        <Bot size={18} /> Automatic agent
                    </button>
                    <button
                        className = {`tab-btn ${mode === "manual" ? "active" : ""}`}
                        onClick={() => setMode("manual")}
                    >
                        <UserCog size={18} /> Manual
                    </button>
                </div>
                {mode === "auto" && <BankDetails />}
                {mode ==="manual" && <ManualInit />}
            </div>
        </div>
    )
}