import { useContext } from "react"
import { ReContext } from "./utils/Context"
import { useNavigate } from "react-router-dom"
import React from "react"

export default function Viewer(){
    const{state} = useContext(ReContext)
    const navigate = useNavigate()
   React.useEffect(()=>{
    if (state.data==null){
        navigate("/")
    }
   },[state])
   if (state.data)
    return <main dangerouslySetInnerHTML={{
        __html:state.data
    }}></main>
}