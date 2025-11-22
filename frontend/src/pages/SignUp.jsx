import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "@/store/slices/userSlice";
import "../styles/animations.css";
import PhoneInput from "@/components/PhoneInput";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Bidder");
  const [bankName, setBankName] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImage(file);
      setProfileImagePreview(reader.result);
    };
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("profileImage", profileImage);

    if (role === "Auctioneer") {
      formData.append("bankName", bankName);
      formData.append("bankAccountName", bankAccountName);
      formData.append("bankAccountNumber", bankAccountNumber);
      formData.append("paypalEmail", paypalEmail);
    }

    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, loading]);

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
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 animate-fade-in-up">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  userName && email && phone && address && password ?
                  'bg-green-500 text-white' :
                  'bg-blue-600 text-white'
                }`}>
                  {userName && email && phone && address && password ? '✓' : '1'}
                </div>
                <span className="ml-2 text-sm font-medium text-slate-700">Personal Info</span>
              </div>
              <div className={`w-12 h-0.5 transition-all duration-300 ${
                userName && email && phone && address && password ? 'bg-green-500' : 'bg-slate-300'
              }`}></div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  profileImage ?
                  'bg-green-500 text-white' :
                  (userName && email && phone && address && password ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-600')
                }`}>
                  {profileImage ? '✓' : '2'}
                </div>
                <span className="ml-2 text-sm font-medium text-slate-700">Profile Picture</span>
              </div>
              <div className={`w-12 h-0.5 transition-all duration-300 ${
                profileImage ? 'bg-green-500' : 'bg-slate-300'
              }`}></div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  profileImage && userName && email && phone && address && password ?
                  'bg-blue-600 text-white' :
                  'bg-slate-300 text-slate-600'
                }`}>3</div>
                <span className={`ml-2 text-sm font-medium ${
                  profileImage && userName && email && phone && address && password ?
                  'text-slate-700' :
                  'text-slate-500'
                }`}>Complete</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Create Account</h1>
            <p className="text-slate-600 text-lg">Join PrimeBid and start your auction journey</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Personal Details Section */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-foreground text-sm font-semibold mb-2">Username</label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="professional-input mobile-input"
                      placeholder="Enter your username"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-foreground text-sm font-semibold mb-2">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="professional-input"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-foreground text-sm font-semibold mb-2">Phone Number</label>
                    <PhoneInput
                      value={phone}
                      onChange={setPhone}
                      className="professional-input border-input focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-foreground text-sm font-semibold mb-2">Address</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="professional-input"
                      placeholder="Enter your address"
                      rows="3"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-foreground text-sm font-semibold mb-2">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="professional-input"
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-foreground text-sm font-semibold mb-2">Account Type</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="professional-input"
                      required
                    >
                      <option value="Bidder">Bidder - Participate in auctions</option>
                      <option value="Auctioneer">Auctioneer - Create and manage auctions</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Image Section */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                Profile Picture
              </h3>

              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-blue-300 rounded-2xl cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 hover:border-blue-400 group">
                  <div className="flex flex-col items-center justify-center py-6">
                    {profileImagePreview ? (
                      <div className="relative">
                        <img
                          src={profileImagePreview}
                          alt="Profile Preview"
                          className="w-24 h-24 object-cover rounded-full professional-shadow"
                        />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center professional-shadow">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <p className="mb-2 text-sm text-slate-700 font-medium">
                          <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-slate-500">PNG, JPG or GIF (MAX. 5MB)</p>
                        <p className="text-xs text-slate-400 mt-1">Recommended: 400x400px</p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    onChange={imageHandler}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            {/* Payment Details (Only for Auctioneers) */}
            {role === "Auctioneer" && (
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg animate-fade-in-up">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  Payment Information
                  <span className="ml-2 px-2 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">Auctioneer Only</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-foreground text-sm font-semibold mb-2">Bank Name</label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="professional-input"
                      placeholder="Enter bank name"
                    />
                  </div>

                  <div>
                    <label className="block text-foreground text-sm font-semibold mb-2">Account Holder Name</label>
                    <input
                      type="text"
                      value={bankAccountName}
                      onChange={(e) => setBankAccountName(e.target.value)}
                      className="professional-input"
                      placeholder="Enter account holder name"
                    />
                  </div>

                  <div>
                    <label className="block text-foreground text-sm font-semibold mb-2">Account Number</label>
                    <input
                      type="text"
                      value={bankAccountNumber}
                      onChange={(e) => setBankAccountNumber(e.target.value)}
                      className="professional-input"
                      placeholder="Enter account number"
                    />
                  </div>

                  <div>
                    <label className="block text-foreground text-sm font-semibold mb-2">PayPal Email</label>
                    <input
                      type="email"
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      className="professional-input"
                      placeholder="Enter PayPal email"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                className="w-full professional-button-primary py-4 text-lg font-semibold rounded-2xl gradient-primary hover-lift professional-shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Your Account...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Create Account
                  </span>
                )}
              </button>

              <div className="mt-8 text-center">
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200">
                  <span className="text-slate-600">Already have an account?</span>
                  <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors hover:underline">
                    Sign in here
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
