import axios from 'axios';
import { User } from '../types/User';


const requestStripePublisherKey = async () => {
    try {
        let publisherKey = await axios.get('/stripe-config');
        return publisherKey

    } catch (err) {
        console.log(`An error has occurred when retreiving the stripe-publisher key.`);
        return "";
    }
}

const signUpUser = async (user: User) => {
    try {
        let areRequiredFieldsPresent = (user.phone !== undefined) && (user.firstName !== undefined) && (user.lastName !== undefined) 
        if (!areRequiredFieldsPresent) {
            throw new Error("Required fields are missing");
        }
        let response = await axios.post("http://localhost:6942/signup", user);
        if (response.status === 201) {
            return response;
        }
    } catch (err) {
        console.log(`An error occurred during sign-up process: ${JSON.stringify(err)}`);
    }
}

const signInUser = async (user: User) => {
    try {
        // Removing key/vals not required for the sign-in endpoint.
        delete user.firstName; 
        delete user.lastName;
        delete user.phone;
        console.log(`Signing in User: ${JSON.stringify(user)}`);
        let response = await axios.post("http://localhost:6942/signin", user, {withCredentials: true});
        if (response.status === 200) {
            return response;
        }
    } catch (err) {
        console.log(`An error occurred during sign-in process: ${JSON.stringify(err)}`);
    }
}

const signOutUser = async (userEmail: String) => {
    try {
        let response = await axios.get("http://localhost:6942/signout");
        if (response.status === 200) {
            console.log(`User ${userEmail} has successfully signed out.`);
        } 
    } catch (err) {
        console.log(`An error occurred whilst signing out user: ${userEmail}`);
    }
};

const invokeMockRoute = async () => {
    try {
        await axios.get('http://localhost:6942/protected', {withCredentials: true});
    } catch (err) {
        console.log(`An error occurred invoking the protected route: ${err}`);
    }
}



export default { requestStripePublisherKey, signUpUser, signInUser, signOutUser, invokeMockRoute };