'use client'
import React, { createContext, useEffect, useReducer } from 'react';
import { actionTypeInterface, authenticationCheckProviderReducer, } from './AuthenticationReducer';



export const initialState = {
    role: null,
    isLoggedIn: false,
    isLoading: true,
    user_info: {}
}

export interface initialStateInterface {
    role: null | string,
    isLoading: any,
    user_info: any,
    isLoggedIn: boolean
}

export const AuthenticationCheck = createContext<initialStateInterface>({ isLoading: false, role: null, user_info: {}, isLoggedIn: false });


const AuthenticationCheckProvider = (props: { children: React.ReactNode }) => {

    const [state, dispatch]: [initialStateInterface, (props: actionTypeInterface) => void] = useReducer(authenticationCheckProviderReducer, initialState);

    // useEffect(() => {
    //     const run = async () => {
    //         try {
    //             dispatch({ type: 'LOADING' || '' });
    //             // const res = await fetch(refresh_api, {
    //             //     headers: {
    //             //         "ref_tkn": cookies
    //             //     },
    //             //     method: "POST",
    //             //     body: JSON.stringify({})
    //             // })
    //             const data = await res.json()
    //             if (data?.success) {
    //                 dispatch({ type: 'SUCCESS', payload: data })
    //             }
    //             else {
    //                 dispatch({ type: 'ERROR' });
    //                 deleteCookie('ref_tkn')
    //             }
    //         }
    //         catch {
    //             dispatch({ type: 'ERROR' });
    //         }
    //     }
    //     run()
    // }, [dispatch]);


    return (
        <AuthenticationCheck.Provider value={state}>
            {props.children}
        </AuthenticationCheck.Provider>
    );
};

export default AuthenticationCheckProvider;