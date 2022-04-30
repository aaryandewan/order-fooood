import React, { useState } from "react";
import Logo from "./img/logo.png";
import Avatar from "./img/avatar.png";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

import { app } from "../firebase.config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
function Header() {
  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
    // app.auth().signOut();
  };

  const login = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    if (!user) {
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

          //There's a problem that when you refresh, the ContextProvider gets wiped out and
          //and you have to relogin. To counter it, we will store the user info in the local storage
          localStorage.setItem("user", JSON.stringify(user.providerData[0])); //This will store the user info to your localStogage. When you
          //refresh the page, the user info will still be there.

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
    } else {
      setIsMenu(!isMenu);
    }
  };

  return (
    <div className="fixed z-50 w-screen bg-slate-200 p-3 px-4 md:p-6 md:px-16">
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
                src={user ? user.photoURL : Avatar}
                // src="https://lh3.googleusercontent.com/a-/AOh14Giry6rSPrm0bzu6ZoEFnZuEIoLuXXW8jOz4VLaa1w=s96-c"
                alt="avatar"
                className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
                onClick={login}
              />
            </div>
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-20 right-16"
              >
                {user && user.email === "dewanaaryan@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p className=" px-3 py-3 flex items-center justify-center	 gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                <p
                  onClick={logout}
                  className="px-3 py-3  flex items-center justify-center	 gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                >
                  LogOut <MdLogout />
                </p>
              </motion.div>
            )}
          </li>
        </ul>
      </div>

      {/* mobile */}
      <div className="flex md:hidden w-full h-full justify-between items-center">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-10 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.8 }}
            src={user ? user.photoURL : Avatar}
            // src="https://lh3.googleusercontent.com/a-/AOh14Giry6rSPrm0bzu6ZoEFnZuEIoLuXXW8jOz4VLaa1w=s96-c"
            alt="avatar"
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            onClick={login}
          />

          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-20 right-16"
            >
              <ul className="flex  flex-col ">
                {user && user.email === "dewanaaryan@gmail.com" && (
                  <Link to={"/createItem"}>
                    <li className=" px-3 py-3 flex items-center justify-center	 gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                      New Item <MdAdd />
                    </li>
                  </Link>
                )}

                <li className=" px-3 py-3 flex items-center justify-center	 gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                  Home
                </li>
                <li className=" px-3 py-3 flex items-center justify-center	 gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                  Menu
                </li>
                <li className=" px-3 py-3 flex items-center justify-center	 gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                  About Us
                </li>
                <li className=" px-3 py-3 flex items-center justify-center	 gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                  Services
                </li>

                <p
                  onClick={logout}
                  className="px-3 py-3  flex items-center justify-center	 gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base rounded-md shadow-md bg-gray-200 hover:bg-gray-300"
                >
                  LogOut <MdLogout />
                </p>
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
