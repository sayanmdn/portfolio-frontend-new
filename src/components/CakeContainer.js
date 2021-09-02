import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { buyCake } from "../redux/actions";
import { useHistory } from "react-router-dom";


export function Cake() {
    const numOfCakes = useSelector(state => state.cake.numOfCakes)   
    const dispatch = useDispatch() 
    const history = useHistory();

    return (
        <div>
        <h2>Num of cakes - {numOfCakes}</h2>
        <button onClick={()=>dispatch(buyCake())}>Buy cake</button>
        <button onClick={()=>history.push("/signup")}>Link to signup</button>
        </div>
    )
}
