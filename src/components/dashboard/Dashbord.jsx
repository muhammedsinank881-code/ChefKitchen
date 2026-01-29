import React from 'react'
import Navbar from './Navbar'
import { CgProfile } from "react-icons/cg";
import Product from './itemPAges/Product';
import Category from './itemPAges/Category';
import Orders from './itemPAges/Orders';
import { useState } from 'react';

const Dashbord = () => {
  const [activePage, setActivePage] = useState("products"); 
  return (
    <>
    <div className='flex flex-col md:flex-row w-full md:h-screen'>
     <Navbar onSelect={(page)=>setActivePage(page) }
      activePage={activePage}/>
      <div className='flex flex-col w-full'>
        <div className='w-full flex items-center justify-end border-b border-gray-300 p-3'>
            <div className='flex flex-row items-center gap-2 '>
                <CgProfile className='text-4xl text-gray-600'/>
                <div className='flex flex-col'>
                    <h1 className='font-bold text-gray-700'>Admin</h1>
                    <p className='font-semibold text-gray-400 text-xs'>admin@Gmail.com</p>
                </div>
            </div>
        </div>

        <div className='flex-1 overflow-auto'>
          {activePage === "products" && <Product/>}
          {activePage === "category" && <Category/>}
          {activePage === "orders" && <Orders/>}
        </div>
        <div className='flex flex-row justify-between px-9 text-gray-400 mt-auto pt-5 pb-10 border-t '>
          <h1>Showing 1-10 of 6</h1>
          <div className='flex flex-row items-center justify-center gap-2 text-gray-700'>
            <button className='border border-gray-400 rounded px-2 py-1'>Prev</button>
            <span className='bg-gray-300 px-3 py-1 rounded'>1</span>
            <button className='border border-gray-400 rounded px-2 py-1'>Next</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashbord
