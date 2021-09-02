import React, { useEffect, useState } from 'react'
import { Loginform } from "./forms/LoginForm";
import { delAuth, initAuth } from "../redux/actions";
import axios from 'axios'
import {useDispatch} from "react-redux"

// import isAlreadyLoggedIn from "./isAlreadyLoggedIn";
// const logger = isAlreadyLoggedIn()


export function Login(props) {
const [isValidToken, setIsValidToken] = useState(null)
const dispatch = useDispatch()
// // console.log("Token is "+authToken)
// useEffect(()=>{
//     const authToken = localStorage.getItem('token')
//     axios.post(`http://localhost:8000/post/isAuthenticated`, {"token": authToken})
//     .then (res =>{
//         console.log(res)
//         if(res.data.code === "tokenValid"){
//             console.log("res.data message: "+ JSON.stringify(res.data.message))
//             // dispatch(addCount())
//             dispatch(initAuth(res.data.message))
//             setIsValidToken(res.data) 
//         }
//     })
//     .catch (err =>{
//         console.log("Error from isValidAuthToken "+err)
//     })
// },[])
const removeToken = () =>{
    localStorage.setItem('token', null)
    setIsValidToken(null)
    dispatch(delAuth())
}

console.log("Valid token out: "+isValidToken)

    if(!isValidToken) {return (
        <div style={{background:"linear-gradient(#112233, #002222)", color:"white", textAlign:"center", height:"93vh"}}>
            <div style={{paddingTop:"10vh"}}></div>
                <Loginform/>
        </div>
    )} else {
        return(
            <div style={{background:"linear-gradient(#112233, #002222)", color:"white", textAlign:"center", height:"93vh"}}>
            <div style={{paddingTop:"10vh"}}></div>
                <h2>Hi, {isValidToken.message.name}</h2>
                <h2>You are already loggedin</h2>
                <button onClick={removeToken}>Logout</button>
        </div>
        )
    }
}


