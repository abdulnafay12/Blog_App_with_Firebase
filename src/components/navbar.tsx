"use client";

import { auth } from "@/firebase/firebaseauthentication";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";
import { FaRegMoon, FaRegUser } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import { FiSun } from "react-icons/fi";
import { toast } from "react-toastify";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useState, useEffect } from "react";

function Navbar() {
  const [currentPath, setCurrentPath] = useState(""); 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { pathname } = window.location;
      setCurrentPath(pathname); 
    }
  }, []);


  
  console.log("Current Path:", currentPath);

  return (
    <div className="navbar bg-neutral text-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle hover:bg-secondary"
          >
            <GiHamburgerMenu />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content  bg-base-100 text-neutral rounded-box z-[1] mt-3 w-52 p-2 shadow "
          >




            <li>
              <Link
                className="bg-neutral text-base-100 mb-1 hover:bg-secondary"
                href={"/"}
              >
                <IoHomeOutline />
                Go to Home
              </Link>
            </li>





            <li>
              <Link
                className="bg-neutral text-base-100 mb-1 hover:bg-secondary"
                href={"/dashboard"}
              >

                <MdOutlineSpaceDashboard />

                Go to Dashboard
              </Link>
            </li>





            <li>
              <Link
                className="bg-neutral text-base-100 mb-1 hover:bg-secondary"
                href={"/authenticate"}
              >
                <LuLogIn />
                Login / Sign-Up
              </Link>
            </li>





            <li
              onClick={() => {
                signOut(auth);
                toast.success("signed out succesfully")
              }}
            >
              <div className="bg-error text-base-100 mb-1 hover:bg-error flex flex-row items-center justify-start">
                <BiLogOut />
                Logout
              </div>
            </li>



            
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a href="/">
        <Image
        src="/image/bv.png"
        alt="Logo"
        height={25}
        width={70}
        className="rounded-lg"
          />
        </a>
      </div>

      <div className="navbar-end">

        <label className="swap swap-rotate btn btn-ghost btn-circle hover:bg-secondary">
          <input type="checkbox" className="theme-controller" value="mytheme2" />

          <FiSun className="swap-off h-5 w-5 fill-current" />

          <FaRegMoon className="swap-on h-5 w-5 fill-current" />
        </label>

        <Link
          href={"/profile"}
          className="btn btn-ghost btn-circle hover:bg-secondary"
        >
          <FaRegUser />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
