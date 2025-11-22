import { postCommissionProof } from "@/store/slices/commissionSlice";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/animations.css";
import { fetchUser } from "@/store/slices/userSlice";

const SubmitCommission = () => {
  const [proof, setProof] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [proofPreview, setProofPreview] = useState("");

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.commission);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUser());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    // Set the amount field to the unpaid commission amount by default
    if (user && user.unpaidCommission) {
      setAmount(user.unpaidCommission.toString());
    }
  }, [user]);

  const proofHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProof(file);
      setProofPreview(reader.result);
    };
  };
  
  const handlePaymentProof = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("proof", proof);
    formData.append("amount", amount);
    formData.append("comment", comment);
    dispatch(postCommissionProof(formData));
  };

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
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl my-6 xs:my-8 p-4 xs:p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 text-transparent bg-clip-text mb-4">
              Submit Commission Payment
            </h1>
            <p className="text-slate-700 text-base sm:text-lg max-w-2xl mx-auto">
              Upload proof of your commission payment to clear your balance
            </p>
          </div>

          {/* Commission Balance Alert */}
          {user && user.unpaidCommission > 0 && (
            <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    Outstanding Commission Balance
                  </h3>
                  <p className="text-2xl font-bold text-amber-600 mb-2">
                    Rs. {user.unpaidCommission.toLocaleString()}
                  </p>
                  <p className="text-slate-600">
                    Please submit payment proof to clear your commission balance and continue creating auctions.
                  </p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-8" onSubmit={handlePaymentProof}>
            {/* Payment Details Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Payment Information</h3>
                  <p className="text-slate-600 text-sm">Enter the amount you're paying</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-slate-700 text-sm font-semibold mb-2">
                    Payment Amount (Rs.) *
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter commission amount"
                    min="1"
                    step="0.01"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
                    required
                  />
                  {user && user.unpaidCommission > 0 && Number(amount) !== user.unpaidCommission && (
                    <div className="flex items-start gap-2 mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-amber-700 text-sm">
                        Your unpaid commission is Rs. {user.unpaidCommission.toLocaleString()}. Consider paying the full amount to clear your balance.
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-slate-700 text-sm font-semibold mb-2">
                    Payment Details/Comments *
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    placeholder="Provide details about your payment (transaction ID, payment method, date, etc.)"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white resize-none"
                    required
                  />
                  <p className="text-slate-500 text-xs mt-1">
                    Include transaction details to help us verify your payment quickly
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Proof Upload Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Payment Proof</h3>
                  <p className="text-slate-600 text-sm">Upload screenshot or receipt of your payment</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all duration-300 group"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {proofPreview ? (
                        <div className="relative">
                          <img
                            src={proofPreview}
                            alt="Payment Proof Preview"
                            className="w-48 h-32 object-cover rounded-lg shadow-md"
                          />
                          <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <p className="text-white text-sm font-medium">Click to change image</p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <svg
                            className="w-12 h-12 mb-4 text-slate-400 group-hover:text-slate-500 transition-colors duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-slate-500">
                            PNG, JPG, JPEG or WEBP (Max 5MB)
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            Screenshot of payment confirmation recommended
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={proofHandler}
                      accept="image/png,image/jpg,image/jpeg,image/webp"
                      required
                    />
                  </label>
                </div>
                <p className="text-slate-500 text-xs">
                  Upload a clear screenshot of your payment confirmation, bank transfer receipt, or transaction details.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-slate-200">
              <button
                type="submit"
                disabled={loading || !amount || !comment || !proof}
                className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting Proof...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Submit Payment Proof
                  </span>
                )}
              </button>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="text-blue-800 font-semibold text-sm mb-1">Important Note</h4>
                    <p className="text-blue-700 text-sm">
                      Your payment proof will be reviewed by our admin team. Once approved, your commission balance will be updated and you can continue creating auctions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SubmitCommission;
