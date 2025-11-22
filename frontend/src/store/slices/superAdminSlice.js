import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllAuctionItems } from "./auctionSlice";
import { API_BASE_URL } from "../../config";

const superAdminSlice = createSlice({
  name: "superAdmin",
  initialState: {
    revenueLoading: false,
    usersLoading: false,
    deleteLoading: false,
    paymentProofsLoading: false,
    realTimeLoading: false,
    monthlyRevenue: [],
    totalAuctioneers: [],
    totalBidders: [],
    paymentProofs: [],
    activeUsers: 0,
    liveAuctions: [],
    recentActivities: [],
    error: null
  },
  reducers: {
    requestForMonthlyRevenue(state) {
      state.revenueLoading = true;
      state.error = null;
    },
    successForMonthlyRevenue(state, action) {
      state.revenueLoading = false;
      state.monthlyRevenue = action.payload;
      state.error = null;
    },
    failedForMonthlyRevenue(state, action) {
      state.revenueLoading = false;
      state.error = action.payload;
    },
    requestForAllUsers(state) {
      state.usersLoading = true;
      state.error = null;
    },
    successForAllUsers(state, action) {
      state.usersLoading = false;
      state.totalAuctioneers = action.payload.auctioneersArray;
      state.totalBidders = action.payload.biddersArray;
      state.error = null;
    },
    failureForAllUsers(state, action) {
      state.usersLoading = false;
      state.error = action.payload;
    },
    requestDeleteAuctionItem(state) {
      state.deleteLoading = true;
      state.error = null;
    },
    successDeleteAuctionItem(state) {
      state.deleteLoading = false;
      state.error = null;
    },
    failureDeleteAuctionItem(state, action) {
      state.deleteLoading = false;
      state.error = action.payload;
    },
    requestPaymentProofs(state) {
      state.paymentProofsLoading = true;
      state.error = null;
    },
    successPaymentProofs(state, action) {
      state.paymentProofsLoading = false;
      state.paymentProofs = action.payload;
      state.error = null;
    },
    failurePaymentProofs(state, action) {
      state.paymentProofsLoading = false;
      state.error = action.payload;
    },
    requestRealTimeData(state) {
      state.realTimeLoading = true;
      state.error = null;
    },
    successRealTimeData(state, action) {
      state.realTimeLoading = false;
      state.activeUsers = action.payload.activeUsers;
      state.liveAuctions = action.payload.liveAuctions;
      state.recentActivities = action.payload.recentActivities;
      state.error = null;
    },
    failureRealTimeData(state, action) {
      state.realTimeLoading = false;
      state.error = action.payload;
    },
    clearAllErrors(state) {
      state.error = null;
    }
  }
});

export const getMonthlyRevenue = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForMonthlyRevenue());
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/superadmin/monthlyincome`,
      { withCredentials: true }
    );
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch monthly revenue");
    }
    dispatch(
      superAdminSlice.actions.successForMonthlyRevenue(
        response.data.totalMonthlyRevenue
      )
    );
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(superAdminSlice.actions.failedForMonthlyRevenue(errorMessage));
    console.error("Error fetching monthly revenue:", error);
  }
};

export const getAllUsers = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestForAllUsers());
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/superadmin/users/getall`,
      { withCredentials: true }
    );
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch users");
    }
    dispatch(superAdminSlice.actions.successForAllUsers(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(superAdminSlice.actions.failureForAllUsers(errorMessage));
    console.error("Error fetching users:", error);
  }
};

export const deleteAuctionItem = (id) => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestDeleteAuctionItem());
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/v1/superadmin/auction/delete/${id}`,
      { withCredentials: true }
    );
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to delete auction");
    }
    dispatch(superAdminSlice.actions.successDeleteAuctionItem());
    dispatch(getAllAuctionItems()); // Refresh the auctions list
    toast.success("Auction deleted successfully");
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(superAdminSlice.actions.failureDeleteAuctionItem(errorMessage));
    toast.error(errorMessage);
    console.error("Error deleting auction:", error);
  }
};

export const getAllPaymentProofs = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestPaymentProofs());
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/superadmin/paymentproofs/getall`,
      { withCredentials: true }
    );
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch payment proofs");
    }
    dispatch(superAdminSlice.actions.successPaymentProofs(response.data.paymentProofs));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(superAdminSlice.actions.failurePaymentProofs(errorMessage));
    console.error("Error fetching payment proofs:", error);
  }
};

export const updatePaymentProofStatus = ({ id, status }) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/v1/superadmin/paymentproof/status/update/${id}`,
      { status },
      { withCredentials: true }
    );
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to update payment proof status");
    }
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error("Error updating payment proof status:", error);
    throw new Error(errorMessage);
  }
};

export const deletePaymentProof = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/v1/superadmin/paymentproof/delete/${id}`,
      { withCredentials: true }
    );
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to delete payment proof");
    }
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error("Error deleting payment proof:", error);
    throw new Error(errorMessage);
  }
};

export const getRealTimeData = () => async (dispatch) => {
  dispatch(superAdminSlice.actions.requestRealTimeData());
  try {
    // Get active auctions
    const auctionsResponse = await axios.get(
      `${API_BASE_URL}/api/v1/auctionitem/active`,
      { withCredentials: true }
    );

    // Get recent activities (bids, new users, payments)
    const activitiesResponse = await axios.get(
      `${API_BASE_URL}/api/v1/superadmin/recent-activities`,
      { withCredentials: true }
    );

    // Get active users count
    const usersResponse = await axios.get(
      `${API_BASE_URL}/api/v1/superadmin/active-users`,
      { withCredentials: true }
    );

    dispatch(superAdminSlice.actions.successRealTimeData({
      activeUsers: usersResponse.data.activeUsers,
      liveAuctions: auctionsResponse.data.auctions,
      recentActivities: activitiesResponse.data.activities
    }));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(superAdminSlice.actions.failureRealTimeData(errorMessage));
    console.error("Error fetching real-time data:", error);
  }
};

export const clearAllSuperAdminSliceErrors = () => (dispatch) => {
  dispatch(superAdminSlice.actions.clearAllErrors());
};

export default superAdminSlice.reducer;
