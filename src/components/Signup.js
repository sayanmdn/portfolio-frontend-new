import React, {useEffect} from 'react'
import { SignupForm } from "./forms/SignupForm";
import store from "../redux/store";

export function Signup(props) {
    useEffect(()=>{
      
    console.log(store.getState())
     
    },[])
    
    return (
        <div style={{background:"linear-gradient(#112233, #002222)", color:"white", textAlign:"center", height:"93vh"}}>
            <div style={{paddingTop:"10vh"}}></div>
                <SignupForm/>
        </div>
    )
}
