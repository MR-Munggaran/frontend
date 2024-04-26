import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import id from 'javascript-time-ago/locale/id.json'

TimeAgo.addDefaultLocale(id)
TimeAgo.addLocale(en)

const PostAuthor = ({createdAt, authorID}) => {
  const [author, setAuthor] = useState({})
  useEffect(()=> {  
    const getAuthor = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/users/${authorID}`)
        setAuthor(response?.data)
      } catch (error) {
        console.log(error)
      }
    }
    getAuthor()
  })

  return (
    <Link to={`/posts/users/${authorID}`} className='post__author'>
        <div className="post__author-avatar ">
            <img src={`http://127.0.0.1:5000/uploads/${author?.avatar}`} alt="" />
        </div>
        <div className="post__author-detail">
            <h5>By: {author?.name}</h5>
            <small><ReactTimeAgo date={new Date(createdAt)} locale='id'/></small>
        </div>
    </Link>
  )
}

export default PostAuthor
