import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
      <button onClick={()=>setToken('')} className="px-4 py-2 text-sm font-medium text-gray-600 rounded hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300">
  Logout
</button>

    </div>
  )
}

export default Navbar
