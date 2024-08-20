import React from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
  return (
    <div className='login'>
        <div className="login-form">
        <h1>Login</h1>
        <form>
          <input  type="email" placeholder='Email' />
          <input  type="password" placeholder='Password' />
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