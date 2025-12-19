import React from 'react'
import img1 from '../assets/img/img1.svg'
import img2 from '../assets/img/img2.svg'
import img3 from '../assets/img/img3.svg'
import img4 from '../assets/img/img4.svg'

const BottomNav = () => {
  return (
    <div className="
      fixed bottom-0 left-0 right-0 bg-[#1F1D2B] flex justify-around items-center
      py-3 md:hidden border-t border-[#2f354a] z-50 ">
      <img src={img1} className="w-6" />
      <img src={img2} className="w-6" />
      <img src={img4} className="w-6" />
  <img
    src={img3}
    className="w-6 cursor-pointer"
  />
  
    </div>
    
  );
};


export default BottomNav
