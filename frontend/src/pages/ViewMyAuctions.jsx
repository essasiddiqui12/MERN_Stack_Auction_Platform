import CardTwo from "@/custom-components/CardTwo";
import Spinner from "@/custom-components/Spinner";
import { getMyAuctionItems } from "@/store/slices/auctionSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "../styles/animations.css";

const ViewMyAuctions = () => {
  const { myAuctions, loading } = useSelector((state) => state.auction);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
    dispatch(getMyAuctionItems());
  }, [dispatch, isAuthenticated]);

  // Filter and sort auctions
  const getFilteredAndSortedAuctions = () => {
    let filtered = [...myAuctions];

    // Apply filters
    if (filter === "active") {
      filtered = filtered.filter(auction => new Date(auction.endTime) > new Date());
    } else if (filter === "ended") {
      filtered = filtered.filter(auction => new Date(auction.endTime) <= new Date());
    } else if (filter === "upcoming") {
      filtered = filtered.filter(auction => new Date(auction.startTime) > new Date());
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "ending-soon":
          return new Date(a.endTime) - new Date(b.endTime);
        case "highest-bid":
          return (b.startingBid || 0) - (a.startingBid || 0);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredAuctions = getFilteredAndSortedAuctions();

  const getAuctionStats = () => {
    const total = myAuctions.length;
    const active = myAuctions.filter(auction =>
      new Date(auction.startTime) <= new Date() && new Date(auction.endTime) > new Date()
    ).length;
    const ended = myAuctions.filter(auction => new Date(auction.endTime) <= new Date()).length;
    const upcoming = myAuctions.filter(auction => new Date(auction.startTime) > new Date()).length;

    return { total, active, ended, upcoming };
  };

  const stats = getAuctionStats();

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-y-auto py-8">
      {/* Professional decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-secondary/10 to-success/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Main container */}
      <div className="container mx-auto px-4 md:pl-[320px] max-w-7xl relative z-10">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 animate-fade-in-up">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Title and Description */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">My Auctions</h1>
                  <p className="text-slate-600 text-lg">Manage and track your auction listings</p>
                </div>
              </div>

              {/* Create Auction Button */}
              <Link
                to="/create-auction"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New Auction
              </Link>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
                <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-blue-600 text-sm font-medium">Total Auctions</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
                <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                <div className="text-green-600 text-sm font-medium">Active Now</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-100">
                <div className="text-2xl font-bold text-orange-600">{stats.upcoming}</div>
                <div className="text-orange-600 text-sm font-medium">Upcoming</div>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-4 border border-slate-100">
                <div className="text-2xl font-bold text-slate-600">{stats.ended}</div>
                <div className="text-slate-600 text-sm font-medium">Ended</div>
              </div>
            </div>
          </div>

          {/* Filters and Controls */}
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 animate-fade-in-up" style={{animationDelay: "0.2s"}}>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "all", label: "All Auctions", count: stats.total },
                  { key: "active", label: "Active", count: stats.active },
                  { key: "upcoming", label: "Upcoming", count: stats.upcoming },
                  { key: "ended", label: "Ended", count: stats.ended }
                ].map((filterOption) => (
                  <button
                    key={filterOption.key}
                    onClick={() => setFilter(filterOption.key)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                      filter === filterOption.key
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {filterOption.label}
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      filter === filterOption.key
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}>
                      {filterOption.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-slate-600 text-sm font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="ending-soon">Ending Soon</option>
                  <option value="highest-bid">Highest Starting Bid</option>
                </select>
              </div>
            </div>
          </div>

          {/* Auctions Grid */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 animate-fade-in-up" style={{animationDelay: "0.4s"}}>
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <Spinner />
                  <p className="text-slate-600 mt-4 font-medium">Loading your auctions...</p>
                </div>
              </div>
            ) : (
              <>
                {filteredAuctions.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-slate-900">
                        {filter === "all" ? "All Auctions" :
                         filter === "active" ? "Active Auctions" :
                         filter === "upcoming" ? "Upcoming Auctions" : "Ended Auctions"}
                        <span className="ml-2 text-slate-500 font-normal">({filteredAuctions.length})</span>
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                      {filteredAuctions.map((element, index) => (
                        <div
                          key={element._id}
                          className="transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg animate-fade-in-up"
                          style={{animationDelay: `${0.6 + index * 0.1}s`}}
                        >
                          <CardTwo
                            title={element.title}
                            startingBid={element.startingBid}
                            endTime={element.endTime}
                            startTime={element.startTime}
                            imgSrc={element.image?.url}
                            id={element._id}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-20">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
                      <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      {filter === "all" ? "No Auctions Yet" :
                       filter === "active" ? "No Active Auctions" :
                       filter === "upcoming" ? "No Upcoming Auctions" : "No Ended Auctions"}
                    </h3>
                    <p className="text-slate-600 mb-6 max-w-md mx-auto">
                      {filter === "all"
                        ? "You haven't created any auctions yet. Start by creating your first auction!"
                        : `You don't have any ${filter} auctions at the moment.`
                      }
                    </p>
                    {filter === "all" && (
                      <Link
                        to="/create-auction"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Create Your First Auction
                      </Link>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Quick Actions */}
          {myAuctions.length > 0 && (
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 animate-fade-in-up" style={{animationDelay: "0.6s"}}>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                Quick Actions
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  to="/create-auction"
                  className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-green-700 mb-2">Create Auction</h4>
                  <p className="text-green-600 text-sm">List a new item for auction</p>
                </Link>

                <Link
                  to="/auctions"
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-blue-700 mb-2">Browse Auctions</h4>
                  <p className="text-blue-600 text-sm">Explore other auctions</p>
                </Link>

                <Link
                  to="/dashboard"
                  className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-purple-700 mb-2">Dashboard</h4>
                  <p className="text-purple-600 text-sm">View analytics & insights</p>
                </Link>

                <Link
                  to="/submit-commission"
                  className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-orange-700 mb-2">Submit Commission</h4>
                  <p className="text-orange-600 text-sm">Pay platform commission</p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ViewMyAuctions;
