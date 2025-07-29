'use client';

const LANGUAGES = [
  { label: 'हिन्दी', code: 'hi' },
  { label: 'বাংলা', code: 'bn' },
  { label: 'தமிழ்', code: 'ta' },
  { label: 'తెలుగు', code: 'te' },
  { label: 'മലയാളം', code: 'ml' },
  { label: 'ગુજરાતી', code: 'gu' },
  { label: 'ಕನ್ನಡ', code: 'kn' },
  { label: 'ਪੰਜਾਬੀ', code: 'pa' },
  { label: 'मराठी', code: 'mr' },
  { label: 'اردو ', code: 'ur' },
  { label: 'ଓଡ଼ିଆ ', code: 'or' },
  { label: 'অসমীয়া ', code: 'as' },
  { label: 'संस्कृतम्', code: 'sa' },
  { label: 'English', code: 'en' }, // Reset to original
];

// Array of unique background colors for each button
const COLORS = [
  '#7FDBFF', // bright pastel blue
  '#FF6F91', // bright pastel pink
  '#70E3B0', // bright pastel mint
  '#FFD166', // bright pastel peach
  '#B39DDB', // bright pastel lavender
  '#A8E063', // bright pastel green
  '#FF8DC7', // bright pastel rose
  '#FFF275', // bright pastel yellow
  '#8C9EFF', // bright pastel periwinkle
  '#EA80FC', // bright pastel mauve
  '#4DD0E1', // bright pastel aqua
  '#FFB6B9', // bright pastel blush
  '#97b88aff', // bright pastel cream
  '#fabf81ff'  // bright pastel sky
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
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        gap: '40px',
        marginTop: '40px',
        margin: '40px',
      }}
    >
      {LANGUAGES.map(({ label, code }, idx) => (
        <button
          key={code}
          onClick={() => changeLanguage(code)}
          style={{
            fontSize: '24px',
            padding: '8px 8px',
            backgroundColor: COLORS[idx % COLORS.length],
            color: 'white',
            width: '10em',
            height: '6em',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            boxShadow: '0 0 8px 1px rgba(0,0,0,0.3)', // Small
            textShadow: '4px 4px 16px rgba(0,0,0,0.7)', // Much bolder text shadow
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}