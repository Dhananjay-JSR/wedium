import React from "react"
import { ActionFn, ReContext } from "./Context"



export default function StoreProvider({
    children
}:{
    children:React.ReactNode
}){

    const [state,dispatch] = React.useReducer(ActionFn,{
        data:null
    })

    return <ReContext.Provider value={{
        dispatch,
        state
    }}>{children}</ReContext.Provider>
}