import React from 'react'
import Vector from '../assets/Logo.png'
import img1 from '../assets/img/img1.svg'
import img2 from '../assets/img/img2.svg'
import img3 from '../assets/img/img3.svg'
import img4 from '../assets/img/img4.svg'
import img5 from '../assets/img/img5.svg'
import exit from '../assets/img/exit.svg'
import { useNavigate } from 'react-router-dom'

const SideBar = () => {

  const navigate = useNavigate()
  const toExit = () => {
    navigate ("/")
  } 
  return (
    <>
      <nav className=" hidden md:flex w-[72px] h-screen bg-[#1F1D2B] flex-col items-center py-6 gap-6 
                    border border-transparent
                     transition-all duration-300 fixed float-left">
        {/* logo */}
        <div className="w-[38.8px] h-[38.8px] flex items-center justify-center">
          <img src={Vector} alt="Chef Kitchen Logo"
            className=" object-contain " />
        </div>

        {/* buttons */}
        <div className='flex flex-col'>
          <div className='flex items-center justify-center hover:bg-[#1f2433] px-4 py-7 rounded-xl '>
          <img src={img1} alt="logo 1" 
          className=''/>
          </div>
          <div className='flex  items-center justify-center hover:bg-[#1f2433] px-4 py-7 rounded-xl '>
          <img src={img2} alt="logo 2" />
          </div>
          <div className='flex  items-center justify-center hover:bg-[#1f2433] px-4 py-7 rounded-xl '>
          <img src={img3} alt=" logo 3" />
          </div>
          <div className='flex  items-center justify-center hover:bg-[#1f2433] px-4 py-7 rounded-xl'>
          <img src={img4} alt='logo4' />
          </div>
          <div className='flex  items-center justify-center hover:bg-[#1f2433] px-4 py-7 rounded-xl'>
          <img src={img5} alt="logo 5" />
          </div>


        </div>
        <div className='flex items-center justify-center hover:bg-[#1f2433] px-4 py-5 rounded-xl mt-auto pb-4'>
          <button onClick={toExit}>
          <img src={exit} alt="exit" />
          </button> 
        </div>

      </nav>
    </>
  )
}

export default SideBar
