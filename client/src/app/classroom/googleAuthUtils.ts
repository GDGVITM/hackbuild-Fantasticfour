import { Capacitor } from '@capacitor/core';
import { SocialLogin } from '@capgo/capacitor-social-login';

export const isNativePlatform = () => Capacitor.isNativePlatform();

export const initializeGoogleAuth = async (): Promise<boolean> => {
  if (!isNativePlatform()) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        console.error('Failed to load Google Identity Services script.');
        resolve(false);
      };
      document.head.appendChild(script);
    });
  }
  return true;
};

export const signInToGoogle = async (): Promise<{success: boolean; accessToken?: string; error?: string}> => {
  if (isNativePlatform()) {
    try {
      const result = await SocialLogin.signIn({ provider: 'google' });
      if (result && result.token) {
        return {
          success: true,
          accessToken: result.token,
        };
      }
      return { success: false, error: 'No access token received from native login.' };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Native sign in failed' };
    }
  }
  
  // For web platform
  return new Promise((resolve) => {
    if (!(window as any).google || !(window as any).google.accounts) {
        resolve({ success: false, error: 'Google Identity Services script not loaded.' });
        return;
    }
    const tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/classroom.coursework.me.readonly https://www.googleapis.com/auth/classroom.courses.readonly',
      callback: (response: any) => {
        if (response.error) {
          resolve({ success: false, error: response.error });
        } else {
          resolve({ success: true, accessToken: response.access_token });
        }
      },
    });
    
    tokenClient.requestAccessToken();
  });
};

export const signOutFromGoogle = async (): Promise<{success: boolean; error?: string}> => {
  if (isNativePlatform()) {
    try {
      await SocialLogin.signOut();
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Native sign out failed' };
    }
  }
  
  // For web platform
  const tokenClient = (window as any).google.accounts.oauth2;
  if (tokenClient && tokenClient.getAccessToken()) {
    tokenClient.revoke(tokenClient.getAccessToken(), () => {});
  }
  return { success: true };
};

export const refreshGoogleToken = async (): Promise<{success: boolean; accessToken?: string; error?: string}> => {
  if (isNativePlatform()) {
    return signInToGoogle();
  }
  
  return { success: false, error: 'Refresh not supported or needed on web with this implementation.' };
};