import React from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const WinnerCelebration = ({ isOpen, onClose, auctionTitle }) => {
  const { width, height } = useWindowSize();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <Confetti
        width={width}
        height={height}
        numberOfPieces={200}
        recycle={false}
        colors={['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']}
      />
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-lg shadow-2xl max-w-md w-full mx-4 border border-gray-700">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">
            🎉 Congratulations! 🎉
          </h2>
          <p className="text-xl text-gray-200 mb-6">
            You've won the auction for:
          </p>
          <p className="text-2xl font-semibold text-white mb-8">
            {auctionTitle}
          </p>
          <div className="space-y-4">
            <p className="text-gray-300">
              The seller will be notified, and you'll receive further instructions for completing the transaction.
            </p>
            <button
              onClick={onClose}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerCelebration; 