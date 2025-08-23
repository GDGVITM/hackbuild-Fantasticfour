import { Capacitor } from '@capacitor/core';

// Extend the SocialLoginPlugin interface to include signIn and signOut
declare module '@capacitor/social-login' {
  export interface SocialLoginPlugin {
    signIn(options: { provider: string }): Promise<any>;
    signOut(): Promise<void>;
  }
}

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
      // Fallback to web-based login if native signIn is not supported
      return await signInToGoogleWeb();
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Native sign in failed' };
    }
  }
  
  // Web platform implementation
  return await signInToGoogleWeb();
};

const signInToGoogleWeb = async (): Promise<{success: boolean; accessToken?: string; error?: string}> => {
  if (!(window as any).google || !(window as any).google.accounts) {
    return { success: false, error: 'Google Identity Services script not loaded.' };
  }
  const tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/classroom.coursework.me.readonly https://www.googleapis.com/auth/classroom.courses.readonly',
    callback: (response: any) => {
      if (response.error) {
        return { success: false, error: response.error };
      } else {
        return { success: true, accessToken: response.access_token };
      }
    },
  });
  
  return new Promise((resolve) => {
    tokenClient.requestAccessToken((response: any) => {
      if (response.error) {
        resolve({ success: false, error: response.error });
      } else {
        resolve({ success: true, accessToken: response.access_token });
      }
    });
  });
};

export const signOutFromGoogle = async (): Promise<{success: boolean; error?: string}> => {
  if (isNativePlatform()) {
    try {
      // Fallback to web-based logout if native signOut is not supported
      return await signOutFromGoogleWeb();
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Native sign out failed' };
    }
  }
  
  // Web platform implementation
  return await signOutFromGoogleWeb();
};

const signOutFromGoogleWeb = async (): Promise<{success: boolean; error?: string}> => {
  const tokenClient = (window as any).google.accounts.oauth2;
  if (tokenClient && tokenClient.getAccessToken()) {
    tokenClient.revoke(tokenClient.getAccessToken(), () => {});
  }
  return { success: true };
};

export const refreshGoogleToken = async (): Promise<{success: boolean; accessToken?: string; error?: string}> => {
  if (isNativePlatform()) {
    return signInToGoogle(); // Reuse signIn for token refresh on native
  }
  
  return { success: false, error: 'Refresh not supported or needed on web with this implementation.' };
};