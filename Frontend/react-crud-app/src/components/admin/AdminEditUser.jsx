import React, { useState,useContext }  from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { dashboardContext } from '../../pages/admin/AdminDashboard/Dashboard';
import { toast } from 'react-toastify';

const AdminEditUser = ({show,userData,handleVisible}) => {
    const [userName,setUserName] = useState(userData.userName)
    const [email,setEmail] = useState(userData.email)
    const [error,setError] = useState({status:false,err:''})

    const handleCallback= useContext(dashboardContext)


    const validateForm = () => {
        const nameReg = /^(?! )[A-Za-z]+(?: [A-Za-z]+)*(?<! )$/;
        const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        if (!nameReg.test(userName)) {
          setError({ status: true, err: 'Invalid user name format.' });
          return false;
        }
    
        if (!emailReg.test(email)) {
          setError({ status: true, err: 'Invalid email format.' });
          return false;
        }
    
        setError({ status: false, err: '' });
        return true;
      };

      const onSubmit = async(event)=>{  
        event.preventDefault()

        if (!validateForm()) {
            return;
        }

        try {

            axios.patch(`//localhost:5000/adminEditProfile?userId=${userData._id}`,{userName,email})
            .then((res)=>{
                if(res.data.success){ 
                    handleCallback() 
                    handleVisible()
                    toast.success("Edited successfully")
                }else{
                    setError({status:true,err:res.data.message})
                }
            }).catch((err)=>{
                if(err.response && err.response.data) {
                    setError({status:true,err:err.response.data.message}) 
                  } else {
                      alert('An unexpected error occurred.');
                  }
                
            })
            
        } catch (error) {
            
        }
    }


  return (
    <>
        <Modal show={show} onHide={handleVisible}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e)=>setUserName(e.target.value)}
                  value={userName}
                  placeholder="userName"
                  autoFocus
                />
                <br/>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                  placeholder="name@example.com"
                  autoFocus
                />
              </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleVisible}>
              Close
            </Button>
            <Button type='submit' variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
          </Form>
          {error.status?<small style={{color:'red'}}>{error.err}</small>:<></>}
          </Modal.Body>
        </Modal>
      </>
  )
}

export default AdminEditUser