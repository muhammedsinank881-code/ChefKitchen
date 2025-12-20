import { useState } from 'react'
import HomeIcon from '../assets/icons/HomeIcon.jsx'
import CouponIcon from '../assets/icons/CouponIcon.jsx'
import WhiteListIcon from '../assets/icons/WhiteListIcon.jsx'
import EmailIcon from '../assets/icons/EmailIcon.jsx'
import NotificationIcon from '../assets/icons/NotificationIcon.jsx'

const BottomNav = () => {
  const buttonCollection = [
    HomeIcon,
    CouponIcon,
    WhiteListIcon,
    EmailIcon,
    NotificationIcon,
  ]

  const [activeIndex, setActiveIndex] = useState(1)

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1F1D2B] flex justify-around items-center pb-2 md:hidden border-t border-[#2f354a] z-50">
      {buttonCollection.map((Icon, index) => (
        <div
          key={index}
          className="rounded-b-2xl relative w-full h-10 flex items-center justify-center"
        >
          <button
            onClick={() => setActiveIndex(index)}
            className={`rounded-xl relative pt-2 pl-2 pb-1 pr-1 flex items-center justify-center
              ${index === activeIndex ? 'text-white bg-orange-500' : 'text-orange-500'}`}
          >
            <Icon className="w-6 h-6" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default BottomNav
