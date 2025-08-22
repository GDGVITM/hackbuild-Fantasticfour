// import jwt from 'jsonwebtoken';
// Lightweight auth + offline queue utilities for Capacitor + web
// Provides storage abstraction and a simple pending-action queue flushed when online.

import { Preferences } from '@capacitor/preferences';

const isBrowser = typeof window !== 'undefined';

// cached values to avoid repeated storage reads and keep user logged in in-memory
let cachedToken: string | null = null;
let cachedUsername: string | null = null;

async function storageSet(key: string, value: any) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (isBrowser && (window as any).Capacitor && (window as any).Capacitor.isNativePlatform && (window as any).Capacitor.isNativePlatform()) {
      await Preferences.set({ key, value: JSON.stringify(value) });
      return;
    }
  } catch {
    // fallthrough to localStorage
  }

  if (isBrowser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

async function storageGet(key: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (isBrowser && (window as any).Capacitor && (window as any).Capacitor.isNativePlatform && (window as any).Capacitor.isNativePlatform()) {
      const res = await Preferences.get({ key });
      return res.value ? JSON.parse(res.value) : null;
    }
  } catch {
    // ignore
  }

  if (isBrowser) {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : null;
  }
  return null;
}

async function storageRemove(key: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (isBrowser && (window as any).Capacitor && (window as any).Capacitor.isNativePlatform && (window as any).Capacitor.isNativePlatform()) {
      await Preferences.remove({ key });
      return;
    }
  } catch {
    // ignore
  }
  if (isBrowser) localStorage.removeItem(key);
}

export async function storeTokenAndUsername(token: string, username: string) {
  cachedToken = token;
  cachedUsername = username || null;
  await storageSet('token', token);
  await storageSet('username', username);
}

export async function getStoredToken() {
  if (cachedToken) return cachedToken;
  const t = await storageGet('token');
  cachedToken = typeof t === 'string' ? t : null;
  return cachedToken;
}

export async function getStoredUsername() {
  if (cachedUsername) return cachedUsername;
  const u = await storageGet('username');
  cachedUsername = typeof u === 'string' ? u : null;
  return cachedUsername;
}

// Pending actions queue (array of { id, url, options })
async function getPending() {
  const p = await storageGet('pending_actions');
  return Array.isArray(p) ? p : [];
}

async function setPending(arr: any[]) {
  await storageSet('pending_actions', arr);
}

export async function queuePendingAction(action: { url: string; options: any }) {
  const pending = await getPending();
  pending.push({ id: Date.now() + '-' + Math.random().toString(36).slice(2), ...action });
  await setPending(pending);
}

export async function flushPendingActions() {
  const pending = await getPending();
  if (!pending.length) return;

  const remaining: any[] = [];
  for (const item of pending) {
    try {
      const res = await fetch(item.url, item.options);
      if (!res.ok) {
        // keep if server rejects
        remaining.push(item);
        continue;
      }

      // Successful response: attempt to parse JSON and if it contains a token, store it.
      try {
        const data = await res.clone().json();
        if (data && data.token) {
          // try to determine a username: prefer server value, fall back to stored pending_login_email or request body
          let username = data.username || null;
          if (!username) {
            const pendingEmail = await storageGet('pending_login_email');
            if (pendingEmail) username = pendingEmail;
            else if (item.options && item.options.body) {
              try {
                const body = typeof item.options.body === 'string' ? JSON.parse(item.options.body) : item.options.body;
                if (body && (body.email || body.username)) username = body.username || body.email;
              } catch {
                // ignore
              }
            }
          }

          await storeTokenAndUsername(data.token, username || '');
          // clear any pending login email marker
          await storageRemove('pending_login_email');
        }
      } catch {
        // not JSON or parsing failed — ignore
      }

      // discard successful
    } catch {
      // network error -> keep
      remaining.push(item);
    }
  }
  await setPending(remaining);
}

export function initAuthQueue() {
  if (!isBrowser) return;
  // preload cached token/username from storage so user remains logged in
  void (async () => {
    try {
      const t = await storageGet('token');
      const u = await storageGet('username');
      cachedToken = typeof t === 'string' ? t : null;
      cachedUsername = typeof u === 'string' ? u : null;
    } catch {
      // ignore
    }
    // Try flushing pending actions on init and when online
    void flushPendingActions();
  })();

  window.addEventListener('online', () => {
    void flushPendingActions();
  });
}

export async function clearAuth() {
  cachedToken = null;
  cachedUsername = null;
  await storageRemove('token');
  await storageRemove('username');
}

const auth = {
  storageSet,
  storageGet,
  storageRemove,
  storeTokenAndUsername,
  getStoredToken,
  getStoredUsername,
  queuePendingAction,
  flushPendingActions,
  initAuthQueue,
  clearAuth,
};

export default auth;