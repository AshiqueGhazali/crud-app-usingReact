import React, { useState, useEffect } from 'react'
import './Register.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


const Register = () => {
  const { register, handleSubmit, formState: { errors },watch } = useForm();

 
    const navigate = useNavigate()
    const password = watch('password', '');

    const isAuth = useSelector((state) => state.auth.success);

    useEffect(() => {
      if (isAuth) {
        navigate('/');
      }
    }, [isAuth, navigate]);

    const onSubmit = async(data)=>{
      try {
        axios.post('http://localhost:5000/createUser', {
          userName:data.userName,
          email:data.email, 
          password:data.password
        })
        .then((response) => {
          if(response.data.success){
              navigate('/login');
          } else {
              toast.error(response.data.message); 
          }
        })
        .catch((err) => {
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
    <div className='register'>
        <div className="register-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('userName',{required:'User Name is requird', pattern:{value: /^(?! )[A-Za-z]+(?: [A-Za-z]+)*(?<! )$/,message: 'Name can only contain letters'}})} style={{border: errors.userName ? '2px solid red' : '1px solid #ccc',padding: '8px', 
                borderRadius: '4px',}} type="text" placeholder='First Name' />
          {errors.userName && <small style={{color:'red'}}>{errors.userName.message}</small>}          
          <input {...register('email', {required: 'Please enter your email', pattern:{value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Enter a Proper Email' }} )} 
                style={{border: errors.email ? '2px solid red' : '1px solid #ccc',padding: '8px', borderRadius: '4px',}} type="email" placeholder='Email' />
          {errors.email && <small style={{color:'red'}}>{errors.email.message}</small>}          
          <input {...register('password',{required:'Please Enter Password', pattern:{value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, message: 'Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one number'}})} 
                style={{border: errors.password ? '2px solid red' : '1px solid #ccc',padding: '8px', borderRadius: '4px',}} type="password" placeholder='Password' />
          {errors.password && <small style={{color:'red'}}>{errors.password.message}</small>}
          <input {...register('confirmPassword', {required: 'Please confirm your password', validate: value => value === password || 'Passwords do not match'})} 
                style={{border: errors.confirmPassword ? '2px solid red' : '1px solid #ccc',padding: '8px', borderRadius: '4px',}} type="password"  placeholder='Confirm Password' />
          {errors.confirmPassword && <small style={{ color: 'red' }}>{errors.confirmPassword.message}</small>}
          <button  type='submit'>Sign Up</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
            <p>Already have acount? <span onClick={()=>{navigate('/login')}} >Sign In Now</span></p>          
        </div>
      </div>
    </div>
  )
}

export default Register