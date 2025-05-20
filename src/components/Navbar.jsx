import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
       <div className='h-[8vh] bg-[#1B4130] flex justify-between items-center rounded-full p-5'>
        <div className='flex gap-10 p-10'>
          <Link to="/">HOME</Link>
          <Link to="/domains">DOMAINS</Link>
          <Link to="/about">ABOUT US</Link>
          <Link to="/ourteam">OUR TEAM</Link>
          <Link to="/events">EVENTS</Link>
          <Link to="/contactus">CONTACT US</Link>
        </div>
      </div> 
    </>
  )
}

export default Navbar
