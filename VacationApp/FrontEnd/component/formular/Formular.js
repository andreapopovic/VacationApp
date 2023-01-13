import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Formular.css'
import {useState,useEffect} from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom"
function Formular()
{
    const navigate = useNavigate()
    const [userId,setUserId] = useState('')
    const[dateOf,setDateOf]=useState('')
    const[dateUntil,setDateUntil]=useState('')
    const[type,setType]=useState('0')
    const[reason,setReason]=useState('')

    useEffect(() => {
        const id = JSON.parse(localStorage.getItem('userId'));
        if (id) {
            setUserId(id);
        }
    }, []);

    const sendRequest = async (e) => {
        e.preventDefault();
        let status
        if(type=='0'){
            status=1
        }
        else{
            status=0
        }

       await Axios.post('http://localhost:5000/createRequest',{
            dateOf: dateOf,
            dateUntil: dateUntil,
            type:type,
            reason:reason,
            status:status,
            idUser:userId

        }).then(res=>{
            navigate('/list')
            console.log(res)
        })
        if(type=='0'){
            let user=await getUserById(userId)
            let absence=await  createAbsence(userId)

        }


    }
    const getUserById = async (id) => {

        const response = await Axios.get(`http://localhost:5000/getUser${id}`);
        return response.data

    }
    const createAbsence = async (id) => {

        await Axios.post('http://localhost:5000/createAbsence',{
            dateOf: dateOf,
            dateUntil: dateUntil,
            type:type,
            idUser:userId

        }).then(res=>{

            console.log(res)

        })


    }



    return (
        <Form>

                <Form.Group className="mb-3">
                    <Form.Label >Datum pocetka:</Form.Label>
                    <Form.Control type="date"  onChange={(e)=>{setDateOf(e.target.value)}}  />
                </Form.Group>
               <Form.Group className="mb-3">
                   <Form.Label >Datum kraja:</Form.Label>
                   <Form.Control type="date" onChange={(e)=>{setDateUntil(e.target.value)}}  />
               </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label >Vrsta odsustva:</Form.Label>
                    <Form.Select id="Select"  onChange={(e)=>{setType(e.target.value)}}>
                        <option value='0' >Bolovanje</option>
                        <option value='1'>Odmor</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label >Razlog:</Form.Label>
                    <Form.Control type="text" placeholder="Razlog:" onChange={(e)=>{setReason(e.target.value)}} />
                    <label className='labFormular'>*Ovo polje nije obavezno popuniti </label>
                </Form.Group>

                <Button  onClick={sendRequest} >Posalji zahtev</Button>

        </Form>
    );

}
export default Formular