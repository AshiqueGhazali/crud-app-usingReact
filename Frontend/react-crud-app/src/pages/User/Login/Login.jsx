import React, { useState, useEffect } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch,useSelector } from 'react-redux';
import { setUser } from '../../../redux/Store';


const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isAuth = useSelector((state) => state.auth.success);

    useEffect(() => {
      if (isAuth) {
        navigate('/');
      }
    }, [isAuth, navigate]);

    const handleSubmit = async(event)=>{
      event.preventDefault()
      try {
        axios.post('//localhost:5000/login', {email, password})
        .then((response)=>{
          if(response.data.success){
            dispatch(setUser(response.data.userData))
            localStorage.setItem("user",JSON.stringify(response.data.userData))
            toast.success('successfully logined')
            navigate('/')
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
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input onChange={(e)=>setEmail(e.target.value)} value={email}  type="email" placeholder='Email' />
          <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Password' />
          <button  type='submit'>Login</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
            <p>New to Netflix? <span onClick={()=>navigate('/register')}>Sign Up Now</span></p>
        </div>
      </div>
    </div>
  )
}

export default Login