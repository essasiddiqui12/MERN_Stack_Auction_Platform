import Spinner from "@/custom-components/Spinner";
import { fetchUser } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/animations.css";

const UserProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        if (!isAuthenticated) {
          toast.error("Please login to access your profile");
          navigateTo("/login");
          return;
        }

        setError(null);
        const result = await dispatch(fetchUser());
        if (!result.success || !result.user) {
          throw new Error('Failed to load user data');
        }
        setIsInitialLoad(false);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError(error?.response?.data?.message || error.message || "Failed to load profile data");
        
        if (retryCount < 3) {
          const delay = (retryCount + 1) * 1000;
          toast.info(`Retrying in ${delay/1000} seconds...`);
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, delay);
        } else {
          toast.error("Failed to load profile data after multiple attempts. Please try logging in again.");
          navigateTo("/login");
        }
      }
    };

    loadUserData();
  }, [dispatch, isAuthenticated, navigateTo, retryCount]);

  // Show loading spinner during initial load or retries
  if (isInitialLoad || loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
          <Spinner />
          {retryCount > 0 && (
            <div className="mt-4">
              <p className="text-slate-700 font-medium">Retrying... (Attempt {retryCount}/3)</p>
              {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show error state if no user data after retries
  if (!user || Object.keys(user).length === 0) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100 text-center max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Unable to load profile</h2>
          <p className="text-slate-600 mb-6">There was an error loading your profile data.</p>
          <button
            onClick={() => {
              setRetryCount(0);
              setIsInitialLoad(true);
            }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-y-auto py-8">
      {/* Professional decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-secondary/10 to-success/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Main container */}
      <div className="container mx-auto px-4 md:pl-[320px] max-w-6xl relative z-10">
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 animate-fade-in-up">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-blue-200 shadow-xl">
                    <img
                      src={user.profileImage?.url || "/imageHolder.jpg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Role Badge */}
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {user.role}
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                  {user.userName}
                </h1>
                <p className="text-slate-600 text-lg mb-4">
                  Member since {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  {user.role === "Bidder" && (
                    <>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 px-4 py-2 rounded-xl border border-green-200">
                        <div className="text-green-700 font-bold text-lg">{user.auctionsWon || 0}</div>
                        <div className="text-green-600 text-sm">Auctions Won</div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-2 rounded-xl border border-blue-200">
                        <div className="text-blue-700 font-bold text-lg">Rs. {user.moneySpent || 0}</div>
                        <div className="text-blue-600 text-sm">Total Spent</div>
                      </div>
                    </>
                  )}
                  {user.role === "Auctioneer" && (
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 px-4 py-2 rounded-xl border border-orange-200">
                      <div className="text-orange-700 font-bold text-lg">Rs. {user.unpaidCommission || 0}</div>
                      <div className="text-orange-600 text-sm">Unpaid Commission</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Personal Details Section */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 animate-fade-in-up" style={{animationDelay: "0.2s"}}>
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-slate-700 text-sm font-semibold">Email Address</label>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-slate-900 font-medium">{user.email}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-slate-700 text-sm font-semibold">Phone Number</label>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="text-slate-900 font-medium">{user.phone}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-slate-700 text-sm font-semibold">Address</label>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-slate-900 font-medium">{user.address}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-slate-700 text-sm font-semibold">Member Since</label>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-slate-900 font-medium">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details Section */}
          {user.role === "Auctioneer" && user.paymentMethods && (
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 animate-fade-in-up" style={{animationDelay: "0.4s"}}>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                Payment Information
                <span className="ml-3 px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">Auctioneer Only</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-slate-700 text-sm font-semibold">Bank Name</label>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <span className="text-slate-900 font-medium">{user.paymentMethods?.bankTransfer?.bankName || "Not provided"}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-slate-700 text-sm font-semibold">Account Holder Name</label>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span className="text-slate-900 font-medium">{user.paymentMethods?.bankTransfer?.bankAccountName || "Not provided"}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-slate-700 text-sm font-semibold">Bank Account Number</label>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <span className="text-slate-900 font-medium">{user.paymentMethods?.bankTransfer?.bankAccountNumber || "Not provided"}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-slate-700 text-sm font-semibold">Google Pay</label>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-slate-900 font-medium">{user.paymentMethods?.easypaisa?.easypaisaAccountNumber || "Not provided"}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="block text-slate-700 text-sm font-semibold">PayPal Email</label>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-slate-900 font-medium">{user.paymentMethods?.paypal?.paypalEmail || "Not provided"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Statistics Section */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 animate-fade-in-up" style={{animationDelay: "0.6s"}}>
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              {user.role === "Auctioneer" ? "Commission Details" : "Bidding Statistics"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.role === "Auctioneer" && (
                <>
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-700">Rs. {user.unpaidCommission || 0}</div>
                        <div className="text-orange-600 font-medium">Unpaid Commission</div>
                      </div>
                    </div>
                    {user.unpaidCommission > 0 && (
                      <div className="mt-4 p-3 bg-orange-100 rounded-lg">
                        <p className="text-orange-800 text-sm font-medium">
                          💡 You have pending commission payments.
                          <a href="/submit-commission" className="text-orange-600 hover:text-orange-700 underline ml-1">
                            Submit payment proof
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {user.role === "Bidder" && (
                <>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-700">{user.auctionsWon || 0}</div>
                        <div className="text-green-600 font-medium">Auctions Won</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-700">Rs. {user.moneySpent || 0}</div>
                        <div className="text-blue-600 font-medium">Total Spent</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/auctions"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center"
                >
                  Browse Auctions
                </a>
                {user.role === "Auctioneer" && (
                  <a
                    href="/create-auction"
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center"
                  >
                    Create Auction
                  </a>
                )}
                <a
                  href="/contact"
                  className="flex-1 bg-white text-slate-700 border-2 border-slate-200 font-semibold py-3 px-6 rounded-xl hover:border-blue-300 transform hover:scale-105 transition-all duration-300 text-center"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
