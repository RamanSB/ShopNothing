import React from "react";
import { GlobalAppStateContext } from "../contexts/GlobalAppStateContext";

//ToDo: Form Validation (Front-end)

const SignInPage = (props: any) => {

    const [state, setState] = React.useState({
        "signUp": false
    });
    const labelStyle = {
        fontFamily: "Montserrat", 
        color: "white",
        fontSize: "1.5em"
    };

    const inputFieldStyle = {
        padding: "12px 24px 12px 24px",
        margin: "8px 0 24px 0",
        minWidth: "300px", 
        fontSize: "1.25em",
        fontFamily: "Montserrat",
    }
    
    const forgotPasswordStyle = {
        margin: "48px auto 0 auto",
        maxWidth: "300px",
        fontFamily: "Montserrat",
        fontSize: "1em",
        color: "white",
        lineHeight: "1.3rem",
        justifySelf: "center"
      }

    const signInUpButtonStyle = {backgroundColor: "#011627", color: "white", minWidth: "140px", padding: "12px", alignSelf: "flex-end", fontSize: "1.25em", fontFamily: "Montserrat"};
    const { setGlobalState } = React.useContext(GlobalAppStateContext);

    const handleSignIn = (event: React.MouseEvent<HTMLButtonElement>) => {
        setGlobalState((prevState: any) => {
            if(true) { //auth is successful
                return {
                    ...prevState,
                    isSignedIn: true
                }
            }
        })
    }

    const handleSignUp = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.currentTarget.innerText === 'Submit') {
            // Auth
            setState((prevState: any) => {
                return {
                ...prevState,
                signUp: false
            }})
        } else {
            setState((prevState: any) => {
                return {
                    ...prevState,
                    "signUp": true 
                }
            });
        }
    }

    return (
        <div id="signin-container">
            <h1 style={{fontFamily: "Montserrat", color: "white", textAlign: "center", fontSize: "3rem"}}>Nothing <i className="fas fa-mortar-pestle"></i></h1>
            <form style={{marginTop: "24px"}}>
                {state.signUp ? (
                    <>
                        <label style={labelStyle} htmlFor="email-field">First Name</label>
                        <br/>
                        <input type="text" id="email-field" style={inputFieldStyle} placeholder='Enter your first name'></input>
                        <br/>
                        <label style={labelStyle} htmlFor="email-field">Last Name</label>
                        <br/>
                        <input type="text" id="email-field" style={inputFieldStyle} placeholder='Enter your last name'></input>
                        <br/>
                    </>) : <></>
                }
                <label style={labelStyle} htmlFor="email-field">Email</label>
                <br/>
                <input type="text" id="email-field" style={inputFieldStyle} placeholder='Enter your email'></input>
                <br/>
                <label style={labelStyle} htmlFor="password-field">Password</label>
                <br/>
                <input type="password" id="password-field" placeholder="Enter your password" style={inputFieldStyle}></input>
                <br/>
                {state.signUp ? (
                    <>
                        <label style={labelStyle} htmlFor="phone-field">Phone</label>
                        <br/>
                        <input type="tel" id="phone-field" style={inputFieldStyle} placeholder='Enter your phone #'></input>
                        <br/>
                    </>
                ) : <></>}
            </form>
            <div style={{display: "flex", flexFlow: "row nowrap", justifyContent: "space-between"}}>
                <button style={signInUpButtonStyle} onClick={handleSignIn}>Sign In</button>
                <button style={signInUpButtonStyle} onClick={handleSignUp}>{state.signUp ? "Submit" : "Sign Up"}</button>
            </div>
            {state.signUp ? <></> : <p style={forgotPasswordStyle} className="align-center">Did you forget your password?<br/>Click here to <a href="https://www.instagram.com">reset</a> your password.</p>}
        </div>
    )
}

export default SignInPage;