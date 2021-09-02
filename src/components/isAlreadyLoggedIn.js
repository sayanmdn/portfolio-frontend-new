import axios from 'axios'
import {URL} from '../config'



async function isAlreadyLoggedIn() {
    // return true
    const values = localStorage.getItem('token')
    console.log("Token is "+values)
    await axios.post(`${URL}post/isAuthenticated`, {"token": values})
    .then (res =>{
        console.log(res)
        if(res.data.code === "tokenValid"){
            // console.log(res.data.code)
            return 1
        }
        else {
            return 0
        }
    })
}

const output = isAlreadyLoggedIn()
console.log("Within func "+output)


export default isAlreadyLoggedIn