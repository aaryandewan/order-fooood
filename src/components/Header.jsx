import React from "react";
import Logo from "./img/logo.png";
import Avatar from "./img/avatar.png";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

import { app } from "../firebase.config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
function Header() {
  const [{ user }, dispatch] = useStateValue();

  const login = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // console.log(result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("HELLO WORLD!");
        // console.log(user);
        // console.log(user.providerData[0]);
        dispatch({
          type: actionType.SET_USER,
          user: user.providerData[0],
        });

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="fixed z-50 w-screen bg-slate-200 p-6 px-16">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-10 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

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
            <div className="relative">
              <motion.img
                whileTap={{ scale: 0.8 }}
                src={Avatar}
                alt="avatar"
                className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer"
                onClick={login}
              />
            </div>
          </li>
        </ul>
      </div>

      {/* mobile */}
      <div className="flex md:hidden w-full h-full"></div>
    </div>
  );
}

export default Header;
