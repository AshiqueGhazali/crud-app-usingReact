import React, { useContext, useState }  from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { dashboardContext } from '../../pages/admin/AdminDashboard/Dashboard';



const AddUser = ({show, handleAddUserToggle}) => {
    const { register, handleSubmit, formState: { errors },watch } = useForm();
    const handleCallback= useContext(dashboardContext)

    const password = watch('password', '');

    const onSubmit = async(data)=>{
        try {
          axios.post('//localhost:5000/addNewUser', {
            userName:data.userName,
            email:data.email, 
            password:data.password
          })
          .then((response) => {
            if(response.data.success){
                handleCallback()
                handleAddUserToggle()
                toast.success("New User added successfully")
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
    <>
        <Modal show={show} onHide={handleAddUserToggle}>
          <Modal.Header closeButton>
            <Modal.Title>Add New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>User Name</Form.Label>
                <Form.Control
                  {...register('userName',{required:'User Name is requird', pattern:{value: /^(?! )[A-Za-z]+(?: [A-Za-z]+)*(?<! )$/,message: 'Name can only contain letters'}})}
                  type="text"
                  placeholder="userName"
                  autoFocus
                />
                {errors.userName && <small style={{color:'red'}}>{errors.userName.message}</small>}
                <br/>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  {...register('email', {required: 'Please enter your email', pattern:{value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Enter a Proper Email' }} )}
                  type="email"
                  placeholder="name@example.com"
                  autoFocus
                />
                {errors.email && <small style={{color:'red'}}>{errors.email.message}</small>}
                <br/>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    {...register('password',{required:'Please Enter Password', pattern:{value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, message: 'Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one number'}})} 
                  placeholder="password"
                  autoFocus
                />
                {errors.password && <small style={{color:'red'}}>{errors.password.message}</small>}
                <br/>
                <Form.Control
                    {...register('confirmPassword', {required: 'Please confirm your password', validate: value => value === password || 'Passwords do not match'})}
                  placeholder="conform Password"
                  autoFocus
                />
                {errors.confirmPassword && <small style={{color:'red'}}>{errors.confirmPassword.message}</small>}
              </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAddUserToggle} >
              Close
            </Button>
            <Button type='submit' variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
          </Form>
          {/* {error.status?<small style={{color:'red'}}>{error.err}</small>:<></>} */}
          </Modal.Body>
        </Modal>
      </>
  )
}

export default AddUser