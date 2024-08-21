import React,{Suspense, useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector } from 'react-redux';
import { setAdmin, setUser } from './redux/Store';
import 'bootstrap/dist/css/bootstrap.min.css';



const LazyLogin = React.lazy(()=>import('./pages/User/Login/Login'))
const LazyRegister = React.lazy(()=>import('./pages/User/Register/Register'))
const LazyHome = React.lazy(()=>import('./pages/User/Home/Home'))
const LazyAdminLogin = React.lazy(()=>import('./pages/admin/AdminLogin/AdminLogin'))
const LazyAdminDashboard = React.lazy(()=>import('./pages/admin/AdminDashboard/Dashboard'))


const App = () => {

  // const adminAuth=useSelector((state)=>{
  //   return state.adminAuth.success
  // })

  const userLocalStorage = JSON.parse(localStorage.getItem("user"));
  const AdminLocalStorage=JSON.parse(localStorage.getItem("adminAuth"))
  const dispatch=useDispatch()

  useEffect(()=>{

    if(userLocalStorage){
       dispatch(setUser(userLocalStorage))
    }

    if(AdminLocalStorage){
       dispatch(setAdmin())
    }
    
  },[])

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
      <ToastContainer theme='dark' />
        <Routes>
          <Route path='/' element={<LazyHome />} />
          <Route path='/login' element={<LazyLogin />} />
          <Route path='/register' element={<LazyRegister />} />
          <Route path='/admin/login' element={<LazyAdminLogin />} />
          <Route path='/adminDashboard' element={<LazyAdminDashboard />} />

        </Routes>
      </Suspense>
    </>
  )
}

export default App