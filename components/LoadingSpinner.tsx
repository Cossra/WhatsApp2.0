// InlineSpinner: compact spinner for inline loading (e.g., adding user to chat)
interface InlineSpinnerProps {
  size?: string; // e.g. '1.25rem', '2rem', etc.
}

export function InlineSpinner({ size = '1.25rem' }: InlineSpinnerProps) {
  return (
    <span
      className="inline-block animate-spin rounded-full border-2 border-t-2 border-gradient-to-r from-pink-500 via-purple-500 to-blue-500 border-t-transparent align-middle"
      style={{ width: size, height: size, minWidth: '1rem', minHeight: '1rem' }}
    />
  );
}

import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

function LoadingSpinner({ message, className }: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center w-full h-full ${className ?? ''}`}>
      <span
        className="inline-block animate-spin rounded-full border-4 border-t-4 border-gradient-to-r from-pink-500 via-purple-500 to-blue-500 border-t-transparent shadow-lg"
        style={{
          width: '3rem',
          height: '3rem',
          minWidth: '2.5rem',
          minHeight: '2.5rem',
        }}
      />
      {message && (
        <span className="mt-4 text-lg font-medium text-purple-700 text-center drop-shadow-sm">{message}</span>
      )}
      <style jsx>{`
        @media (max-width: 640px) {
          span {
            width: 2rem !important;
            height: 2rem !important;
          }
        }
        @media (min-width: 1024px) {
          span {
            width: 4rem !important;
            height: 4rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default LoadingSpinner