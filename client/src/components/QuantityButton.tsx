import React from "react";
import { GlobalAppStateContext } from "../contexts/GlobalAppStateContext";

export const QuantityButton = (props: any) => {

    const { globalState, setGlobalState } = React.useContext(GlobalAppStateContext);
    let existingQty = globalState.basket[props.productName];

    const decrementHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (existingQty !== 0) {
            setGlobalState((prevGlobalState: any) => {
                return (
                    {
                        ...prevGlobalState,
                        basket: {
                            ...prevGlobalState.basket,
                            [props.productName]: existingQty-1
                        }
                    }
                );
            });
        }
    };

    const incrementHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        setGlobalState((prevGlobalState: any) => {
            return (
                {
                    ...prevGlobalState,
                    basket: {
                        ...prevGlobalState.basket,
                        [props.productName]: existingQty + 1
                    }
                }
            )
        })
    }

    return (
        <button onClick={props.type === 'decrement' ? decrementHandler : incrementHandler}>{props.children}</button>
    );
}