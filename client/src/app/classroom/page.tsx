"use client";

declare global {
  interface Window {
    google: any;
  }
}

import { useEffect, useState } from "react";
import UpcomingAssignments from "./UpcomingAssignments";
import { 
  isNativePlatform, 
  initializeGoogleAuth, 
  signInToGoogle, 
  signOutFromGoogle, 
  refreshGoogleToken 
} from './googleAuthUtils';

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsNative(isNativePlatform());
        
        if (isNativePlatform()) {
          // Initialize for native platform
          const initialized = await initializeGoogleAuth();
          if (!initialized) {
            setError("Failed to initialize Google Auth");
            setLoading(false);
            return;
          }
          
          // Check if already signed in
          const refreshResult = await refreshGoogleToken();
          if (refreshResult.success && refreshResult.accessToken) {
            setAccessToken(refreshResult.accessToken);
            setIsSignedIn(true);
          }
        } else {
          // Web platform - check if Google APIs are loaded
          const checkGoogleAPI = () => {
            if (typeof window !== 'undefined' && window.google?.accounts?.oauth2) {
              return true;
            }
            return false;
          };

          // Wait for Google APIs to load
          let attempts = 0;
          const maxAttempts = 20;
          const checkInterval = setInterval(() => {
            attempts++;
            if (checkGoogleAPI() || attempts >= maxAttempts) {
              clearInterval(checkInterval);
              if (!checkGoogleAPI()) {
                setError("Failed to load Google APIs - please refresh the page");
              }
              setLoading(false);
              return;
            }
          }, 500);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Auth initialization failed:", err);
        setError("Failed to initialize authentication");
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInToGoogle();
      if (result.success && result.accessToken) {
        setAccessToken(result.accessToken);
        setIsSignedIn(true);
        setError(null);
      } else {
        setError(result.error || "Failed to sign in to Google Classroom");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Failed to sign in to Google Classroom");
    }
  };

  const handleLogout = async () => {
    try {
      const result = await signOutFromGoogle();
      if (result.success) {
        setAccessToken(null);
        setIsSignedIn(false);
      } else {
        console.error("Logout failed:", result.error);
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      {!isNative && (
        <script 
          src="https://accounts.google.com/gsi/client" 
          async 
          defer
        />
      )}
      <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">Google Classroom</h1>
            <p className="text-gray-600">View your pending assignments and deadlines</p>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#006d77] mx-auto mb-2 sm:mb-3 md:mb-4"></div>
              <p className="text-gray-600">Initializing Google Classroom...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-500 mb-2">⚠️</div>
              <p className="text-gray-600 mb-2 sm:mb-3 md:mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-[#006d77] text-white rounded-xl hover:bg-[#004f56] transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : !isSignedIn ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 max-w-md mx-auto">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-3 md:mb-4">Sign in to Google Classroom</h2>
                <p className="text-gray-600 mb-3 sm:mb-4 md:mb-6">Connect your Google account to view your assignments and courses</p>
                <button
                  onClick={handleLogin}
                  className="px-6 py-3 bg-[#006d77] text-white rounded-xl hover:bg-[#004f56] transition-all duration-200 shadow-lg font-medium"
                >
                  Sign in with Google
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-3 sm:mb-4 md:mb-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Your Assignments</h2>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
              <UpcomingAssignments accessToken={accessToken} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
