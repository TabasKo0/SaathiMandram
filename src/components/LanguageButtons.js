'use client';

const LANGUAGES = [
  { label: 'English', googleLabel: 'English' },
  { label: 'Hindi', googleLabel: 'Hindi' },
  { label: 'Bengali', googleLabel: 'Bengali' },
  { label: 'Tamil', googleLabel: 'Tamil' },
  { label: 'Telugu', googleLabel: 'Telugu' },
  { label: 'Malayalam', googleLabel: 'Malayalam' },
  { label: 'Gujarati', googleLabel: 'Gujarati' },
  { label: 'Kannada', googleLabel: 'Kannada' },
  { label: 'Punjabi', googleLabel: 'Punjabi' },
  { label: 'Marathi', googleLabel: 'Marathi' },
  { label: 'Urdu', googleLabel: 'Urdu' },
  { label: 'Odia', googleLabel: 'Odia' },
  { label: 'Assamese', googleLabel: 'Assamese' },
  { label: 'Sanskrit', googleLabel: 'Sanskrit' },
];

export default function LanguageButtons() {
  const handleTranslate = (targetLang) => {
    const interval = setInterval(() => {
      const iframe = document.querySelector('iframe.goog-te-menu-frame');
      if (!iframe) return;

      const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      const langItems = innerDoc.querySelectorAll('.goog-te-menu2-item span.text');

      for (let item of langItems) {
        if (item.innerText === targetLang) {
          item.click();
          clearInterval(interval);
          return;
        }
      }
    }, 500); // keep checking every 500ms until frame is loaded
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
      {LANGUAGES.map(({ label, googleLabel }) => (
        <button
          key={label}
          onClick={() => handleTranslate(googleLabel)}
          style={{
            padding: '8px 14px',
            background: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
