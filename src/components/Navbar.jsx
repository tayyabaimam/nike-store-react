import {
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { selectTotalQTY, setOpenCart } from "../app/CartSlice";

const Navbar = () => {
  //This state is used to track the state of the navigation
  const [navState, setnavState] = useState(false);
  const dispatch = useDispatch();
  const totalQTY = useSelector(selectTotalQTY);
  //it dispatches the setOpenCart action with the cartState property set to true. This action is likely used to open the cart.
  const onCartToggle = () => {
    dispatch(
      setOpenCart({
        cartState: true,
      })
    );
  };
  //when the window is scrolled
  const onNavScroll = () => {
    // it checks the window.scrollY property, which represents the number of pixels the page has been scrolled vertically. If the value is greater than 30, it sets the navState to true, indicating that the navigation is scrolled. Otherwise, it sets the navState to false.
    if (window.scrollY > 30) setnavState(true);
    else setnavState(false);
  };

  //The effect runs only once, when the component mounts. It adds an event listener to the scroll event on the window, calling the onNavScroll function. The effect also returns a cleanup function that removes the event listener when the component unmounts.
  useEffect(() => {
    window.addEventListener("scroll", onNavScroll);
    return () => {
      window.removeEventListener("scroll", onNavScroll);
    };
  }, []);

  return (
    <>
      <header
        className={
          !navState
            ? `absolute top-7 left-0 right-0 opacity-100 z-50`
            : `fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center opacity-100 z-[200] blur-effect-theme`
        }
      >
        <nav className="flex items-center justify-between nike-container">
          <div className="flex items-center">
            <img
              src={logo}
              alt="logo/img"
              className={`w-16 h-auto ${navState && "filter brightness-0"} `}
            />
          </div>
          <ul className="flex items-center justify-center gap-2">
            <li className="grid items-center">
              <MagnifyingGlassIcon
                className={`icon-style ${
                  navState && "text-slate-900 transition-all duration-300"
                }`}
              />
            </li>
            <li className="grid items-center">
              <HeartIcon
                className={`icon-style ${
                  navState && "text-slate-900 transition-all duration-300"
                }`}
              />
            </li>
            <li className="grid items-center">
              <button
                type="button"
                onClick={onCartToggle}
                className="border-none outline-none active:trasform-scale-110 transition-all duration-300"
              >
                <ShoppingBagIcon
                  className={`icon-style ${
                    navState && "text-slate-900 transition-all duration-300"
                  }`}
                />
                <div
                  className={`absolute top-4 right-0 shadow  w-4 h-4 text-[0.65rem] leading-tight font-medium rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 ${
                    navState
                      ? "bg-slate-900 text-slate-100 shadow-slate-900"
                      : "bg-slate-100 text-slate-900 shadow-slate-100"
                  }`}
                >
                  {totalQTY}
                </div>
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
