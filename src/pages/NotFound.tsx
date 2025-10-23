import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Illustration */}
        <div className="relative inline-block">
          <div className="text-[150px] font-bold text-primary-200 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-32 h-32 text-primary-500 opacity-50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h-.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Stránka nenájdená
        </h1>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          Ľutujeme, ale stránka ktorú hľadáte neexistuje. Možno bola odstránená,
          premenovaná alebo ste zadali nesprávnu adresu.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-primary">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Naspäť domov
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-ghost"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Vrátiť sa späť
          </button>
        </div>

        {/* Search Suggestion */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-soft max-w-md mx-auto">
          <h2 className="font-semibold text-gray-900 mb-3">
            Možno hľadáte:
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              to="/"
              className="text-primary-600 hover:text-primary-700 underline text-sm"
            >
              Všetky produkty
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/"
              className="text-primary-600 hover:text-primary-700 underline text-sm"
            >
              Elektronika
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/"
              className="text-primary-600 hover:text-primary-700 underline text-sm"
            >
              Domácnosť
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/"
              className="text-primary-600 hover:text-primary-700 underline text-sm"
            >
              Šport
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;