import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEdit, FaCheck  } from "react-icons/fa";
import { Usercontext } from '../context/UserContext';
import axios from 'axios';

const UserProfile = () => {
  const [avatar, setAvatar] = React.useState('')
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [currentPassword, setCurrentPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [newConfirmPassword, setNewConfirmPassword] = React.useState('')
  const [isAvatarTouched, setIsAvatarTouched] = React.useState(false)
  const [error, setError] = React.useState('')

  const navigate = useNavigate()

  const {currentUser} = React.useContext(Usercontext)
  const token = currentUser?.token

  // redirect to login page for any user who isn't logged in
  React.useEffect(()=> {
    if (!token) {
      navigate('/login')
    }
  },[])

  React.useEffect(()=> {
    const getUser = async () => {
      const res = await axios.get(`http://127.0.0.1:5000/api/users/${currentUser.id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      const {name, email, avatar} = res.data
      setName(name)
      setEmail(email)
      setAvatar(avatar)
    }
    getUser()
  },[])

  const changeAvatarHandler = async () => {
    setIsAvatarTouched(false)
    try {
      const postData = new FormData()
      postData.set('avatar', avatar)
      const res = await axios.post('http://127.0.0.1:5000/api/users/change-avatar', postData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      setAvatar(res.data.avatar)
    } catch (error) {
      console.log(error)
    }
  }

  const updateUserDetail = async (e) => {
    e.preventDefault()

    try {
      const userData = new FormData()
      userData.set('name', name)
      userData.set('email', email)
      userData.set('currentPassword', currentPassword)
      userData.set('newPassword', newPassword)
      userData.set('newConfirmPassword', newConfirmPassword)
  
      const res = await axios.patch(`http://127.0.0.1:5000/api/users/edit-user`, userData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      if(res.status == 200) {
        navigate('/logout')
      }
    } catch (error) {
      setError(error.response.data.message)
    }
  }
  
  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/mypost/${currentUser.id}`} className='btn'>My Post</Link>

        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
                <img src={`http://127.0.0.1:5000/uploads/${avatar}`} alt="" />
            </div>
            {/* Form to update avatar  */}
            <form action="" className='avatar__form' >
              <input type="file" name="avatar" id="avatar" accept='png, jpg, jpeg' onChange={e => setAvatar(e.target.files[0])}/>
              <label htmlFor="avatar" onClick={()=> setIsAvatarTouched(true) }><FaEdit/></label>
            </form>
            {isAvatarTouched && <button className='profile__avatar-btn' onClick={changeAvatarHandler}><FaCheck/></button>}
          </div>
          <h1>{currentUser.name}</h1>
          {/* form to update user details */}
          <form action="" className='form profile__form' onSubmit={updateUserDetail}>
            {error && <p className='form__error-message'>${error}</p>}
            <input type="text" placeholder='Full Name' value={name} onChange={e => setName(e.target.value)}/>
            <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
            <input type="password" placeholder=' Current Password' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}/>
            <input type="password" placeholder='New Password' value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
            <input type="password" placeholder='Confirm New Password' value={newConfirmPassword} onChange={e => setNewConfirmPassword(e.target.value)}/>
            <button type="submit" className='btn primary'>Update my details</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile
