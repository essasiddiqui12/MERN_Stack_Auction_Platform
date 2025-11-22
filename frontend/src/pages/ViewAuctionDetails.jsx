import Spinner from "@/custom-components/Spinner";
import { getAuctionDetail } from "@/store/slices/auctionSlice";
import React, { useEffect } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/animations.css";
import { formatCurrency } from "@/utils/formatCurrency";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";

const ViewAuctionDetails = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const formatCurrency = useFormatCurrency();

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated || user.role === "Bidder") {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated]);

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Main content */}
      <div className="relative z-10 w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6">
          <div className="text-[16px] flex flex-wrap gap-2 items-center text-white">
            <Link
              to="/"
              className="font-semibold transition-all duration-300 hover:text-yellow-300"
            >
              Home
            </Link>
            <FaGreaterThan className="text-white/60" />
            <Link
              to="/auctions"
              className="font-semibold transition-all duration-300 hover:text-yellow-300"
            >
              Auctions
            </Link>
            <FaGreaterThan className="text-white/60" />
            <p className="text-white/80">{auctionDetail.title}</p>
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            <div className="flex flex-col gap-6">
              <div className="flex gap-6 flex-col lg:flex-row">
                <div className="bg-white/20 backdrop-blur-md rounded-xl w-full lg:w-80 lg:h-80 flex justify-center items-center p-6 border border-white/20">
                  <img
                    src={auctionDetail.image?.url}
                    alt={auctionDetail.title}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-400 text-transparent bg-clip-text mb-6">
                      {auctionDetail.title}
                    </h1>
                    <div className="space-y-4">
                      <p className="text-xl text-white">
                        Condition:{" "}
                        <span className="font-semibold text-yellow-300">
                          {auctionDetail.condition}
                        </span>
                      </p>
                      <p className="text-xl text-white">
                        Minimum Bid:{" "}
                        <span className="font-semibold text-yellow-300">
                          {formatCurrency(auctionDetail.startingBid)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-400 text-transparent bg-clip-text">
                  Auction Item Description
                </h2>
                <hr className="border-t border-white/20" />
                <ul className="space-y-2">
                  {auctionDetail.description &&
                    auctionDetail.description.split(". ").map((element, index) => (
                      <li key={index} className="text-lg text-white/90">
                        {element}
                      </li>
                    ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-400 text-transparent bg-clip-text">
                  BIDS
                </h2>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 min-h-[200px]">
                  {auctionBidders &&
                  auctionBidders.length > 0 &&
                  new Date(auctionDetail.startTime) < Date.now() &&
                  new Date(auctionDetail.endTime) > Date.now() ? (
                    <div className="space-y-4">
                      {auctionBidders.map((element, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <img
                              src={element.profileImage}
                              alt={element.userName}
                              className="w-12 h-12 rounded-full hidden md:block border-2 border-white/20"
                            />
                            <p className="text-lg font-semibold text-white">
                              {element.userName}
                            </p>
                          </div>
                          <p className="flex-1 text-center text-white">
                            {formatCurrency(element.amount)}
                          </p>
                          <div className="flex-1 text-end">
                            {index === 0 ? (
                              <span className="text-lg font-semibold text-yellow-300">
                                1st
                              </span>
                            ) : index === 1 ? (
                              <span className="text-lg font-semibold text-purple-300">
                                2nd
                              </span>
                            ) : index === 2 ? (
                              <span className="text-lg font-semibold text-pink-300">
                                3rd
                              </span>
                            ) : (
                              <span className="text-lg font-semibold text-white/60">
                                {index + 1}th
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : Date.now() < new Date(auctionDetail.startTime) ? (
                    <div className="flex justify-center items-center h-full">
                      <img
                        src="/notStarted.png"
                        alt="not-started"
                        className="max-h-[400px] rounded-lg opacity-80"
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center h-full">
                      <img
                        src="/auctionEnded.png"
                        alt="ended"
                        className="max-h-[400px] rounded-lg opacity-80"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ViewAuctionDetails;
