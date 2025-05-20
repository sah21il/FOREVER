

import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

  const [visible,setVisible]=useState(false);

  const {setShowSearch ,getCartCount,navigate,token,setToken,setCartItems}=useContext(ShopContext);

  const logout=()=>{
    navigate('/login')
    localStorage.removeItem('token');
    setToken('')
    setCartItems({})
    
  }



  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'><img src={assets.logo} className='w-36' alt="" /></Link>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
      <NavLink to='/' className='flex flex-col items-center gap-1 '>
        <p>HOME</p>
        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
      </NavLink>
      <NavLink to='/collection' className='flex flex-col items-center gap-1 '>
        <p>COLLECTION</p>
        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
      </NavLink>
      <NavLink to='/about' className='flex flex-col items-center gap-1 '>
        <p>ABOUT</p>
        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
      </NavLink>
      <NavLink to='/contact' className='flex flex-col items-center gap-1 '>
        <p>CONTACT</p>
        <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
      </NavLink>
      </ul> 

      <div className='flex items-center gap-6'>
        <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer ' alt=''/>

        <div className='group relative'>
          <img onClick={()=>{ token ? null : navigate('/login')}} className='w-5 cursor-pointer' src={assets.profile_icon} alt=''/>
          {token && 
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
              <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
            </div> 
          </div> }     
        </div>

        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5'/>
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>

        </Link>
        <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />

      </div>
      <div className={`absolute top-0 bottom-0 right-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>

          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>

        </div>
      </div>
    </div>
  )
}

export default Navbar



{/*
import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'COLLECTION', path: '/collection' },
    { label: 'ABOUT', path: '/about' },
    { label: 'CONTACT', path: '/contact' }
  ]

  return (
    <div className="w-full bg-white shadow-sm z-50 relative">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between py-5 px-4 sm:px-8 font-medium">

        <Link to="/">
          <img src={assets.logo} alt="Logo" className="w-32 sm:w-36" />
        </Link>

        <ul className="hidden sm:flex gap-6 text-sm">
          {navLinks.map(({ label, path }) => (
            <NavLink key={label} to={path}>
              {({ isActive }) => (
                <div className="flex flex-col items-center gap-1 hover:text-black transition">
                  <p className={`${isActive ? 'text-black font-semibold' : 'text-gray-700'}`}>{label}</p>
                  <div className={`h-[2px] w-4/6 bg-black transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                </div>
              )}
            </NavLink>
          ))}
        </ul>

        <div className="flex items-center gap-5">

          <img src={assets.search_icon} alt="Search" className="w-5 cursor-pointer" />

          <div className="relative group">
            <img src={assets.profile_icon} alt="Profile" className="w-5 cursor-pointer" />
            <div className="absolute right-0 top-full mt-2 hidden group-hover:flex flex-col bg-white shadow-md rounded-lg p-4 text-sm text-gray-600 z-10 min-w-[140px]">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>

          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} alt="Cart" className="w-5" />
            <span className="absolute -right-2 -bottom-2 bg-black text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              10
            </span>
          </Link>

          <img
            src={assets.menu_icon}
            alt="Menu"
            className="w-5 cursor-pointer sm:hidden"
            onClick={() => setMobileMenuOpen(true)}
          />
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full text-gray-800">

          <div
            className="flex items-center gap-3 p-4 border-b cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="Back" />
            <p>Close</p>
          </div>

          {navLinks.map(({ label, path }) => (
            <NavLink
              key={label}
              to={path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `py-4 px-6 border-b text-sm ${isActive ? 'bg-gray-100 text-black font-semibold' : 'hover:bg-gray-50'}`
              }
            >
              {label}
            </NavLink>
          ))}

        </div>
      </div>
    </div>
  )
}

export default Navbar
*/}