import React, { useEffect } from "react";
import { GlobalAppStateContext } from "../contexts/GlobalAppStateContext";
import {useNavigate} from "react-router-dom";
import AuthService from "../api/AuthService";

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
        },
        hasSuccessfullySignedUp: false,
        failedSignIn: false
    });

    useEffect(() => {
        setTimeout(() => setState(prevState => {
            return ({
                ...prevState,
                failedSignIn: false
            })
        }), 4000);
    }, [state.failedSignIn])
   
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

    const signInUpButtonStyle = {
        backgroundColor: "#011627",
        color: "white",
        minWidth: "140px",
        padding: "12px",
        alignSelf: "flex-end",
        fontSize: "1.25em",
        fontFamily: "Montserrat"
      };
    
    const { setGlobalState } = React.useContext(GlobalAppStateContext);

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

    const handleSignIn = async (event: React.MouseEvent<HTMLButtonElement>) => {

        let isEmailFieldValid : boolean = validateFormFields(SIGNIN_ACTION);
        let response : any = undefined;
        if (isEmailFieldValid) {
            response = await AuthService.signInUser({
                email: state.formFields.email,
                password: state.formFields.password
            });
        }
        if (!response) {
            setState(prevLocalState => {
                return ({...prevLocalState, failedSignIn: true});
            })
        }
        
        setGlobalState((prevState: any) => {
            if (!response) {
                return {...prevState}
            } else if (response.status === 200) {
                navigate("/");
                return {
                    ...prevState,
                    isSignedIn: true,
                    user: state.formFields.email
                }
            } else {
                return {...prevState}
            }
        }); 
    }

    const handleSignUp = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.currentTarget.innerText.toLowerCase() === 'submit') {
            let isFieldsValid : boolean = validateFormFields(SIGNUP_ACTION);
            let response: any = undefined;
            if (isFieldsValid) {
                response = await AuthService.signUpUser({
                    firstName: state.formFields.firstName,
                    lastName: state.formFields.lastName,
                    email: state.formFields.email,
                    password: state.formFields.password,
                    phone: state.formFields.phone
                });
            }
            
            setState((prevState: any) => {
                if (!response) {
                    return {
                        ...prevState,
                        signUp: true
                    }
                } else if (response.status === 201) {
                    return {
                        ...prevState,
                        signUp: false,
                        hasSuccessfullySignedUp: true
                    }
                } else {
                    console.log(`Something definetly went wrong...`);
                    return {
                        ...prevState,
                        signUp: true
                    }
                }
            });
        } else {
            setState(prevState => {
                return ({
                    ...prevState,
                    signUp: true
                })
            })
        }
    }
    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let formField = event.currentTarget.name;
        let text = event.currentTarget.value;
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

    let containerStyle = `signin-container ${state.failedSignIn ? "failed-signin" : ""}`
    return (
        <>
            <div className={containerStyle}>
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
            {state.hasSuccessfullySignedUp ? (
            <div className="sign-toast">
                <p>You have successfully signed up.</p>
            </div>) : <></>}
            {state.failedSignIn ? <div className="sign-toast">
                <p>Incorrect Email or Password</p>
            </div> : <></>}
        </>
    )
}

export default SignInPage;