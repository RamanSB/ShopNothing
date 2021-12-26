import React from "react";
import { GlobalAppStateContext } from "../contexts/GlobalAppStateContext";
import {useNavigate} from "react-router-dom";

//ToDo: Form Validation (Front-end)
const SIGNIN_ACTION = "SIGN IN";
const SIGNUP_ACTION = "SIGN UP";

const SignInPage = (props: any) => {
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        signUp: false,
        formFields: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            phone: ""
        }
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
            let isEmailFieldValid : boolean = validateFormFields(SIGNIN_ACTION);
            if (isEmailFieldValid) {
                // make request to signin (state.formFields.email state.formFields.password) use auth
                if(true) { // auth is successful
                    navigate("/");
                    return {
                        ...prevState,
                        isSignedIn: true
                    }
                }
            } else {
                return prevState;
            }
        }); 
    }

    const handleSignUp = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.currentTarget.innerText === 'Submit') {
            setState((prevState: any) => {
                let isFieldsValid : boolean = validateFormFields(SIGNUP_ACTION);
                if (isFieldsValid) {
                    let isUserValidatedByAuthService : boolean = true;// make request to signup (use an AuthService)
                    if(isUserValidatedByAuthService) {
                        return {
                            ...prevState,
                            signUp: !isUserValidatedByAuthService
                        }
                    } else {
                        return {
                            ...prevState,
                            signUp: true
                        }
                    }
                } else {
                    // Error message to show user
                    return {
                        ...prevState,
                        signUp: true
                    }
                }
            });
        } else {
            setState((prevState: any) => {
                return {
                    ...prevState,
                    "signUp": true 
                }
            });
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let formField = event.currentTarget.name;
        let text = event.currentTarget.value;
        console.log(`State: ${JSON.stringify(state)}`);
        setState((prevState: any) => {
            return (
                {
                    ...prevState,
                    formFields: {
                        ...prevState.formFields,
                        [formField]: text
                    }
                }
            );
        });
    }

    const validateFormFields = (action : string) : boolean => {
        if (action === SIGNUP_ACTION) {
            let nameRegex : RegExp = /^[a-zA-Z]+$/;
            let nameCriteriaSuccess : boolean = nameRegex.test(state.formFields.firstName) && nameRegex.test(state.formFields.lastName);
            let emailRegex : RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            let emailCriteriaSuccess : boolean = emailRegex.test(state.formFields.email);
            let phoneRegex : RegExp = /^([^\wa-zA-Z]|\d)+$/;
            let phoneCriteriaSuccess : boolean = phoneRegex.test(state.formFields.phone);
            return phoneCriteriaSuccess && emailCriteriaSuccess && nameCriteriaSuccess;
        } else if (action === SIGNIN_ACTION) {
            let emailRegex : RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            let emailCriteriaSuccess : boolean = emailRegex.test(state.formFields.email);
            return emailCriteriaSuccess;
        } else {
            console.log(`Unrecognized action: ${action}`);
            return false;
        }
    }

    return (
        <div id="signin-container">
            <h1 style={{fontFamily: "Montserrat", color: "white", textAlign: "center", fontSize: "3rem"}}>Nothing <i className="fas fa-mortar-pestle"></i></h1>
            <form style={{marginTop: "24px"}}>
                {state.signUp ? (
                    <>
                        <label style={labelStyle} htmlFor="first-name-field">First Name</label>
                        <br/>
                        <input name="firstName" type="text" id="first-name-field" style={inputFieldStyle} placeholder='Enter your first name' onChange={handleInputChange} ></input>
                        <br/>
                        <label style={labelStyle} htmlFor="last-name-field">Last Name</label>
                        <br/>
                        <input name="lastName" type="text" id="last-name-field" style={inputFieldStyle} placeholder='Enter your last name' onChange={handleInputChange} ></input>
                        <br/>
                    </>) : <></>
                }
                <label style={labelStyle} htmlFor="email-field">Email</label>
                <br/>
                <input name="email" type="text" id="email-field" style={inputFieldStyle} placeholder='Enter your email' onChange={handleInputChange}></input>
                <br/>
                <label style={labelStyle} htmlFor="password-field">Password</label>
                <br/>
                <input name="password" type="password" id="password-field" placeholder="Enter your password" style={inputFieldStyle} onChange={handleInputChange}></input>
                <br/>
                {state.signUp ? (
                    <>
                        <label style={labelStyle} htmlFor="phone-field">Phone</label>
                        <br/>
                        <input name="phone"type="tel" id="phone-field" style={inputFieldStyle} placeholder='Enter your phone #' onChange={handleInputChange}></input>
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