"use client";
import { useEffect, useState } from "react";
import { Preferences } from '@capacitor/preferences';

const isBrowser = typeof window !== 'undefined';

async function storageSet(key, value) {
  try {
    if (isBrowser && window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
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

async function storageGet(key) {
  try {
    if (isBrowser && window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
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

async function storageRemove(key) {
  try {
    if (isBrowser && window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
      await Preferences.remove({ key });
      return;
    }
  } catch {
    // ignore
  }
  if (isBrowser) localStorage.removeItem(key);
}

const languageMap = {
  'English': '/auto/en',
  'Hindi': '/auto/hi',
  'Marathi': '/auto/mr',
  'Telugu': '/auto/te',
  'Kannada': '/auto/kn',
  'Gujarati': '/auto/gu',
  'Punjabi': '/auto/pa',
  'Arabic': '/auto/ar',
  'Bengali': '/auto/bn',
  'Chinese': '/auto/zh-CN',
  'Dutch': '/auto/nl',
  'French': '/auto/fr',
  'German': '/auto/de',
  'Greek': '/auto/el',
  'Italian': '/auto/it',
  'Japanese': '/auto/ja',
  'Korean': '/auto/ko',
  'Portuguese': '/auto/pt',
  'Russian': '/auto/ru',
  'Spanish': '/auto/es',
  'Thai': '/auto/th',
  'Turkish': '/auto/tr',
  'Vietnamese': '/auto/vi',
  'Swedish': '/auto/sv',
  'Norwegian': '/auto/no',
  'Finnish': '/auto/fi',
  'Danish': '/auto/da',
  'Polish': '/auto/pl',
  'Czech': '/auto/cs',
  'Romanian': '/auto/ro',
  'Hungarian': '/auto/hu',
  'Ukrainian': '/auto/uk',
  'Bulgarian': '/auto/bg',
  'Croatian': '/auto/hr',
  'Serbian': '/auto/sr',
  'Slovak': '/auto/sk'
};

// Convert languageMap to the format needed for SelectPicker
const languages = Object.entries(languageMap).map(([label, value]) => ({
    label,
    value
}));

const TranslateProvider = ({ children }) => {
    const [selected, setSelected] = useState(null);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    // If running inside a Capacitor native platform, do not load the Google Translate widget.
    const isNativePlatform = isBrowser &&
      typeof window.Capacitor !== 'undefined' &&
      typeof window.Capacitor.isNativePlatform === 'function' &&
      window.Capacitor.isNativePlatform();

    if (isNativePlatform) {
        // No-op on native: return children as-is to avoid web widget injection and CSP/CORS issues in WebView
        return <>{children}</>;
    }

    useEffect(() => {
        if (typeof window === 'undefined') return; // only run in browser

        // Initialize with current stored value or default to English
        const initializeLanguage = async () => {
            const storedLang = await storageGet('language');
            if (storedLang) {
                setSelected(storedLang);
            } else {
                setSelected('/auto/en');
                await storageSet('language', '/auto/en');
            }
        };
        initializeLanguage();

        // Avoid injecting multiple script tags
        const SCRIPT_ID = 'google-translate-script';
        const existing = document.getElementById(SCRIPT_ID);
        if (existing && window.google?.translate) {
            setScriptLoaded(true);
            return;
        }

        if (!scriptLoaded) {
            const addScript = document.createElement('script');
            addScript.id = SCRIPT_ID;
            // Use explicit HTTPS to satisfy CSP and avoid protocol-relative -> http
            addScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            addScript.async = true;
            addScript.onload = () => {
                console.log("Google Translate script loaded");
                setScriptLoaded(true);
                // If callback already defined by this or another instance, call it
                try {
                    if (typeof window.googleTranslateElementInit === 'function') {
                        window.googleTranslateElementInit();
                    }
                } catch (err) {
                    console.warn('Error calling googleTranslateElementInit on load', err);
                }
            };
            addScript.onerror = (ev) => {
                console.error("Failed to load Google Translate script. Check network, CSP, or ad blockers.", ev);
            };
            document.body.appendChild(addScript);

            // Define the callback function for Google Translate only if not defined
            if (typeof window.googleTranslateElementInit !== 'function') {
                window.googleTranslateElementInit = () => {
                    const maxAttempts = 25;
                    const intervalMs = 200;
                    let attempts = 0;

                    const tryInit = () => {
                        attempts += 1;
                        try {
                            const TranslateElementCtor = window.google?.translate?.TranslateElement;
                            if (TranslateElementCtor && TranslateElementCtor.InlineLayout) {
                                new TranslateElementCtor({
                                    pageLanguage: 'auto',
                                    autoDisplay: false,
                                    includedLanguages: "hi,en,mr,te,kn,gu,pa,ar,bn,zh-CN,nl,fr,de,el,it,ja,ko,pt,ru,es,th,tr,vi,sv,no,fi,da,pl,cs,ro,hu,uk,bg,hr,sr,sk",
                                    layout: TranslateElementCtor.InlineLayout.SIMPLE
                                }, 'google_translate_element');
                                console.log("Google Translate element initialized");
                            } else {
                                if (attempts < maxAttempts) {
                                    // wait a bit for additional dynamic assets to load
                                    setTimeout(tryInit, intervalMs);
                                } else {
                                    console.error('Google Translate loaded but TranslateElement.InlineLayout not available after retries');
                                }
                            }
                        } catch (err) {
                            console.error('Error initializing Google Translate:', err);
                        }
                    };

                    tryInit();
                };
            }
        }
    }, [scriptLoaded]);

    return (
        <>
            {/* Make sure this element exists for Google Translate to work with */}
            <div 
                id="google_translate_element" 
                style={{
                    width:'0px',
                    height:'0px',
                    position:'absolute',
                    left:'50%',
                    zIndex:-99999
                }}
            ></div>
            
            {children}
        </>
    );
};

export default TranslateProvider;