import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import { useSelector } from "react-redux";
import { useFormatCurrency } from "../hooks/useFormatCurrency";

const Card = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const { user } = useSelector((state) => state.user);
  const formatCurrency = useFormatCurrency();

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

  return (
    <div className="group bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-blue-200 mobile-card touch-manipulation tap-highlight-transparent">
      <Link to={`/auction/${id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={imgSrc}
            alt={title}
            className="w-full h-40 xs:h-44 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Time badge */}
          {Object.keys(timeLeft).length > 0 && (
            <div className="absolute bottom-3 left-3 right-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs xs:text-sm font-semibold py-2 px-3 rounded-xl backdrop-blur-sm shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {timeLeft.type}
                  </span>
                  <span className="font-mono">{formatTimeLeft(timeLeft)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Live indicator for active auctions */}
          {timeLeft.type === "Ends In:" && (
            <div className="absolute top-3 right-3">
              <div className="flex items-center space-x-1 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span>LIVE</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 xs:p-5">
          <h3 className="text-base xs:text-lg font-bold text-slate-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 mb-1">Starting Bid</p>
              <p className="text-lg xs:text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {formatCurrency(startingBid)}
              </p>
            </div>

            <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
              <span className="text-sm font-semibold mr-1">View</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
