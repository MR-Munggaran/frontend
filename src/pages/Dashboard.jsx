import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Usercontext } from '../context/UserContext'
import Loader from '../components/Loader'
import axios from 'axios'
import DeletePosts from './DeletePosts'



const Dashboard = () => {
  const [posts, setPosts] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const {id} = useParams()

  const {currentUser} = React.useContext(Usercontext)
  const token = currentUser?.token

  // redirect to login page for any user who isn't logged in
  React.useEffect(()=> {
    if (!token) {
      navigate('/login')
    }
  },[])

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get(`http://127.0.0.1:5000/api/posts/users/${id}`, {withCredentials: true, headers: {Authorization: `bearer ${token}`}})
        setPosts(res?.data)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }
    fetchPosts()
  },[id])

  if(isLoading) {
    return <Loader/>
  }

  return (
    <section className="dashboard">
      {
        posts.length ? <div className="container dashboard__container">
            {posts.map(post => {
              return <article className="dashboard__post" key={post._id}>
                <div className="dashboard__post-info">
                  <div className="dashboard__post-thumbnail">
                    <img src={`http://127.0.0.1:5000/uploads/${post?.thumbnail}`} alt="" />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard__post-action">
                  <Link to={`/post/${post._id}`} className='btn sm'>View</Link>
                  <Link to={`/posts/${post._id}/edit`} className='btn sm primary'>Edit</Link>
                  <DeletePosts postId={post._id}/>
                </div>
              </article>
            })}
        </div> : <h2 className='center'>You have no posts yet</h2>
      }
    </section>
  )
}

export default Dashboard
