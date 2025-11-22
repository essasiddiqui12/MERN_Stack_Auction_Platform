import Card from "@/custom-components/Card";
import Spinner from "@/custom-components/Spinner";
import React from "react";
import { useSelector } from "react-redux";
import "../styles/animations.css";

const Auctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);
  return (
    <section className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      {/* Professional decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-secondary/10 to-success/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full ml-0 m-0 h-fit mobile-padding pt-16 xs:pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 safe-area-inset">
        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <Spinner />
          </div>
        ) : (
          <>
            {/* Header Section */}
            <div className="bg-white rounded-3xl p-8 xs:p-10 sm:p-12 mb-8 shadow-2xl border border-slate-100 animate-fade-in-up">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-4xl xs:text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                      Live Auctions
                    </h1>
                    <p className="text-slate-600 text-lg mt-2">
                      Discover amazing items and place your bids
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="hidden md:flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{allAuctions.length}</div>
                    <div className="text-sm text-slate-500">Active Auctions</div>
                  </div>
                  <div className="w-px h-12 bg-slate-200"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">Live</div>
                    <div className="text-sm text-slate-500">Bidding Now</div>
                  </div>
                </div>
              </div>

              {/* Quick Stats for Mobile */}
              <div className="md:hidden flex justify-center space-x-8 mb-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">{allAuctions.length}</div>
                  <div className="text-xs text-slate-500">Active</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600">Live</div>
                  <div className="text-xs text-slate-500">Bidding</div>
                </div>
              </div>
            </div>

            {/* Auctions Grid */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 animate-fade-in-up" style={{animationDelay: "0.2s"}}>
              {allAuctions.length > 0 ? (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                  {allAuctions.map((element, index) => (
                    <div
                      key={element._id}
                      className="transform hover:scale-[1.02] transition-all duration-300 animate-fade-in-up"
                      style={{animationDelay: `${0.1 * index}s`}}
                    >
                      <Card
                        title={element.title}
                        startTime={element.startTime}
                        endTime={element.endTime}
                        imgSrc={element.image?.url}
                        startingBid={element.startingBid}
                        id={element._id}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">No Auctions Available</h3>
                  <p className="text-slate-600 mb-6">Check back later for new auction listings</p>
                  <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                    Refresh Page
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Auctions;
