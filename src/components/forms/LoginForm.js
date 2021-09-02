import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useFormik } from 'formik';
import { useHistory } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {initAuth} from '../../redux/actions'
import {URL} from '../../config'




export function Loginform(props) {
    var [loginSuccess, setLoginSuccess] = useState(false)
    var [authFailed, setAuthFailed] = useState(false)
    var [validationError, setValidationError] = useState(null)
    let history = useHistory();
    let dispatch = useDispatch()

    
    const formik = useFormik({
        initialValues: {
              email: '',
              password:''
        },
        onSubmit: values => {
          axios.post(`${URL}user/login`, values)
          .then(res => {
              // SUCCESS
              console.log("res: "+ JSON.stringify(res))
              if(res.data.code === "Loggedin"){
                  localStorage.setItem("token", res.data.token)
                  setLoginSuccess(true)
                dispatch(initAuth(res.data.user))
                history.push("/warehouse");
              }
            })
            .catch(error =>{
                console.log("Error log: "+error)
                //   console.log("Error log: "+ JSON.stringify(error.response))
                // console.log("Error log: "+ error.response.data.code)
                
                //VALIDATION ERROR
                if(error.response.data.code === "validationFalse"){
                    // setValidationError(res.data.message)
                    setValidationError(true)
                }
                // FAILED
                if(error.response.data === "Not valid password" || error.response.data === "Email do not exists"){
                    setAuthFailed(true)
                  }
                  
          })
          // alert(JSON.stringify(values));
        },
      });
    if(loginSuccess) {
        return (
            <div>
                <h2>Login Successful</h2>
            {/* {loginSuccess && (
                <button>You are signed in</button>
            )} */}
            </div>
        )
    } else return (
        <div>
            <Form className="login-form" onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label >Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" onChange={formik.handleChange} value={formik.values.email}/>
                <Form.Text className="text-muted">
                Your information will be kept confidential.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" onChange={formik.handleChange} value={formik.values.password}/>
                <Form.Text className="text-muted" hidden={!authFailed} style={{color: "red !important"}}>
                Email or password is wrong
                </Form.Text>
                <Form.Text className="text-muted" hidden={!validationError} style={{color: "red !important"}}>
                Must be valid Email and password should be min 8 characters long
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
            </Form>
            
        </div>
    )
}