import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/user/Navbar';
import './Home.css'


const Home = () => {

  const data = useSelector((state) => {
    return state.auth.success;
  });

  const navigate = useNavigate('')

  useEffect(()=>{
    if(!data){
      navigate('/login')
    }
  },[])

  return (
    <div className='userPage'>
      <Navbar/>
    </div>
  )
}

export default Home