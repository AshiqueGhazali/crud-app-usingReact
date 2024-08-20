import React from 'react';
import './Home.css'
import userProfile from '../../../assets/userProfile.png'

const Home = () => {
  return (
    <div className='home'>
        <div className='profile-image'>
            <div className="image-container">
                <img src={userProfile} alt="Description of image"/>
            </div>
            <div className="home-btns">
              <button className='btn'>update Profile Image</button>
            </div>
        </div>
        <div className='userDetails'>
            <h1>welcome, Ashique</h1>
            <h3>example@gmail.com</h3>
            <div className="home-btns">
              <button className='btn'>Edit</button>
              <button className='btn'>Change Password</button>
            </div>
        </div>
    </div>
  )
}

export default Home