import React from 'react'
import './NavBar.css'



export default function NavBar() {
  return (
     <div className='max-w-5xl mx-auto px-4'>
          <header className='header'>
            <a href="/" className="logo"> <img src="./src/image/Logo.jpeg" alt="Logo" /></a>
            <nav className="navbar">
                <a href="/">Home</a>
                <a href="/contact">Contact</a>
                <a href="/login">Login</a>
                <a href="/enroll">Enroll</a>
            </nav>
        </header>  
        </div>
  )
}
