import Spinner from "@/custom-components/Spinner";
import { getAuctionDetail } from "@/store/slices/auctionSlice";
import { placeBid } from "@/store/slices/bidSlice";
import React, { useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import { FiClock } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";
import Confetti from 'react-confetti';

const AuctionItem = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const formatCurrency = useFormatCurrency();

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWinnerCelebration, setShowWinnerCelebration] = useState(false);
  const [highestBidder, setHighestBidder] = useState(null);
  const [highestBidAmount, setHighestBidAmount] = useState(0);

  const handleBid = () => {
    const formData = new FormData();
    formData.append("amount", amount);
    dispatch(placeBid(id, formData));
    dispatch(getAuctionDetail(id));
  };

  // Initial data fetch and authentication check
  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/login");
      return;
    }
    
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [id, isAuthenticated, dispatch, navigateTo]);

  // Set initial bid amount based on highest bid or starting bid
  useEffect(() => {
    if (auctionBidders && auctionBidders.length > 0) {
      setAmount(auctionBidders[0].amount + 10);
    } else if (auctionDetail && auctionDetail.startingBid) {
      setAmount(auctionDetail.startingBid);
    }
  }, [auctionBidders, auctionDetail]);

  // Update countdown timer
  useEffect(() => {
    if (!auctionDetail?.startTime || !auctionDetail?.endTime) {
      return;
    }

    const startTime = new Date(auctionDetail.startTime).getTime();
    const endTime = new Date(auctionDetail.endTime).getTime();
    
    const updateTimer = () => {
      const now = Date.now();
      
      if (now < startTime) {
        setIsStarted(false);
        setIsEnded(false);
        const timeRemaining = startTime - now;
        setTimeLeft(formatTimeLeft(timeRemaining));
      } else if (now > endTime) {
        setIsStarted(true);
        setIsEnded(true);
        setTimeLeft("Auction has ended");
      } else {
        setIsStarted(true);
        setIsEnded(false);
        const timeRemaining = endTime - now;
        setTimeLeft(formatTimeLeft(timeRemaining));
      }
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, [auctionDetail]);

  useEffect(() => {
    if (isEnded && auctionBidders && auctionBidders.length > 0) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 10000); // Stop confetti after 10 seconds
      return () => clearTimeout(timer);
    }
  }, [isEnded, auctionBidders]);

  const formatTimeLeft = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;
    
    return `(${days} Days) ${remainingHours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!auctionDetail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Auction Not Found</h2>
          <Link to="/auctions" className="text-indigo-400 hover:text-indigo-300">
            Return to Auctions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      {showConfetti && <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={500}
        gravity={0.3}
      />}

      {/* Professional decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-secondary/10 to-success/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full ml-0 m-0 h-fit mobile-padding pt-16 xs:pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 safe-area-inset">
        {/* Professional Status Bar */}
        <div className="w-full bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 xs:p-6 mb-8 animate-fade-in-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                isEnded ? 'bg-gradient-to-br from-red-500 to-red-600' :
                isStarted ? 'bg-gradient-to-br from-green-500 to-emerald-600' :
                'bg-gradient-to-br from-orange-500 to-amber-600'
              }`}>
                <FiClock className="w-6 h-6 text-white" />
              </div>
              <div>
                {timeLeft && isStarted && !isEnded && (
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Auction Ends In</p>
                    <p className="text-xl font-bold text-slate-900">{timeLeft}</p>
                  </div>
                )}
                {timeLeft && !isStarted && (
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Auction Starts In</p>
                    <p className="text-xl font-bold text-slate-900">{timeLeft}</p>
                  </div>
                )}
                {timeLeft && isEnded && (
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Auction Status</p>
                    <p className="text-lg font-bold text-red-600">
                      {auctionBidders && auctionBidders.length > 0 ?
                        `Ended - Winner: ${auctionBidders[0].userName}` :
                        "Ended - No Winner"
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Live indicator */}
            {isStarted && !isEnded && (
              <div className="flex items-center space-x-2 bg-red-50 px-3 py-2 rounded-full border border-red-200">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-700 font-semibold text-sm">LIVE AUCTION</span>
              </div>
            )}

            {/* Winner celebration */}
            {isEnded && auctionBidders && auctionBidders.length > 0 && (
              <div className="text-right">
                <p className="text-sm text-slate-500">Winning Bid</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {formatCurrency(auctionBidders[0].amount)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Professional Breadcrumb */}
        <div className="flex flex-wrap items-center mb-8 text-sm bg-white rounded-xl py-3 px-4 shadow-lg border border-slate-100 animate-fade-in-up" style={{animationDelay: "0.1s"}}>
          <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300">
            Home
          </Link>
          <FaGreaterThan className="mx-3 text-xs text-slate-400" />
          <Link to="/auctions" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300">
            Auctions
          </Link>
          <FaGreaterThan className="mx-3 text-xs text-slate-400" />
          <span className="text-slate-600 font-medium truncate max-w-xs">{auctionDetail.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Item Image */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 animate-fade-in-up" style={{animationDelay: "0.2s"}}>
              <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl overflow-hidden shadow-inner">
                <img
                  src={auctionDetail.image?.url}
                  alt={auctionDetail.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Middle Column - Item Details */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 xs:p-8 shadow-2xl border border-slate-100 animate-fade-in-up" style={{animationDelay: "0.3s"}}>
              <h1 className="text-2xl xs:text-3xl font-bold mb-6 text-slate-900 leading-tight">{auctionDetail.title}</h1>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Condition</span>
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl text-sm font-semibold border border-blue-200">
                    {auctionDetail.condition}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Starting Bid</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {formatCurrency(auctionDetail.startingBid)}
                  </span>
                </div>

                {highestBidAmount > 0 && (
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                    <span className="text-blue-700 font-semibold">Current Highest Bid</span>
                    <span className="text-2xl font-bold text-blue-700">
                      {formatCurrency(highestBidAmount)}
                    </span>
                  </div>
                )}

                <div className="border-t border-slate-200 pt-6 mt-6">
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Start Time</span>
                      <span className="text-slate-700">{new Date(auctionDetail.startTime).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">End Time</span>
                      <span className="text-slate-700">{new Date(auctionDetail.endTime).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 xs:p-8 shadow-2xl border border-slate-100 animate-fade-in-up" style={{animationDelay: "0.4s"}}>
              <h3 className="text-xl font-bold mb-4 text-slate-900 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Description
              </h3>
              <p className="text-slate-600 leading-relaxed">{auctionDetail.description}</p>
            </div>
          </div>

          {/* Right Column - Bidding Interface */}
          <div className="lg:col-span-1 space-y-6">
            {isEnded ? (
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 animate-fade-in-up" style={{animationDelay: "0.5s"}}>
                {auctionBidders && auctionBidders.length > 0 ? (
                  <div className="text-center py-8">
                    <div className="mb-6">
                      <div className="inline-block p-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg">
                        <div className="bg-white p-1 rounded-full">
                          <img
                            src={auctionBidders[0].profileImage}
                            alt={auctionBidders[0].userName}
                            className="w-24 h-24 rounded-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-2">🎉 Auction Winner! 🎉</h3>
                    <p className="text-xl text-blue-600 font-semibold mb-4">{auctionBidders[0].userName}</p>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                      <p className="text-sm text-green-600 font-medium mb-1">Winning Bid</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {formatCurrency(auctionBidders[0].amount)}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <RiAuctionFill className="text-2xl text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No Bids Placed</h3>
                    <p className="text-slate-600">This auction ended without any bids</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
                <h3 className="text-xl font-semibold mb-4 text-white">Current Bids</h3>
                {auctionBidders && auctionBidders.length > 0 ? (
                  <div className="space-y-4">
                    {auctionBidders.map((bidder, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img
                            src={bidder.profileImage}
                            alt={bidder.userName}
                            className="w-10 h-10 rounded-full"
                          />
                          <span className="text-gray-300">{bidder.userName}</span>
                        </div>
                        <span className="text-indigo-400 font-semibold">
                          {formatCurrency(bidder.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center">No bids yet. Be the first to bid!</p>
                )}
                
                {!isEnded && isStarted && (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="flex-1 bg-slate-900/30 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        placeholder="Enter bid amount"
                      />
                      <button
                        onClick={handleBid}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
                      >
                        Place Bid
                      </button>
                    </div>
                    <p className="text-sm text-gray-400">
                      Minimum bid increment: 10
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      </section>

      {/* Winner Celebration Modal */}
      {showWinnerCelebration && highestBidder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {showConfetti && <Confetti />}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full mx-4 animate-fade-in">
            <div className="text-center">
              <div className="mb-6 animate-bounce-slow">
                <img
                  src={highestBidder.avatar?.url || "/default-avatar.png"}
                  alt={highestBidder.username}
                  className="w-24 h-24 rounded-full mx-auto border-4 border-yellow-400"
                />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-yellow-400 animate-slide-up">
                🎉 Congratulations! 🎉
              </h2>
              <p className="text-xl mb-2 text-gray-700 dark:text-gray-300 animate-fade-in-up">
                {highestBidder.username} won the auction!
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Winning Bid: ₹{highestBidAmount}
              </p>
              <button
                onClick={() => setShowWinnerCelebration(false)}
                className="mt-6 px-6 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors animate-fade-in-up"
                style={{ animationDelay: '0.4s' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionItem;
