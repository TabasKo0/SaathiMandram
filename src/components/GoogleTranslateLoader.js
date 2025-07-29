'use client';

import { useEffect } from 'react';

export default function GoogleTranslateLoader() {
  useEffect(() => {
    if (window.google?.translate?.TranslateElement) return;

    const script = document.createElement('script');
    script.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages:
            'en,hi,bn,ta,te,ml,gu,kn,pa,mr,ur,or,as,sa',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
    };
  }, []);

  return <div id="google_translate_element" style={{ display: 'none' }} />;
}
