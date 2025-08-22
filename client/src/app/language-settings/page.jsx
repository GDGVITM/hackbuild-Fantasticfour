"use client";

import React, { useEffect, useState } from 'react';
import { setCookie, deleteCookie, hasCookie, getCookie } from 'cookies-next';
import './button/language-settings.css';

const LanguageSettingsPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  // Map of languages to Google Translate codes (expanded to 30+ languages)
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

  useEffect(() => {
    if(hasCookie('googtrans')){
      setSelectedLanguage(getCookie('googtrans'));
    } else {
      setSelectedLanguage('/auto/en');
    }
  }, []);

  const handleLanguageChange = (lang) => {
    const langCode = languageMap[lang];
    
    // For English, remove the cookie to show original content
    if (lang === 'English') {
      deleteCookie('googtrans', { path: '/', domain: window.location.hostname });
      deleteCookie('googtrans', { path: '/' });

      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      setSelectedLanguage('/auto/en');
    }
    // For other languages, set the cookie
    else if (langCode) {
      const cookieOptions = {
        path: '/',
        domain: window.location.hostname
      };

      setCookie('googtrans', decodeURI(langCode), cookieOptions);
      document.cookie = `googtrans=${encodeURIComponent(langCode)}; path=/; domain=${window.location.hostname}`;
      document.cookie = `googtrans=${encodeURIComponent(langCode)}; path=/`;
      
      setSelectedLanguage(langCode);
    }

    // Reload page to apply translation changes
    window.location.reload();
  };

  return (
    <div className="language-container">
      <div className="language-header">
        <h1>Language Settings</h1>
        <p>Choose your preferred language from the options below</p>
      </div>
      
      <div className="language-grid">
        {Object.keys(languageMap).map((lang) => (
          <button
            type="button"
            key={lang}
            className={`language-button ${selectedLanguage === languageMap[lang] ? 'selected' : ''}`}
            onClick={() => handleLanguageChange(lang)}
          >
            {lang}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSettingsPage;
