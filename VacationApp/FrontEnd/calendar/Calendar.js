import React,{useState,useEffect,useMemo} from 'react'
import Axios from 'axios'
import {Button} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import { Calendar,
    momentLocalizer,
    Views,
    dateFnsLocalizer,
    DateLocalizer } from 'react-big-calendar'
import PropTypes from 'prop-types'
import moment from 'moment'
import './Calendar.css'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

function VacationCalendar() {

    const[absences,setAbsences]=useState([])

    useEffect(()=>{
            getAbsences()
    },[])
    const getUserById = async (id) => {

        const response = await Axios.get(`http://localhost:5000/getUser${id}`);
        return response.data

    }
    const getAbsences = async () => {
        let parsData=[]
        const response = await Axios.get('http://localhost:5000/absences')
        for await ( let absence of response.data ){
            let userId=absence.idUser
            let userData = await getUserById(userId)
            let bgColor
            if(absence.type=='0'){
                bgColor="#FF8C00"
            }else{
                bgColor="#008000"
            }
            parsData.push({

                title:userData.name+" "+userData.lastname,
                start:absence.dateOf,
                end:absence.dateUntil,
                backgroundColor:bgColor



            })

        }
        setAbsences(parsData)

        return parsData


    }



    return(
        <>

            <FullCalendar
                events={absences}
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"

            />


        </>
    )

}
export default VacationCalendar