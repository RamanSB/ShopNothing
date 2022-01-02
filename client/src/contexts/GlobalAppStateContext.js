import {createContext, useState} from 'react';

/**
 * Creating a context object that stores the apps GlobalState.
 */
export const GlobalAppStateContext = createContext();


/**
 * This component will be wrap the Application at the root level, such that the Application is the child and will have access to the 
 * components (GlobalState) GlobalAppStateContext.Provider values.
 */

const GlobalStateProvider = (props) => {
    
    console.log(`[GlobalAppStateContext.js -> GlobalStateProvider Function]`);
    const [globalState, setGlobalState] = useState({
        isSignedIn: false,
        currency: "",
        basket: {}
    });

    console.log(`[Context] GlobalState: ${JSON.stringify(globalState)}`);
    
    return (
        <GlobalAppStateContext.Provider value={{globalState, setGlobalState}}>
            {props.children}
        </GlobalAppStateContext.Provider>
    )
}

export default GlobalStateProvider;