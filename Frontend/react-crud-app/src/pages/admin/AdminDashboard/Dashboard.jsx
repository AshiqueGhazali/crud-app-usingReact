import React,{createContext, useEffect, useState} from 'react'
import './Dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminLogout } from '../../../redux/Store'
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import UserTable from '../../../components/admin/UserTable'
import axios from 'axios'
import AddUser from '../../../components/admin/AddUser'

export const dashboardContext = createContext()


const Dashboard = () => {

    const [userDatas,setUserDatas] = useState([])
    const [addUserVisible,setAddUserVisible] = useState(false)
    const [count,setCount]=useState(0)
    const [searchQuery, setSearchQuery] = useState('')

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

    const handleCallback=(data)=>{
        setCount(count+1)
    }

    const handleAddUserToggle = ()=>{
        setAddUserVisible(!addUserVisible)
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

    const handleSearch=(e)=>{
        setSearchQuery(e.target.value)
    }

  return (
    <div>
        <Navbar className="bg-body-tertiary justify-content-between">
            <div className='dashboard-text'>
                <h2 className='text-danger'>Admin Dashboard</h2>
            </div>
            <Row className='nav-btns'>
            <Col xs="auto">
                <Form className="d-flex">
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="outline-success" onClick={()=>setSearchQuery(searchQuery)}>Search</Button>
                </Form>            
            </Col>
            <Col xs="auto">
                <Button onClick={handleAddUserToggle} type="submit" variant='info'>Add User</Button>
            </Col>
            <Col xs="auto">
                <Button type="submit" onClick={handleLogout} variant='info'>Logout</Button>
            </Col>
            </Row>
        </Navbar>
        <dashboardContext.Provider value={handleCallback} >
            <UserTable userDatas={userDatas} search={searchQuery}  />
            {addUserVisible?<AddUser show={addUserVisible}  handleAddUserToggle={handleAddUserToggle} />:<></>}
        </dashboardContext.Provider>
    </div>
  )
}

export default Dashboard