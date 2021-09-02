import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik';
import {URL} from '../config'


export function Warehouse(props) {
  const [testData, setTestData] = useState([])
  const [stateToken, setStateToken] = useState("")

  useEffect (()=>{
    const authToken = localStorage.getItem('token')
      setStateToken(authToken)
  }, [])

   const fetchData = () => {
      const authToken = localStorage.getItem('token')
      setStateToken(authToken)
      axios.post(URL+"user/getdata", {"token": authToken})
      .then(res=>{
        // console.log("fetchData response: "+ JSON.stringify(res))
        setTestData(res.data)
      })
      .catch(err=>{
        console.log("error returned at fetchData: "+ err)
      })
    }
    const auth = useSelector(state => state.auth)
    if(auth.isLoggedIn){
        var userId = auth.user.id
    }

    var [saveSuccess, setSaveSuccess] = useState(false)
    const [savedData, setSavedData] = useState(testData)
    const formik = useFormik({
        initialValues: {
              data: '',
              url: '',
              email: '',
              password: ''
        },
        onSubmit: values => {
          console.log("values is "+JSON.stringify(values))
          axios.post(`${URL}user/save`, {token: stateToken, data: values})
          .then(res => {

              //USERCREATED SUCCESS
              if(res.data.code === "dataSaved"){
                  setSaveSuccess(true)
                  alert("Data saved successfully")
              }

              console.log(res);
              // console.log(res.data);
          })
          .catch(error =>{
              console.error(error)
          })
          // alert(JSON.stringify(values));
        },
      });

    

    return (
        <div className="warehouse-main">
          <div className="dataForm">
            <h2>Protected Password Vault</h2>
            <Form className="data-form" onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formBasicName">
                <Form.Label>Enter credentials</Form.Label>
                <Form.Control type="text" name="url" placeholder="Enter URL" onChange={formik.handleChange} value={formik.values.url}/>
                <Form.Control type="text" className="formBelowFields" name="email" placeholder="Enter username / email" onChange={formik.handleChange} value={formik.values.email}/>
                <Form.Control type="text" className="formBelowFields" name="password" placeholder="Enter password" onChange={formik.handleChange} value={formik.values.password}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit Data
            </Button>
            </Form>
          </div>
            {/* <div className="data-api">
              <p>You can also log your data from your application. Api details are given below</p>
              <code>Link: https://api.sayantanmishra.com/user/save</code><br/>
              <code>Request method: POST, Object:{`{"token":"` +stateToken+ `"
                "data": {
                  "your data": "your data",
                  "your data": "your data"
                }
            }`}</code>
            </div> */}
          <div className="dataFormUpper" style={{marginTop:"150px"}}>
          <h2>See your vault</h2>
          <Button style={{marginBottom:"30px"}} onClick={()=>fetchData()} >Fetch Data</Button>
          <ol>
          {
          testData.map(data => {
            return (<li className="fetchdataClass"><span> URL: {data.data.url}  Email/Username: {data.data.email}  Password: {data.data.password}</span></li>)
          })
          }
          </ol>
          </div>
        </div>
    )
}

