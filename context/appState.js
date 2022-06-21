import {useContext, useState, createContext} from 'react'

const AppContext = createContext();


export function  AppWrapper ({children}){

    const [connected, setConnected] = useState(false);
    const [network, setNetwork] = useState(null)
    const [account,setAccount] = useState(null)
    // const [loading,setLoading] = useState(null)
    const [metamaskPresent, setMetamaskPresent] = useState(true);

    let state = {
        connected,
        network,
        account,
        metamaskPresent,
        setConnected,
        setNetwork,
        setAccount,
        setMetamaskPresent
    }

    return (
        <AppContext.Provider value={state}>
        {children}
    </AppContext.Provider>
    )
}

export function useAppContext(){
    return useContext(AppContext)
}