import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'


export default function NavBar() {
  return (
     <div className='max-w-5xl mx-auto px-4'>
          <header className='header'>
            <Link to="/" className="logo"> <img src="./src/image/Logo.jpeg" alt="Logo" /></Link>
            <nav className="navbar">
                <Link to="/">Home</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/login">Login</Link>
                <Link to="/enroll">Enroll</Link>
            </nav>
        </header>  
        </div>
  )
}
