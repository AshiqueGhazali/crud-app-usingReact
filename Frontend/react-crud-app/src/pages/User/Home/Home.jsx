import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../../redux/Store';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import { storage } from '../../../firebase/config'; 
import './Home.css'
import userProfile from '../../../assets/userProfile.png'
import EditProfile from '../../../components/user/EditProfile';
import { setUser } from '../../../redux/Store';


const Home = () => {

  const [editForm,setEditForm] = useState(false)
  const [image, setImage] = useState(null);


  const data = useSelector((state) => {
    return state.auth.success;
  });

  const userData = useSelector((state) => {
    return state.auth.user;
  });
  const { userName, email, imageURL } = userData;

  const navigate = useNavigate('')
  const dispatch = useDispatch()

  useEffect(()=>{
    if(!data){
      navigate('/login')
    }
  },[])

  const handleLogout = ()=>{
    localStorage.removeItem('user')
    dispatch(logout())
    navigate('/login')
  }

  const handleEditForm = ()=>{
    setEditForm(!editForm)
  }

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);


      const storageRef = ref(storage, `profile_images/${selectedImage.name}`);
      uploadBytes(storageRef, selectedImage)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((url) => {
          return axios.post('//localhost:5000/updateImage', {
            imageUrl: url,
            userId: userData._id, // or any other relevant data
          });
        })
        .then(response => {
          console.log('Image URL saved:', response.data);
          dispatch(setUser({ ...userData, imageURL:response.data.imageUrl })); 
        })
        .catch(error => {
          console.error('Error saving image URL:', error);
        });
    }
  };

  // const handleUpload = () => {
  //   if (image) {
  //     const storageRef = ref(storage, `profile_images/${image.name}`);
  //     uploadBytes(storageRef, image).then((snapshot) => {
  //       getDownloadURL(snapshot.ref).then((url) => {
  //         axios.post('//localhost:5000/updateImage', {
  //           imageUrl: url,
  //           userId: userData._id, // or any other relevant data
  //         }).then(response => {
  //           console.log('Image URL saved:', response.data);
  //           // Update user profile with the new image URL or any other necessary state updates
  //         }).catch(error => {
  //           console.error('Error saving image URL:', error);
  //         });
  //       });
  //     }).catch((error) => {
  //       console.error('Error uploading image:', error);
  //     });
  //   }
  // };


  return (
    <div className='home'>
        <div className='profile-image'>
            <div className="image-container">
                <img src={imageURL || userProfile} alt="Description of image"/>
            </div>
            <div className="home-btns">
              <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleImageChange} />
              <label htmlFor="fileInput" className='btn'>Upload Profile Image</label>
              {/* <button className='btn' onClick={handleUpload}>Upload Profile Image</button> */}
            </div>
        </div>
        <div className='userDetails'>
            <h1>welcome, {userName}</h1>
            <h3>{email}</h3>
            <div className="home-btns">
              <button className='btn' onClick={handleEditForm}>Edit</button>
              <button className='btn'>Change Password</button>
              <button onClick={handleLogout} className='btn'>Logout</button>
            </div>
        </div>
        {editForm?<EditProfile handleEditForm={handleEditForm} show={editForm} userData={userData}/>:<></>}
    </div>
  )
}

export default Home