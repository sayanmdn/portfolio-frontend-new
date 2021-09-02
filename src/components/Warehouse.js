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
        },
        onSubmit: values => {
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
            <h2>HTTP Logger</h2>
            <Form className="data-form" onSubmit={formik.handleSubmit}>
            <Form.Group controlId="formBasicName">
                <Form.Label>Anything you want to save</Form.Label>
                <Form.Control type="text" name="data" placeholder="Enter data" onChange={formik.handleChange} value={formik.values.data}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit Data
            </Button>
            </Form>
          </div>
            <div className="data-api">
              <p>You can also log your data from your application. Api details are given below</p>
              <code>Link: https://api.sayantanmishra.com/user/save</code><br/>
              <code>Request method: POST, Object:{`{"token":"` +stateToken+ `"
                "data": {
                  "your data": "your data",
                  "your data": "your data"
                }
            }`}</code>
            </div>
          <div className="dataFormUpper" style={{marginTop:"150px"}}>
          <h2>Your saved data</h2>
          <Button style={{marginBottom:"30px"}} onClick={()=>fetchData()} >Fetch Data</Button>
          <ol>
          {
          testData.map(data => {
            return (<li>{JSON.stringify(data.data.data)}</li>)
          })
          }
          </ol>
          </div>
        </div>
    )
}

