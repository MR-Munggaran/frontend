import React from 'react'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'

const PostItem = ({postId, category, title, description, authorID, thumbnail, createdAt}) => {
    const shortDescription = description.length > 145 ? description.substr(0, 145) + '...' : description;
    const PostTitle = title.length > 30 ? title.substr(0, 30) + '...' : title;
  return (
    <article className="post">
        <div className="post__thumbnail">
            <img src={`http://127.0.0.1:5000/uploads/${thumbnail}`} alt={title} />
        </div>
        <div className="post__content">
            <Link to={`/post/${postId}`}>
                <h3>{PostTitle}</h3>
            </Link>
            <p dangerouslySetInnerHTML= {{__html: shortDescription}}></p>
            <div className="post__footer">
                <PostAuthor authorID={authorID} createdAt={createdAt}/>
                <Link to={`/posts/category/${category}`} className='btn category'>{category}</Link>
            </div>
        </div>
    </article>
  )
}

export default PostItem
