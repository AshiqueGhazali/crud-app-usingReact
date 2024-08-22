import React, { useState, useContext } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import AdminEditUser from './AdminEditUser';
import { dashboardContext } from '../../pages/admin/AdminDashboard/Dashboard';
import { toast } from 'react-toastify';



const UserTable = ({userDatas, search}) => {
  const [visibleEdit,setVisibleEdit] = useState(false)
  const [userData, setUserData] = useState(null)
  const handleCallback= useContext(dashboardContext)

  const handleVisible=(userData=null)=>{
    if(userData!==null){
      setUserData(userData)
    }
    setVisibleEdit(!visibleEdit)
  }

  const deleteUser=async(userId)=>{
    try {
      axios.delete(`//localhost:5000/deleteUser?userId=${userId}`)
      .then((response)=>{
        if(response.data.success){
          handleCallback()
          toast.success("User deleted  successfylly!")
        }
      })
      .catch((error)=>{
        console.log('an error is occured');
      })
    } catch (error) {
      
    }
    
  }
    
  return (
    <>
      <div className='dashboard-table' style={{margin: '30px 50px 30px 50px'}}>
          <Table responsive="sm">
          <thead>
            <tr>
              <th>SL</th>
              <th>UserName</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
              {userDatas.filter((data)=>{
                return(
                  data.userName.toLowerCase().includes(search.toLowerCase()) ||
                  data.email.toLowerCase().includes(search.toLowerCase())
                )       
              })
              .map((user,index)=>{
                  return(
                      <tr key={index}>
                          <td className='text-danger'>{index+1}</td>
                          <td>{user.userName}</td>
                          <td>{user.email}</td>
                          <td>
                            <Button className='m-1' onClick={()=>handleVisible(user)}>Edit</Button>
                            <Button className='m-1' onClick={()=>{deleteUser(user._id)}}>Delete</Button>
                          </td>
                      </tr>
                  )
              })}
          </tbody>
        </Table>
        {visibleEdit?<AdminEditUser show={visibleEdit} userData={userData} handleVisible={handleVisible} />:<></>}

        </div>
      </>
  )
}

export default UserTable