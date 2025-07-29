"use client"

import OTPWithProfile from "../components/OTPWithProfile";
import GoogleTranslateLoader from '../components/GoogleTranslateLoader';
import LanguageButtons from '../components/LanguageButtons';
import { useEffect } from "react";
export default function Home() {
 useEffect(() => {
    const addScript = () => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages:
              'en,hi,bn,te,mr,ta,ur,gu,kn,ml,pa,or,as,sa',
            layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
          
          },
          'google_translate_element'
        );
      };
    };

    if (!window.google?.translate?.TranslateElement) {
      addScript();
    }
  }, []);
  return (
    <main>
     <LanguageButtons />
      <GoogleTranslateLoader />
      
           <OTPWithProfile />
    </main>
  );
}
