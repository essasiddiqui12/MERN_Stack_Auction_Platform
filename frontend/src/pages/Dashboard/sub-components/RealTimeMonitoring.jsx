import React, { useEffect } from 'react';
import { FiUsers, FiDollarSign, FiClock, FiActivity } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getRealTimeData } from '@/store/slices/superAdminSlice';
import Spinner from '@/custom-components/Spinner';

const RealTimeMonitoring = () => {
  const dispatch = useDispatch();
  const { 
    activeUsers, 
    liveAuctions, 
    recentActivities,
    realTimeLoading 
  } = useSelector((state) => state.superAdmin);

  useEffect(() => {
    // Initial fetch
    dispatch(getRealTimeData());

    // Set up polling interval
    const interval = setInterval(() => {
      dispatch(getRealTimeData());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [dispatch]);

  const getActivityIcon = (type) => {
    switch(type) {
      case 'bid':
        return <FiDollarSign className="text-green-400" />;
      case 'auction_end':
        return <FiClock className="text-red-400" />;
      case 'user_action':
        return <FiUsers className="text-blue-400" />;
      case 'payment':
        return <FiActivity className="text-purple-400" />;
      default:
        return <FiActivity className="text-gray-400" />;
    }
  };

  if (realTimeLoading && !activeUsers && !liveAuctions.length) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
          <FiActivity className="text-white text-xl" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Real-Time Monitoring</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200/50 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-blue-700 font-semibold">Active Users</h4>
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FiUsers className="text-white text-lg" />
            </div>
          </div>
          <p className="text-3xl font-bold text-blue-900">{activeUsers}</p>
          <p className="text-blue-600 text-sm mt-1">Currently online</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200/50 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-emerald-700 font-semibold">Live Auctions</h4>
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <FiClock className="text-white text-lg" />
            </div>
          </div>
          <p className="text-3xl font-bold text-emerald-900">{liveAuctions.length}</p>
          <p className="text-emerald-600 text-sm mt-1">Active right now</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200/50 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-purple-700 font-semibold">Top Active Auction</h4>
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <FiActivity className="text-white text-lg" />
            </div>
          </div>
          {liveAuctions[0] ? (
            <div>
              <p className="text-sm text-slate-700 font-medium truncate mb-1">
                {liveAuctions[0].title}
              </p>
              <p className="text-2xl font-bold text-purple-900">
                ₹{liveAuctions[0].currentBid?.toLocaleString() || 0}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-2xl font-bold text-purple-900">0</p>
              <p className="text-purple-600 text-sm mt-1">No active auctions</p>
            </div>
          )}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-slate-50/50 rounded-xl border border-slate-200/50 overflow-hidden">
        <div className="bg-slate-100/80 px-6 py-4 border-b border-slate-200/50">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FiActivity className="text-white text-sm" />
            </div>
            Live Activity Feed
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-3 max-h-[280px] overflow-y-auto custom-scrollbar">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div
                  key={activity._id}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl hover:bg-slate-50 transition-colors border border-slate-100 shadow-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-700 text-sm font-medium leading-relaxed">
                      {activity.message}
                    </p>
                    <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiActivity className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500 text-lg font-medium">No recent activities</p>
                <p className="text-slate-400 text-sm mt-1">Activity feed will update in real-time</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitoring; 