import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer>
      <ul className="footer__categories">
        <li><Link to='/posts/category/Agriculture'>Agriculture</Link></li>
        <li><Link to='/posts/category/Bussiness'>Bussiness</Link></li>
        <li><Link to='/posts/category/Education'>Education</Link></li>
        <li><Link to='/posts/category/Entertainment'>Entertainment</Link></li>
        <li><Link to='/posts/category/Art'>Art</Link></li>
        <li><Link to='/posts/category/Investment'>Investment</Link></li>
        <li><Link to='/posts/category/Uncategorized'>Uncategorized</Link></li>
        <li><Link to='/posts/category/Weather'>Weather</Link></li>
        <li><Link to='/posts/category/Agriculture'>Agriculture</Link></li>
        <li><Link to='/posts/category/Agriculture'>Agriculture</Link></li>
      </ul>
      <div className="footer__copyright">
        <small>All Right Reserved &copy; Copyright, Rafi Munggaran.</small>
      </div>
    </footer>
  )
}

export default Footer
