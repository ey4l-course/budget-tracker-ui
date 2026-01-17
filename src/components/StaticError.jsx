import React from "react";


export const StaticError = ({error}) => {
    return(
        <div className="main">
            <div className="title">
            <h1>Personal budget tracker</h1>
            <h3>control your every-day finance</h3>
        </div>
        {error.status === 500 && (
            <div>
                <img src="../assets/errorMsg.png"/>
                <h1> Hmmm... This is awkward...</h1>
                <h3>guess it could happen</h3>
                <h5>Please contact us with log ID: {error.logID}</h5>
            </div>
        )}
        {error.status === "NETWORK" && (
            <div>
                {/* <img src="someImage.gif"/> */}
                <h1>Network error</h1>
                <h3>Description: {error.details}</h3>
            </div>        
        )}
    </div>
    )
}