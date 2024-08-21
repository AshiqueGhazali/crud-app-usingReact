import React,{useEffect, useState} from 'react'
import './Dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminLogout } from '../../../redux/Store'
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserTable from '../../../components/admin/UserTable'
import axios from 'axios'




const Dashboard = () => {

    const [userDatas,setUserDatas] = useState([])
    const[count,setCount]=useState(0)


    const data = useSelector((state)=>{
        return state.adminAuth.success;
    })

    const navigate = useNavigate('')
    const dispatch = useDispatch()

    useEffect(()=>{
        if(!data){
          navigate('/admin/login')
        }
    },[])

    const handleAddUser=(data)=>{
        setCount(count+1)
    }

    useEffect(()=>{
        axios.get('//localhost:5000/getUserDetails')
        .then((response)=>{
            const {usersData}= response.data            
            setUserDatas(usersData)            
        })
        .catch((err)=>{
            console.log(err);
            
        })
    },[count])

    const handleLogout=()=>{
        localStorage.removeItem('adminAuth')
        dispatch(adminLogout())
        navigate('/admin/login')
    }

  return (
    <div>
        <Navbar className="bg-body-tertiary justify-content-between">
            <div className='dashboard-text'>
                <h2 className='text-danger'>Admin Dashboard</h2>
            </div>
            <Row className='nav-btns'>
            <Col xs="auto">
                <Button type="submit" variant='info'>Add User</Button>
            </Col>
            <Col xs="auto">
                <Button type="submit" onClick={handleLogout} variant='info'>Logout</Button>
            </Col>
            </Row>
        </Navbar>
        <UserTable userDatas={userDatas}/>
    </div>
  )
}

export default Dashboard