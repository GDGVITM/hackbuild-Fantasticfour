"use client";

declare global {
  interface Window {
    gapi: any;
  }
}

import { useEffect, useState } from "react";
import UpcomingAssignments from "./UpcomingAssignments";

const CLIENT_ID = "YOUR_CLIENT_ID.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/classroom.coursework.me.readonly https://www.googleapis.com/auth/classroom.courses.readonly";

export default function App() {
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    function start() {
      window.gapi.client
        .init({
          apiKey: "", // optional if only OAuth
          clientId: CLIENT_ID,
          scope: SCOPES,
          discoveryDocs: [
            "https://classroom.googleapis.com/$discovery/rest?version=v1",
          ],
        })
        .then(() => {
          const auth = window.gapi.auth2.getAuthInstance();
          setIsSignedIn(auth.isSignedIn.get());
          auth.isSignedIn.listen(setIsSignedIn);
          setGapiLoaded(true);
        });
    }
    window.gapi.load("client:auth2", start);
  }, []);

  const handleLogin = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  const handleLogout = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  if (!gapiLoaded) return <p>Loading Google API…</p>;

  return (
    <div className="p-6">
      {!isSignedIn ? (
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded-xl"
        >
          Sign in with Google
        </button>
      ) : (
        <>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-xl mb-4"
          >
            Logout
          </button>
          <UpcomingAssignments gapi={window.gapi} />
        </>
      )}
    </div>
  );
}
