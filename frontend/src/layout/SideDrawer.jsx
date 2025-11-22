import React, { useState } from "react";
import { RiAuctionFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaFacebook, FaHistory } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link } from "react-router-dom";
import "../styles/animations.css";
import CurrencySelector from "@/components/CurrencySelector";

const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div
        onClick={() => setShow(!show)}
        className="fixed right-4 top-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-2xl xs:text-3xl p-3 xs:p-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 lg:hidden z-50 shadow-lg mobile-button touch-manipulation tap-highlight-transparent"
      >
        <GiHamburgerMenu />
      </div>
      <div
        className={`w-[100%] sm:w-[320px] bg-white/95 backdrop-blur-lg h-full fixed top-0 ${
          show ? "left-0" : "left-[-100%]"
        } transition-all duration-300 p-4 xs:p-6 flex flex-col justify-between lg:left-0 border-r border-slate-200 z-40 shadow-2xl mobile-scroll safe-area-inset`}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-40 right-10 w-40 h-40 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10 flex-1 overflow-y-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-200">
            <Link to={"/"} className="touch-manipulation tap-highlight-transparent">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <RiAuctionFill className="text-white text-xl" />
                </div>
                <h4 className="text-2xl xs:text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 text-transparent bg-clip-text">
                  Prime<span>Bid</span>
                </h4>
              </div>
            </Link>
            {isAuthenticated && (
              <div className="bg-slate-100 rounded-lg p-2">
                <CurrencySelector className="currency-selector-sidebar" />
              </div>
            )}
          </div>
          {/* Main Navigation */}
          <div className="mb-8">
            <h5 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-4">Main Menu</h5>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  to={"/auctions"}
                  className="flex text-base font-medium gap-3 items-center text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 py-3 px-4 rounded-xl group mobile-button touch-manipulation tap-highlight-transparent"
                  onClick={() => setShow(false)}
                >
                  <div className="w-8 h-8 bg-slate-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <RiAuctionFill className="text-lg text-slate-600 group-hover:text-blue-600" />
                  </div>
                  <span>Auctions</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/leaderboard"}
                  className="flex text-base font-medium gap-3 items-center text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 py-3 px-4 rounded-xl group mobile-button touch-manipulation tap-highlight-transparent"
                  onClick={() => setShow(false)}
                >
                  <div className="w-8 h-8 bg-slate-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <MdLeaderboard className="text-lg text-slate-600 group-hover:text-blue-600" />
                  </div>
                  <span>Leaderboard</span>
                </Link>
              </li>
            </ul>
          </div>
          {/* Auctioneer Tools */}
          {isAuthenticated && user && user.role === "Auctioneer" && (
            <div className="mb-8">
              <h5 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-4">Auctioneer Tools</h5>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    to={"/submit-commission"}
                    className="flex text-base font-medium gap-3 items-center text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300 py-3 px-4 rounded-xl group mobile-button touch-manipulation tap-highlight-transparent"
                    onClick={() => setShow(false)}
                  >
                    <div className="w-8 h-8 bg-slate-100 group-hover:bg-emerald-100 rounded-lg flex items-center justify-center transition-colors duration-300">
                      <FaFileInvoiceDollar className="text-lg text-slate-600 group-hover:text-emerald-600" />
                    </div>
                    <span>Submit Commission</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/create-auction"}
                    className="flex text-base font-medium gap-3 items-center text-slate-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300 py-3 px-4 rounded-xl group mobile-button touch-manipulation tap-highlight-transparent"
                    onClick={() => setShow(false)}
                  >
                    <div className="w-8 h-8 bg-slate-100 group-hover:bg-purple-100 rounded-lg flex items-center justify-center transition-colors duration-300">
                      <IoIosCreate className="text-lg text-slate-600 group-hover:text-purple-600" />
                    </div>
                    <span>Create Auction</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/view-my-auctions"}
                    className="flex text-base font-medium gap-3 items-center text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 py-3 px-4 rounded-xl group mobile-button touch-manipulation tap-highlight-transparent"
                    onClick={() => setShow(false)}
                  >
                    <div className="w-8 h-8 bg-slate-100 group-hover:bg-indigo-100 rounded-lg flex items-center justify-center transition-colors duration-300">
                      <FaEye className="text-lg text-slate-600 group-hover:text-indigo-600" />
                    </div>
                    <span>View My Auctions</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
          {/* Admin Tools */}
          {isAuthenticated && user && user.role === "Super Admin" && (
            <div className="mb-8">
              <h5 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-4">Admin Tools</h5>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    to={"/dashboard"}
                    className="flex text-base font-medium gap-3 items-center text-slate-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300 py-3 px-4 rounded-xl group mobile-button touch-manipulation tap-highlight-transparent"
                    onClick={() => setShow(false)}
                  >
                    <div className="w-8 h-8 bg-slate-100 group-hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors duration-300">
                      <MdDashboard className="text-lg text-slate-600 group-hover:text-red-600" />
                    </div>
                    <span>Dashboard</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* Authentication Section */}
          <div className="mb-8">
            {!isAuthenticated ? (
              <div className="space-y-3">
                <Link
                  to={"/sign-up"}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-base font-semibold rounded-xl px-4 py-3 transition duration-300 transform hover:scale-[1.02] active:scale-95 hover:shadow-lg focus:outline-none mobile-button touch-manipulation tap-highlight-transparent text-center block"
                  onClick={() => setShow(false)}
                >
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="w-full bg-slate-100 text-slate-700 text-base font-semibold rounded-xl px-4 py-3 transition duration-300 transform hover:scale-[1.02] active:scale-95 hover:bg-slate-200 focus:outline-none border border-slate-200 mobile-button touch-manipulation tap-highlight-transparent text-center block"
                  onClick={() => setShow(false)}
                >
                  Login
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white text-base font-semibold rounded-xl px-4 py-3 transition duration-300 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none mobile-button touch-manipulation tap-highlight-transparent"
              >
                Logout
              </button>
            )}
          </div>
          {/* Secondary Navigation */}
          <div className="mb-8">
            <h5 className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-4">More</h5>
            <ul className="flex flex-col gap-2">
              {isAuthenticated && (
                <li>
                  <Link
                    to={"/me"}
                    className="flex text-base font-medium gap-3 items-center text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 py-3 px-4 rounded-xl group mobile-button touch-manipulation tap-highlight-transparent"
                    onClick={() => setShow(false)}
                  >
                    <div className="w-8 h-8 bg-slate-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors duration-300">
                      <FaUserCircle className="text-lg text-slate-600 group-hover:text-blue-600" />
                    </div>
                    <span>Profile</span>
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to={"/how-it-works-info"}
                  className="flex text-base font-medium gap-3 items-center text-slate-700 hover:text-amber-600 hover:bg-amber-50 transition-all duration-300 py-3 px-4 rounded-xl group mobile-button touch-manipulation tap-highlight-transparent"
                  onClick={() => setShow(false)}
                >
                  <div className="w-8 h-8 bg-slate-100 group-hover:bg-amber-100 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <SiGooglesearchconsole className="text-lg text-slate-600 group-hover:text-amber-600" />
                  </div>
                  <span>How it works</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/about"}
                  className="flex text-base font-medium gap-3 items-center text-slate-700 hover:text-green-600 hover:bg-green-50 transition-all duration-300 py-3 px-4 rounded-xl group mobile-button touch-manipulation tap-highlight-transparent"
                  onClick={() => setShow(false)}
                >
                  <div className="w-8 h-8 bg-slate-100 group-hover:bg-green-100 rounded-lg flex items-center justify-center transition-colors duration-300">
                    <BsFillInfoSquareFill className="text-lg text-slate-600 group-hover:text-green-600" />
                  </div>
                  <span>About Us</span>
                </Link>
              </li>
            </ul>
          </div>
          {/* Close Button */}
          <button
            onClick={() => setShow(!show)}
            className="absolute top-4 right-4 w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center transition-all duration-300 sm:hidden mobile-button touch-manipulation tap-highlight-transparent"
          >
            <IoMdCloseCircleOutline className="text-2xl text-slate-600" />
          </button>
        </div>

        {/* Footer Section */}
        <div className="relative z-10 border-t border-slate-200 pt-6 mt-auto flex-shrink-0">
          {/* Social Links */}
          <div className="flex gap-3 items-center mb-4">
            <Link
              to="/"
              className="w-10 h-10 bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 mobile-button touch-manipulation tap-highlight-transparent"
            >
              <FaFacebook className="text-lg" />
            </Link>
            <a
              href="https://www.instagram.com/essa00987_8?igsh=MXIwcDIzMnlweGcyOQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-slate-100 hover:bg-pink-100 text-slate-600 hover:text-pink-600 rounded-lg flex items-center justify-center transition-all duration-300 mobile-button touch-manipulation tap-highlight-transparent"
            >
              <RiInstagramFill className="text-lg" />
            </a>
          </div>

          {/* Contact Link */}
          <Link
            to={"/contact"}
            className="text-slate-600 font-medium hover:text-blue-600 transition-all duration-300 block mb-3 mobile-button touch-manipulation tap-highlight-transparent"
            onClick={() => setShow(false)}
          >
            Contact Us
          </Link>

          {/* Copyright */}
          <div className="text-slate-500 text-sm space-y-1">
            <p>&copy; PrimeBid, LLC.</p>
            <p>
              Designed By{" "}
              <Link
                to={"/"}
                className="font-medium text-slate-600 hover:text-blue-600 transition-all duration-300"
                onClick={() => setShow(false)}
              >
                Essa Siddiqui
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
