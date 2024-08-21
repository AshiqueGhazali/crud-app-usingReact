import React, { useState, useEffect } from 'react'
import './AdminLogin.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch,useSelector } from 'react-redux';
import { setAdmin } from '../../../redux/Store';


const AdminLogin = () => {
    const [userName,setUserName]=useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isAuth = useSelector((state) => state.adminAuth.success);

    useEffect(() => {
      if (isAuth) {
        navigate('/adminDashboard');
      }
    }, [isAuth, navigate]);

    const handleSubmit = async(event)=>{
      event.preventDefault()
      try {
        axios.post('//localhost:5000/adminLogin', {userName, password})
        .then((response)=>{
          if(response.data.success){
            dispatch(setAdmin())
            localStorage.setItem("adminAuth", JSON.stringify(1))
            navigate('/adminDashboard')
          }else{
            toast.error(response.data.message)
          }
        }).catch((err)=>{
          if(err.response && err.response.data) {
            toast.error(err.response.data.message); 
          } else {
              toast.error('An unexpected error occurred.');
          }
        })
        
      } catch (error) {
        console.log(error);
        
      }
    }
  return (
    <div className='login'>
        <div className="login-form">
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <input onChange={(e)=>setUserName(e.target.value)} value={userName}  type="text" placeholder='user Name' />
          <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Password' />
          <button  type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin