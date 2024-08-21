import React from 'react'
import Table from 'react-bootstrap/Table';



const UserTable = ({userDatas}) => {
    
  return (
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
            {userDatas.map((user,index)=>{
                return(
                    <tr key={index}>
                        <td className='text-danger'>{index+1}</td>
                        <td>{user.userName}</td>
                        <td>{user.email}</td>
                        <td>{user.userName}</td>
                    </tr>
                )
            })}
        </tbody>
      </Table>

        </div>
  )
}

export default UserTable