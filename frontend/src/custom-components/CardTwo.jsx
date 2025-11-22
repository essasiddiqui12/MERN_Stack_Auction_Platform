import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { deleteAuction, republishAuction } from "@/store/slices/auctionSlice";

const CardTwo = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDifference = new Date(startTime) - now;
    const endDifference = new Date(endTime) - now;
    let timeLeft = {};

    if (startDifference > 0) {
      timeLeft = {
        type: "Starts In:",
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60),
      };
    } else if (endDifference > 0) {
      timeLeft = {
        type: "Ends In:",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    });
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `(${days} Days) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const dispatch = useDispatch();
  const handleDeleteAuction = () => {
    dispatch(deleteAuction(id));
  };

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <div className="basis-full bg-white rounded-lg border border-gray-200 p-4 group sm:basis-72 lg:basis-80 2xl:basis-96">
        {/* Image Container */}
        <div className="w-full h-48 mb-4 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
          <img
            src={imgSrc}
            alt={title}
            className="w-full h-full object-contain p-2"
          />
        </div>

        {/* Content Container */}
        <div className="space-y-3">
          {/* Title */}
          <h5 className="text-xl font-semibold text-gray-800 group-hover:text-[#d6482b] transition-colors">
            {title}
          </h5>

          {/* Bid Info */}
          {startingBid && (
            <p className="text-gray-600">
              Starting Bid:{" "}
              <span className="text-[#d6482b] font-semibold">
                Rs. {startingBid}
              </span>
            </p>
          )}

          {/* Time Info */}
          <p className="text-gray-600">
            {timeLeft.type}{" "}
            {Object.keys(timeLeft).length > 1 ? (
              <span className="text-[#d6482b] font-semibold">
                {formatTimeLeft(timeLeft)}
              </span>
            ) : (
              <span className="text-[#d6482b] font-semibold">Time's up!</span>
            )}
          </p>

          {/* Action Buttons */}
          <div className="pt-4 space-y-3">
            <Link
              to={`/auction/${id}`}
              className="block w-full py-2.5 bg-[#d6482b] text-white text-center font-semibold rounded-md hover:bg-[#b33d24] transition-colors"
            >
              View Auction
            </Link>
            
            <button
              onClick={handleDeleteAuction}
              className="block w-full py-2.5 bg-red-500 text-white text-center font-semibold rounded-md hover:bg-red-600 transition-colors"
            >
              Delete Auction
            </button>
            
            <button
              onClick={() => setOpenDrawer(true)}
              disabled={new Date(endTime) > Date.now()}
              className="block w-full py-2.5 bg-blue-500 text-white text-center font-semibold rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Republish Auction
            </button>
          </div>
        </div>
      </div>
      <Drawer id={id} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </>
  );
};

export default CardTwo;

const Drawer = ({ setOpenDrawer, openDrawer, id }) => {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const {loading} = useSelector(state => state.auction);

  const handleRepbulishAuction = () => {
    const formData = new FormData();
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(republishAuction(id, formData));
  };

  // Close drawer when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setOpenDrawer(false);
    }
  };

  if (!openDrawer || !id) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-end justify-center transition-all duration-300"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white w-full max-w-2xl mx-4 mb-4 rounded-t-3xl shadow-2xl transform transition-all duration-300 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Republish Auction
              </h3>
              <p className="text-slate-600">
                Set new start and end times for your auction
              </p>
            </div>
            <button
              onClick={() => setOpenDrawer(false)}
              className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form className="space-y-6">
            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-2">
                New Start Time
              </label>
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholderText="Select start date and time"
              />
            </div>

            <div>
              <label className="block text-slate-700 text-sm font-semibold mb-2">
                New End Time
              </label>
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholderText="Select end date and time"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={handleRepbulishAuction}
                disabled={loading || !startTime || !endTime}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Republishing...
                  </span>
                ) : (
                  "Republish Auction"
                )}
              </button>

              <button
                type="button"
                onClick={() => setOpenDrawer(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
