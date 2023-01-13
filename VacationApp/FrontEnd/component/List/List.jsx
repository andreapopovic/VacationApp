import Table from 'react-bootstrap/Table';
import {useEffect, useState} from "react";
import Axios from "axios";
import Alert from 'react-bootstrap/Alert'
import {forEach} from "react-bootstrap/ElementChildren";
import {Button,Row} from "react-bootstrap";
function List() {

    const [requests,setRequests]=useState([])
    const [requestsOfUser,setRequestsOfUser]=useState([])
    const [users,setUsers]=useState([])
    const [userId,setUserId]=useState('')
    const [reqId,setReqId]=useState('')
    const [alert,setAlert]=useState(false)
    const [name,setName]=useState('')
    const [lastName,setLastName]=useState('')
    const [email,setEmail]=useState('')
    const [type,setType]=useState('')
    const [reason,setReason]=useState('')
    const [dateOf,setDateOf]=useState('')
    const [dateUntil,setDateUntil]=useState('')
    const [status,setStatus]=useState('')
    const [manager,setManager]=useState(true)

    useEffect(()=>{
        if(localStorage.getItem("type")==='1'){
            setManager(true)
            getRequests()
                .then(res =>{
                    if(res.length>1){
                        setRequests(res);
                    }
                    else{
                        let arr=[]
                        arr.push(res)
                        setRequests(arr);
                    }

                }).catch(err=>{
                console.log("Error: "+err)
            })
        }
        else{
            setManager(false)
            let id=localStorage.getItem("userId")
            getRequestsOfEmployee(id)
                .then(res =>{
                    if(res.length>1){
                        setRequestsOfUser(res);
                    }
                    else{
                        let arr=[]
                        arr.push(res)
                        setRequestsOfUser(arr);
                    }

                }).catch(err=>{
                console.log("Error: "+err)
            })
        }


    },[])

    const getRequests = async () => {
        let parsData=[]
        const response = await Axios.get('http://localhost:5000/requests')
        for await ( let request of response.data ){
            let userId=request.idUser
            let userData = await getUserById(userId)
                parsData.push({
                    id:request.id,
                    name:userData.name,
                    lastName:userData.lastname,
                    email:userData.email,
                    type:request.type,
                    dateOf:request.dateOf,
                    dateUntil:request.dateUntil,
                    reason:request.reason,
                    status:request.status,
                    idUser:request.idUser

                })

        }

        return parsData

    }
    const getRequestsOfEmployee = async (id) => {
        let parsData=[]
        const response = await Axios.get('http://localhost:5000/getEmployeeReq'+id)
             if(typeof(response.data.length)>1)
                 response.data.filter(request => request.idUser==id )
             return response.data


    }
    const getUserById = async (id) => {

        const response = await Axios.get(`http://localhost:5000/getUser${id}`);
        return response.data

    }
    const getRequestById = async (id) => {

        const response = await Axios.get(`http://localhost:5000/getRequest${id}`);
        return response.data

    }
    const prepareRequest=(id)=>{
        getRequestById(id).then(req=>{
            console.log(req)
            setReqId(req.id)
            setAlert(true)
            setReason(req.reason)
            setDateOf(req.dateOf)
            setDateUntil(req.dateUntil)
            setStatus(req.status)
            setType(req.type)
            getUserById(req.idUser).then(us=>{
                setName(us.name)
                setLastName(us.lastname)
                setEmail(us.email)
            }).catch(error=>{
                console.log(error)
            })



        }).catch(err=>{
            console.log(err)
        })
    }
    const declineRequest=async (id)=>{

        await Axios.patch(`http://localhost:5000/updateRequest${id}`,{
            status:'2'
        }).then(res=>{

             window.location.reload()
        })
    }
    const deleteRequest=async (id)=>{
        await Axios.delete(`http://localhost:5000/deleteRequest${id}`);
        await getRequests();
    }
    const acceptRequest=async (id)=>{
        console.log(id)
        await Axios.patch(`http://localhost:5000/updateRequest${id}`,{
            status:'1'
        }).then(res=>{
           // console.log(res)
            // window.location.reload()
            setAlert(false)
        })
        window.location.reload()
    }

    const updateRequest = async (e) => {
        await Axios.patch(`http://localhost:5000/updateRequest${reqId}`,{
            dateOf: dateOf,
            dateUntil: dateUntil,
            type:type,
            status:status
        }).then(res=>{

        window.location.reload()
        })

    }
    const createAbsence = async (id) => {

        let request= await getRequestById(id)

        var typeOfReq=request.type
        var userIdOfReq=request.idUser
        var dateOfOfReq=request.dateOf
        var dateUntilOfReq=request.dateUntil
      //  console.log(typeOfReq+" "+userIdOfReq+" "+dateOfOfReq+" "+dateUntilOfReq )

        await Axios.post('http://localhost:5000/createAbsence',{
            dateOf: dateOfOfReq,
            dateUntil: dateUntilOfReq,
            type:typeOfReq,
            idUser:userIdOfReq

        }).then(res=>{

            console.log(res)

        })
        await Axios.patch(`http://localhost:5000/updateRequest${id}`,{
            status:'1'
        }).then(res=>{

          //  window.location.reload()
            console.log(res)

        })


    }

    return (
       <>
           {manager && <div>
               {!alert && <Table striped bordered hover >
            <thead>
            <tr>
                <th>#</th>
                <th>Ime:</th>
                <th>Prezime:</th>
                <th>Email:</th>
                <th>Vrsta odsustva:</th>
                <th>Razlog:</th>
                <th>Datum od:</th>
                <th>Datum do:</th>
                <th>Status:</th>

            </tr>
            </thead>
            <tbody>


                {requests && requests.map((request) => {



                    return(
                        <tr key={request.id}>
                            <td >{request.id}</td>
                            <td >{request.name}</td>
                            <td >{request.lastName}</td>
                            <td >{request.email}</td>
                            <td >{request.type=='0'?"Bolovanje":"Odmor"}</td>
                            <td >{request.reason}</td>
                            <td >{request.dateOf}</td>
                            <td >{request.dateUntil}</td>
                            <td >{request.status=='0'?"Ceka se odobrenje":request.status=='1'?'Odobren':'Odbijen'}</td>
                            {request.status=='0'? request.type=='0'?null:<td ><Button onClick={()=>prepareRequest(request.id)} >Izmeni</Button></td>:null}
                            {request.status=='0'?request.type=='0'? null:  <td ><Button variant="success" onClick={()=>createAbsence(request.id)} >Odobri</Button></td>:null}
                            {request.status=='0'?request.type=='0'?null:   <td ><Button variant="danger" onClick={()=>declineRequest(request.id)} >Odbij</Button></td>:null}

                        </tr>

                    )
                })}




            </tbody>
        </Table>}
    <Alert show={alert} variant="success">
        <Alert.Heading>Izmenite zahtev </Alert.Heading>
        <p>
            <Row>Ime:<input value={name} disabled/> </Row>
            <Row>Prezime:<input value={lastName} disabled /> </Row>
            <Row>Email:<input value={email}  disabled/>  </Row>
            <Row>Vrsta odsustva: <select defaultValue={type} onChange={(e)=>{setType(e.target.value)}}>
                <option value='0'>Bolovanje</option>
                <option value='1'>Odmor</option>

            </select>   </Row>
            <Row>Datum od:<input value={dateOf} type="date" onChange={(e)=>{setDateOf(e.target.value)}}/> </Row>
            <Row>Datum do:<input value={dateUntil} type="date" onChange={(e)=>{setDateUntil(e.target.value)}} /> </Row>
            <Row  > Status:
                <select defaultValue={status} onChange={(e)=>{setStatus(e.target.value)}}>
                    <option value='0'>Na cekanju</option>
                    <option value='1'>Odobren</option>
                    <option value='2'>Odbijen</option>
            </select> </Row>


        </p>
        <hr />
        <div className="d-flex justify-content-end">
            <Button onClick={() => updateRequest(reqId)} variant="outline-success">
                Potvrdi
            </Button>
            <Button onClick={() => setAlert(false)} variant="outline-success">
                Ponisti
            </Button>
        </div>
    </Alert>
           </div>}
           {!manager && <div>
               <Table striped bordered hover >
                   <thead>
                   <tr>
                       <th>#</th>
                       <th>Vrsta odsustva:</th>
                       <th>Razlog:</th>
                       <th>Datum od:</th>
                       <th>Datum do:</th>
                       <th>Status:</th>

                   </tr>
                   </thead>
                   <tbody>


                   {requestsOfUser && requestsOfUser.map((request) => {
                              console.log(request)

                       return(
                           <tr key={request.id}>
                               <td >{request.id}</td>
                               <td >{request.type=='0'?"Bolovanje":"Odmor"}</td>
                               <td >{request.reason}</td>
                               <td >{request.dateOf}</td>
                               <td >{request.dateUntil}</td>
                               <td >{request.status=='0'?"Ceka se odobrenje":request.status=='1'?'Odobren':'Odbijen'}</td>

                               {request.status=='2'?<td ><Button variant="danger" onClick={()=>deleteRequest(request.id)} >Obrisi</Button></td>:null}

                           </tr>

                       )
                   })}




                   </tbody>
               </Table>
           </div>}
        </>

    );
}

export default List;