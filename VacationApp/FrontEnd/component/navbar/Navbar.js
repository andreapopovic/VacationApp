import React, {useEffect, useState} from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from './NavbarElements';
import Axios from "axios";
import {useNavigate} from "react-router-dom"
import {Button} from "react-bootstrap";

const Navbar = (props) => {
    const navigate = useNavigate()
    const[visibleLogIn,setVisibleLogIn]=useState(true)
    const[visibleLogOut,setVisibleLogOut]=useState(false)
    const[visible,setVisible]=useState(false)
    useEffect(()=>{
        let loggedIn = localStorage.getItem("token")
        let type= localStorage.getItem("type")
        if(loggedIn)
        {
            setVisibleLogIn(false)
            setVisibleLogOut(true)
        }
        else {
            setVisibleLogIn(true)
            setVisibleLogOut(false)
        }
        if(type=='1') {
            setVisible(true)
        }else {
            setVisible(false)
        }
    })
    const Logout = async () => {
        try {
            await Axios.get('http://localhost:5000/logout');
            localStorage.clear()
            setVisibleLogIn(true)
            setVisibleLogOut(false)
            navigate('/login')

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    {visibleLogOut? <NavLink to='/calendar' >
                        Kalendar
                    </NavLink>:null}
                    {visibleLogOut? <NavLink to='/formular' >
                        Formular
                    </NavLink>:null}
                    {visibleLogOut?<NavLink to='/list' >
                        Lista zahteva
                    </NavLink>:null}
                    {visibleLogOut?visible?<NavLink to='/register' >
                        Registruj novog zaposlenog
                    </NavLink>:null:null}

                </NavMenu>
                <NavBtn>
                    {visibleLogOut && <Button variant="primary" type="submit"  onClick={Logout} show>Odjavi se</Button>}
                    {visibleLogIn && <NavBtnLink to='/login'>Prijavi se</NavBtnLink>}
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;