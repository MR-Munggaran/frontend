import axios from 'axios'
import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'
import Loader from '../components/Loader'



const Authors = () => {
  const [authors, setAuthors] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  useEffect(()=>{
    const getAuthor= async () => {
      setLoading(true)
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/users`)
        setAuthors(response?.data)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    getAuthor()
  },[])

  if(loading) {
    <Loader/>
  }


  return (
      <section className="authors">
        {authors.length > 0 ? <div className="container authors__container">
           {
              authors.map(({_id : id, avatar, name, allPost})=> {
                return <Link to={`/posts/users/${id}`} key={id} className='author'>
                  <div className="author__avatar">
                    <img src={`http://127.0.0.1:5000/uploads/${avatar}`} alt={`Image of ${name}`} />
                  </div>
                  <div className="author__info">
                    <h4>{name}</h4>
                    <p>{allPost}</p>
                  </div>
                </Link>
              })
           }
        </div> : <h2 className='center'>No users/authors found</h2>}
      </section>
  )
}

export default Authors
