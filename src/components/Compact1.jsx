import React from 'react'
import { useNavigate } from 'react-router-dom'
import frontPageBG from '../assets/frontPageBG.png'
import ChefLogo from '../assets/ChefLogo.png'
import ttt from '../assets/img/ttt.svg'

const Compact1 = () => {
  const navigate = useNavigate();

  const toHomepage = () => {

    navigate('/mainPage')
  }

  return (
    <div className="bg-black ">
      <section className="relative bg-black text-white overflow-hidden pt-12 pr-4 pb-12 pl-4 gap-[20px] flex flex-col items-center">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={frontPageBG}
            alt="Fruit bowl splash"
            className="w-full h-full object-cover opacity-50 blur-xs"
          />
        </div>

        {/* Logo Card at Top */}
        <div className="relative bg-black text-white overflow-hidden w-[328px] h-[421px] pt-12 pr-4 pb-12 pl-4 
        flex flex-col items-center justify-center rounded-xl z-10 
        shadow[-4px_-4px_100px_80px_#EA7C693D]">
          <div className="absolute inset-0 z-0 ">
            <img
              src={ttt}
              alt="Fruit bowl splash"
              className="w-full h-full object-cover opacity-80 "
            />
          </div>

          <div className="w-[142px] h-[142px] flex items-center justify-center rounded-full z-10 backdrop-blur-sm ">
            <img
              src={ChefLogo}
              alt="Logo"
              className="w-[110px] h-[110px]"
            />
          </div>
        </div>

        {/* Heading + Paragraph under Logo */}
        <div className="z-10 text-center space-y-2 mt-6">
          <h1 className="font-sans font-normal text-[32px] leading-[40px] tracking-[0.01em]">
            Welcome to Chef Kitchen
          </h1>
          <p className="font-[Montserrat] font-normal text-[16px] leading-[100%] tracking-[0]">
            Check out the awesome food experience! It's super fresh, quick, and oh-so tasty!
          </p>
        </div>

        {/* Button at Bottom */}
        <div className="z-10 mt-auto mb-6">
          <button
            onClick={toHomepage}
            className="w-[370px] h-[54px] flex items-center justify-center gap-[12px] 
              rounded-[7.27px] p-[16px] bg-[#F99147] 
              shadow-[0px_4px_20px_0px_#EA7C693D] hover:bg-[#e67e30] transition"
          >
            Explore Menu
          </button>
        </div>
      </section>
    </div>
  );
};

export default Compact1;
