import React,{useState,useEffect} from 'react';
import {Container,Row,Col,Button,Form} from 'react-bootstrap'
import loginImg from '../../images/undraw_about_us_page_re_2jfm.svg'
import uiImg from '../../images/undraw_work_time_re_hdyv.svg'
import './Login.css'
import {useNavigate} from "react-router-dom"
import Alert from 'react-bootstrap/Alert'
import Axios from "axios";
import Navbar from "../navbar/Navbar";
const Login=()=> {
    const [emailLog,setEmail] = useState('')
    const [passwordLog,setPassword] = useState('')
    const [loginStatus,setLoginStatus] = useState('')
    const [showAlertFail, setShowAlertFail] = useState(false);

    const navigate = useNavigate()



    Axios.defaults.withCredentials = true
    const login = async (e) => {
        e.preventDefault();
        Axios.post('http://localhost:5000/login',
            {
                email:emailLog,
                password:passwordLog
            }).then((response)=>{

                localStorage.setItem('userId',response.data.userId)
                localStorage.setItem('token',response.data.accessToken)
                localStorage.setItem('type',response.data.type)

                navigate('/calendar')

        }).catch(err=>{
            setShowAlertFail(true)
        })

    }
    return (
        <>

            <Container className="container">
                <Row>

                    <Col lg={4} md={6} sm={12} className="text-center">
                        {showAlertFail?  <Alert show={showAlertFail} variant="warning">
                                <Alert.Heading>Greska prilikom prijavljivanja</Alert.Heading>
                                <p>
                                    Doslo je do greske prilikom prijavljivanja, proverite jos jednom podatke koje ste uneli.
                                </p>
                                <hr />
                                <div className="d-flex justify-content-end">
                                    <Button onClick={() => setShowAlertFail(false)} variant="outline-success">
                                        Ok
                                    </Button>
                                </div>
                            </Alert>:
                            <img className="icon-img" src={loginImg} alt="icon"/>}
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}  />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={login}>
                            Login
                        </Button>
                    </Form>
                    </Col>
                    <Col lg={8} md={6} sm={12}>
                        <img className="w-80 uiImg" src={uiImg} alt="icon"/>
                    </Col>
                </Row>
            </Container>


        </>
    )
}

export default Login;