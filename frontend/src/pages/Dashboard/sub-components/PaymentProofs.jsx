import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPaymentProofs, updatePaymentProofStatus, deletePaymentProof } from '@/store/slices/superAdminSlice';
import Spinner from '@/custom-components/Spinner';
import { toast } from 'react-toastify';

const PaymentProofs = () => {
  const dispatch = useDispatch();
  const { paymentProofs, loading } = useSelector((state) => state.superAdmin);
  const [selectedProof, setSelectedProof] = useState(null);

  useEffect(() => {
    dispatch(getAllPaymentProofs());
  }, [dispatch]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await dispatch(updatePaymentProofStatus({ id, status }));
      toast.success(`Payment proof ${status.toLowerCase()} successfully`);
      dispatch(getAllPaymentProofs()); // Refresh the list
    } catch (error) {
      toast.error(error.message || 'Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment proof?')) {
      try {
        await dispatch(deletePaymentProof(id));
        toast.success('Payment proof deleted successfully');
        dispatch(getAllPaymentProofs()); // Refresh the list
      } catch (error) {
        toast.error(error.message || 'Failed to delete payment proof');
      }
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Payment Proofs</h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-[300px]">
          <Spinner />
        </div>
      ) : (
        <div className="bg-slate-50/50 rounded-xl overflow-hidden border border-slate-200/50">
          {paymentProofs.length > 0 ? (
            <div className="overflow-x-auto max-h-[400px]">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-slate-100/80 sticky top-0 border-b border-slate-200">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-semibold text-slate-700">User</th>
                    <th scope="col" className="px-6 py-4 font-semibold text-slate-700">Amount</th>
                    <th scope="col" className="px-6 py-4 font-semibold text-slate-700">Status</th>
                    <th scope="col" className="px-6 py-4 font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {paymentProofs.map((proof) => (
                    <tr key={proof._id} className="bg-white hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {(proof.userId?.userName || 'U').charAt(0).toUpperCase()}
                          </div>
                          <span className="ml-3 text-slate-700 font-medium">
                            {proof.userId?.userName || 'Unknown'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-slate-900 font-semibold">
                            ₹{proof.amount.toLocaleString()}
                          </span>
                          <a
                            href={proof.proof.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            View Proof →
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            proof.status === 'Approved'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : proof.status === 'Rejected'
                              ? 'bg-red-100 text-red-800 border border-red-200'
                              : proof.status === 'Settled'
                              ? 'bg-blue-100 text-blue-800 border border-blue-200'
                              : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {proof.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {proof.status === 'Pending' && (
                            <>
                              <button
                                onClick={() => handleStatusUpdate(proof._id, 'Approved')}
                                className="inline-flex items-center px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                                title="Approve"
                              >
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Approve
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(proof._id, 'Rejected')}
                                className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                                title="Reject"
                              >
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Reject
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDelete(proof._id)}
                            className="inline-flex items-center px-3 py-1.5 bg-slate-600 text-white text-xs font-medium rounded-lg hover:bg-slate-700 transition-colors shadow-sm"
                            title="Delete"
                          >
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-slate-500 text-lg font-medium">No payment proofs found</p>
              <p className="text-slate-400 text-sm mt-1">Payment proofs will appear here when submitted</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentProofs;