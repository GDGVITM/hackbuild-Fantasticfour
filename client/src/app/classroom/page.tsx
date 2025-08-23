"use client";

declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

import { useEffect, useState } from "react";
import UpcomingAssignments from "./UpcomingAssignments";
import Script from "next/script";
import Link from "next/link";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "YOUR_CLIENT_ID.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/classroom.coursework.me.readonly https://www.googleapis.com/auth/classroom.courses.readonly";

const BackIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m0 7h18" />
  </svg>
);

export default function App() {
  const [gisLoaded, setGisLoaded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Check if scripts are loaded with a timeout
  useEffect(() => {
    const checkScriptsLoaded = () => {
      const gisReady = typeof window !== 'undefined' && window.google?.accounts?.oauth2;
      
      console.log('Checking scripts:', { gisReady });
      
      if (gisReady) {
        setGisLoaded(true);
        setLoading(false);
      }
    };

    // Check immediately
    checkScriptsLoaded();
    
    // Set up interval to check periodically
    const interval = setInterval(checkScriptsLoaded, 500);
    
    // Timeout after 10 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (loading) {
        setError("Failed to load Google APIs - please refresh the page");
        setLoading(false);
      }
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [loading]);

  const handleLogin = () => {
    try {
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (response: any) => {
          if (response.error) {
            console.error("Token request failed:", response.error);
            setError("Failed to sign in to Google Classroom");
            return;
          }
          
          setAccessToken(response.access_token);
          setIsSignedIn(true);
          setError(null);
        },
      });
      
      tokenClient.requestAccessToken();
    } catch (err) {
      console.error("Login failed:", err);
      setError("Failed to sign in to Google Classroom");
    }
  };

  const handleLogout = () => {
    try {
      if (accessToken) {
        window.google.accounts.oauth2.revoke(accessToken);
      }
      setAccessToken(null);
      setIsSignedIn(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      <Script 
        src="https://accounts.google.com/gsi/client" 
        strategy="afterInteractive"
      />
      <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Link 
                href="/dashboard"
                className="flex items-center space-x-2 px-3 py-2 bg-white rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm border border-gray-200"
              >
                <BackIcon />
                <span className="text-sm font-medium text-gray-700">Back to Dashboard</span>
              </Link>
            </div>
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
              <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xlshadow-lg p-4 sm:p-6 md:p-8 max-w-md mx-auto">
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