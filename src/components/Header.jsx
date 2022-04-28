import React from "react";
import Logo from "./img/logo.png";
import Avatar from "./img/avatar.png";
import { MdShoppingBasket } from "react-icons/md";

function Header() {
  return (
    <div className="fixed z-50 w-screen bg-slate-200 p-6 px-16">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full">
        <div className="flex items-center gap-2">
          <img src={Logo} className="w-10 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </div>

        <ul className="flex items-center gap-8 ml-auto">
          <li className="text-base text-textColor hover:text-textHeadingColor duration-100 transition-all ease-in-out cursor-pointer">
            Home
          </li>
          <li className="text-base text-textColor hover:text-textHeadingColor duration-100 transition-all ease-in-out cursor-pointer">
            Menu
          </li>
          <li className="text-base text-textColor hover:text-textHeadingColor duration-100 transition-all ease-in-out cursor-pointer">
            About Us
          </li>
          <li className="text-base text-textColor hover:text-textHeadingColor duration-100 transition-all ease-in-out cursor-pointer">
            Services
          </li>
          <li className="text-base text-textColor hover:text-textHeadingColor duration-100 transition-all ease-in-out cursor-pointer">
            <div className="flex items-center justify-center">
              <MdShoppingBasket className="text-2xl" />
              <div className="absolute mb-7 ml-7 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-white">2</p>
              </div>
            </div>
          </li>
          <li>
            <img
              src={Avatar}
              alt="avatar"
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl"
            />
          </li>
        </ul>
      </div>

      {/* mobile */}
      <div className="flex md:hidden w-full h-full"></div>
    </div>
  );
}

export default Header;
