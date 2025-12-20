import React, { useState } from 'react'
import Vector from '../assets/Logo.png'
import HomeIcon from '../assets/icons/HomeIcon.jsx'
import CouponIcon from '../assets/icons/CouponIcon.jsx'
import WhiteListIcon from '../assets/icons/WhiteListIcon.jsx'
import EmailIcon from '../assets/icons/EmailIcon.jsx'
import NotificationIcon from '../assets/icons/NotificationIcon.jsx'
import exit from '../assets/img/exit.svg'
import { useNavigate } from 'react-router-dom'

const SideBar = () => {
  const buttonCollection = [
    HomeIcon,
    CouponIcon,
    WhiteListIcon,
    EmailIcon,
    NotificationIcon,
  ]

  const [activeIndex, setActiveIndex] = useState(1)
  const navigate = useNavigate()

  return (
    <nav className="hidden md:flex w-24 min-h-screen bg-[#1F1D2B] flex-col items-center py-6 gap-6 fixed">
      
      {/* Logo */}
      <div className=" w-10 h-10 flex items-center justify-center">
        <img src={Vector} alt="Chef Kitchen Logo" className="object-contain" />
      </div>

      {/* Buttons */}
      {buttonCollection.map((Icon, index) => (
        <div
          key={index}
          className="rounded-l-2xl relative w-full pl-2 h-18 flex items-center justify-center"
        >
          <button
            onClick={() => setActiveIndex(index)}
            className={`cursor-pointer rounded-l-2xl relative w-full h-18 flex items-center justify-center
              ${index === activeIndex ? 'bg-[#1f2433]' : ''}`}
          >
           
            <Icon
              className={`w-5 h-5 ${
                index === activeIndex ? 'text-white' : 'text-[#F99147]'
              }`}
            />
            {index === activeIndex && (
              <>
                <span className="w-5 h-5 bg-[#1F1D2B] z-20 absolute -top-5 right-0 rounded-br-2xl" />
                <span className="w-5 h-5 bg-[#1f2433] absolute -top-5 right-0" />

                <span className="w-5 h-5 bg-[#1F1D2B] z-20 absolute -bottom-5 right-0 rounded-tr-2xl" />
                <span className="w-5 h-5 bg-[#1f2433] absolute -bottom-5 right-0" />
              </>
            )}
          </button>
        </div>
      ))}

      {/* Exit */}
      <div className="mt-auto pb-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center hover:bg-[#1f2433] px-4 py-5 rounded-xl"
        >
          <img src={exit} alt="exit" />
        </button>
      </div>
    </nav>
  )
}

export default SideBar
