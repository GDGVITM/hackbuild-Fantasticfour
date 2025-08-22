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
    
    useEffect(() => {
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
        
        // Check if script is already loaded
        if (!scriptLoaded && !window.google?.translate) {
            const addScript = document.createElement('script');
            addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
            addScript.onload = () => {
                console.log("Google Translate script loaded");
                setScriptLoaded(true);
            };
            addScript.onerror = () => {
                console.error("Failed to load Google Translate script");
            };
            document.body.appendChild(addScript);
            
            // Define the callback function for Google Translate
            window.googleTranslateElementInit = () => {
                try {
                    new window.google.translate.TranslateElement({
                        pageLanguage: 'auto',
                        autoDisplay: false,
                        includedLanguages: "hi,en,mr,te,kn,gu,pa,ar,bn,zh-CN,nl,fr,de,el,it,ja,ko,pt,ru,es,th,tr,vi,sv,no,fi,da,pl,cs,ro,hu,uk,bg,hr,sr,sk",
                        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
                    }, 'google_translate_element');
                    console.log("Google Translate element initialized");
                } catch (err) {
                    console.error("Error initializing Google Translate:", err);
                }
            };
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