import React from "react";
import { useNavigate } from "react-router-dom";
import ChefLogo from "../assets/ChefLogo.png";
import ttt from "../assets/img/ttt.svg";

const Compact1 = () => {
  const navigate = useNavigate();

  return (
      <section className="relative flex flex-col items-center gap-5 p-4 pt-12 pb-12 bg-black text-white overflow-hidden">
        {/* Background */}
        <img
          src="/frontPageBG.png"
          alt="Fruit bowl splash"
          className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm z-0"
        />

        {/* Logo Card */}
        <div className="relative flex flex-col items-center justify-center w-[328px] h-[421px] p-4 pt-12 pb-12 rounded-xl bg-black text-white z-10 shadow-[-4px_-4px_100px_80px_#EA7C693D] overflow-hidden">
          <img
            src={ttt}
            alt="Fruit bowl splash"
            className="absolute inset-0 w-full h-full object-cover opacity-80 z-0"
          />
          <div className="flex items-center justify-center w-[142px] h-[142px] rounded-full z-10 backdrop-blur-sm">
            <img src={ChefLogo} alt="Logo" className="w-[110px] h-[110px]" />
          </div>
        </div>

        {/* Heading + Paragraph */}
        <div className="z-10 mt-6 text-center space-y-2">
          <h1 className="font-sans text-[32px] leading-[40px] tracking-[0.01em] shrink-0">
            Welcome to Chef Kitchen
          </h1>
          <p className="p-3 text-4 font-montserrat leading-[100%]">
            Check out the awesome food experience! It's super fresh, quick, and
            oh-so tasty!
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/mainPage")}
          className="z-10 mt-auto mb-6 w-92 h-13 flex items-center justify-center font-monserrat
           gap-3 rounded-xl p-4 bg-[#F99147] shadow-[0px_4px_20px_0px_#EA7C693D]
            hover:bg-[#e67e30] transition active:scale-95"
        >
          Explore Menu
        </button>
      </section>
  );
};

export default Compact1;