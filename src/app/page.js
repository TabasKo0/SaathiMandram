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
        <div style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 1000
        }}>
          <button
            onClick={() => window.location.href = "/onboarding"}
             className='bg-yellow-500'
            style={{
              
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "56px",
              height: "56px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              cursor: "pointer"
            }}
            aria-label="Go to onboarding"
          >
            <span style={{display: "inline-block", transform: "translateX(2px)"}}>&#8594;</span>
          </button>
        </div>
    </main>
  );
}
