import Spinner from "@/custom-components/Spinner";
import React from "react";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  const { loading, leaderboard } = useSelector((state) => state.user);
  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full ml-0 m-0 h-fit mobile-padding pt-16 xs:pt-20 lg:pl-[320px] flex flex-col min-h-screen safe-area-inset">
        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <Spinner />
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl my-6 xs:my-8 p-4 xs:p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 text-transparent bg-clip-text mb-4">
                Top Bidders Leaderboard
              </h1>
              <p className="text-slate-700 text-base sm:text-lg max-w-2xl mx-auto">
                Discover our most active bidders and their auction achievements
              </p>
            </div>
            {/* Top 3 Podium */}
            {leaderboard.length >= 3 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-slate-800 text-center mb-8">🏆 Top 3 Champions</h2>
                <div className="flex flex-col md:flex-row items-end justify-center gap-6 mb-8">
                  {/* 2nd Place */}
                  <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-6 shadow-lg border-2 border-slate-300 transform md:-translate-y-4 order-2 md:order-1">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-slate-400 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-white">2</span>
                      </div>
                      <img
                        src={leaderboard[1]?.profileImage?.url}
                        alt={leaderboard[1]?.userName}
                        className="w-20 h-20 object-cover rounded-full mx-auto mb-3 border-4 border-slate-300"
                      />
                      <h3 className="font-bold text-slate-800 text-lg mb-2">{leaderboard[1]?.userName}</h3>
                      <p className="text-slate-600 text-sm mb-1">Rs. {leaderboard[1]?.moneySpent.toLocaleString()}</p>
                      <p className="text-slate-500 text-xs">{leaderboard[1]?.auctionsWon} wins</p>
                    </div>
                  </div>

                  {/* 1st Place */}
                  <div className="bg-gradient-to-br from-amber-100 to-yellow-200 rounded-2xl p-8 shadow-xl border-2 border-amber-400 transform md:-translate-y-8 order-1 md:order-2">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl font-bold text-white">👑</span>
                      </div>
                      <img
                        src={leaderboard[0]?.profileImage?.url}
                        alt={leaderboard[0]?.userName}
                        className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-amber-400"
                      />
                      <h3 className="font-bold text-slate-800 text-xl mb-2">{leaderboard[0]?.userName}</h3>
                      <p className="text-amber-700 text-base font-semibold mb-1">Rs. {leaderboard[0]?.moneySpent.toLocaleString()}</p>
                      <p className="text-amber-600 text-sm">{leaderboard[0]?.auctionsWon} wins</p>
                    </div>
                  </div>

                  {/* 3rd Place */}
                  <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-6 shadow-lg border-2 border-orange-300 transform md:-translate-y-2 order-3">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-white">3</span>
                      </div>
                      <img
                        src={leaderboard[2]?.profileImage?.url}
                        alt={leaderboard[2]?.userName}
                        className="w-20 h-20 object-cover rounded-full mx-auto mb-3 border-4 border-orange-300"
                      />
                      <h3 className="font-bold text-slate-800 text-lg mb-2">{leaderboard[2]?.userName}</h3>
                      <p className="text-orange-700 text-sm mb-1">Rs. {leaderboard[2]?.moneySpent.toLocaleString()}</p>
                      <p className="text-orange-600 text-xs">{leaderboard[2]?.auctionsWon} wins</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Full Leaderboard Table */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Complete Rankings
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="py-4 px-6 text-left text-slate-700 font-semibold">Rank</th>
                      <th className="py-4 px-6 text-left text-slate-700 font-semibold">Bidder</th>
                      <th className="py-4 px-6 text-left text-slate-700 font-semibold">Total Spent</th>
                      <th className="py-4 px-6 text-left text-slate-700 font-semibold">Auctions Won</th>
                      <th className="py-4 px-6 text-left text-slate-700 font-semibold">Success Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {leaderboard.slice(0, 100).map((element, index) => (
                      <tr
                        key={element._id}
                        className={`hover:bg-slate-50 transition-colors duration-200 ${
                          index < 3 ? 'bg-gradient-to-r from-blue-50/50 to-indigo-50/50' : ''
                        }`}
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <span className={`font-bold text-lg flex items-center justify-center w-8 h-8 rounded-full ${
                              index === 0
                                ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-white"
                                : index === 1
                                ? "bg-gradient-to-r from-slate-400 to-slate-500 text-white"
                                : index === 2
                                ? "bg-gradient-to-r from-orange-400 to-orange-500 text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}>
                              {index < 3 ? (index === 0 ? '👑' : index + 1) : index + 1}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <img
                              src={element.profileImage?.url}
                              alt={element.userName}
                              className="w-12 h-12 object-cover rounded-full border-2 border-slate-200"
                            />
                            <div>
                              <p className="font-semibold text-slate-800">{element.userName}</p>
                              <p className="text-slate-500 text-sm">Bidder #{index + 1}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            <span className="font-semibold text-slate-800">
                              Rs. {element.moneySpent.toLocaleString()}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-semibold text-slate-800">
                              {element.auctionsWon}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                                style={{
                                  width: `${Math.min(100, (element.auctionsWon / Math.max(1, element.moneySpent / 1000)) * 100)}%`
                                }}
                              ></div>
                            </div>
                            <span className="text-slate-600 text-sm">
                              {Math.round((element.auctionsWon / Math.max(1, element.moneySpent / 1000)) * 100)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Leaderboard;
