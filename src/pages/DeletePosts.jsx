import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Usercontext } from '../context/UserContext'
import axios from 'axios'

const DeletePosts = ({postId :id}) => {
  const navigate = useNavigate()
  const location = useLocation()

  const {currentUser} = React.useContext(Usercontext)
  const token = currentUser?.token

  // redirect to login page for any user who isn't logged in
  React.useEffect(()=> {
    if (!token) {
      navigate('/login')
    }
  },[])

  const removePost = async () => {
    try {
      const res = await axios.delete(`http://127.0.0.1:5000/api/posts/${id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      if(res.status == 200) {
        if(location.pathname == `mypost/${currentUser.id}`) {
          navigate(0)
        }else {
          navigate('/')
        }
      }
    } catch (error) {
      console.log("Couldn't delete post")
    }
  }
  return (
    <Link className='btn sm danger' onClick={()=> removePost(id)}>Delete</Link>
  )
}

export default DeletePosts
