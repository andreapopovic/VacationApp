import React, {useEffect, useState} from 'react';
import {Container,Row,Col,Button,Form} from 'react-bootstrap'
import loginImg from '../../images/undraw_about_us_page_re_2jfm.svg'
import uiImg from '../../images/undraw_work_time_re_hdyv.svg'
import './Register.css'
import Alert from 'react-bootstrap/Alert'
import Axios from "axios"
function Register() {

    const [nameReg,setName] = useState('')
    const [lastnameReg,setLastname] = useState('')
    const [emailReg,setEmail] = useState('')
    const [passwordReg,setPassword] = useState('')
    const [showAlertSuccess, setShowAlertSuccess] = useState(false);
    const [visible,setVisible]=useState(false)
    Axios.defaults.withCredentials = true
    useEffect(()=>{
        let type=localStorage.getItem('type')
        if(type=='1') {
            setVisible(true)
        }
        else{
            setVisible(false)
        }
    })
    const register = () =>{

       Axios.post('http://localhost:5000/register',
           {name:nameReg,
               lastname:lastnameReg,
               email:emailReg,
               password:passwordReg
           }).then((response)=>{
                console.log("Reg response: "+response)
           setShowAlertSuccess(true)
           }).catch(err=>{

       })

    }


    return (
        <>
            {visible &&  <Container className="mt-5 container">
                <Row>
                    <Col lg={4} md={6} sm={12} className="text-center">
                        {showAlertSuccess?  <Alert show={showAlertSuccess} variant="success">
                            <Alert.Heading>Uspesno registrovanje</Alert.Heading>
                            <p>
                                Uspesno ste registrovali novog zaposlenog.
                            </p>
                            <hr />
                            <div className="d-flex justify-content-end">
                                <Button onClick={() => setShowAlertSuccess(false)} variant="outline-success">
                                    Ok
                                </Button>
                            </div>
                        </Alert>:
                        <img className="icon-img" src={loginImg} alt="icon"/>}
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Enter name" onChange={(e)=>{setName(e.target.value)}} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Enter lastname" onChange={(e)=>{setLastname(e.target.value)}}  />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                            </Form.Group>
                            <Button variant="primary" onClick={register} type="button" >
                                Register
                            </Button>
                        </Form>
                    </Col>
                    <Col lg={8} md={6} sm={12}>
                        <img className="w-80 uiImg" src={uiImg} alt="icon"/>
                    </Col>
                </Row>





            </Container>}


        </>
    )
}

export default Register