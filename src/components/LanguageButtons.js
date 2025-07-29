'use client';

const LANGUAGES = [
  { label: 'Hindi', code: 'hi' },
  { label: 'Bengali', code: 'bn' },
  { label: 'Tamil', code: 'ta' },
  { label: 'Telugu', code: 'te' },
  { label: 'Malayalam', code: 'ml' },
  { label: 'Gujarati', code: 'gu' },
  { label: 'Kannada', code: 'kn' },
  { label: 'Punjabi', code: 'pa' },
  { label: 'Marathi', code: 'mr' },
  { label: 'Urdu', code: 'ur' },
  { label: 'Odia', code: 'or' },
  { label: 'Assamese', code: 'as' },
  { label: 'Sanskrit', code: 'sa' },
  { label: 'English', code: 'en' }, // Reset to original
];

export default function LanguageButtons() {
  const changeLanguage = (code) => {
    const selects = document.querySelectorAll('.goog-te-combo');
    selects.forEach((select) => {
      select.value = code;
      select.dispatchEvent(new Event('change'));
    });
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
      {LANGUAGES.map(({ label, code }) => (
        <button
          key={code}
          onClick={() => changeLanguage(code)}
          style={{
            padding: '8px 12px',
            backgroundColor: '#007bff',
            color: 'white',
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
