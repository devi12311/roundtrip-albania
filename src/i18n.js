// English copy lives in index.html (so it works without JS and is what crawlers see).
// Other languages override it from JSON. Switching language reloads with ?lang=.
const LANGS = ['en', 'it', 'sq'];
const loaders = {
  it: () => import('./i18n/it.json'),
  sq: () => import('./i18n/sq.json'),
};

function detectLang() {
  const fromUrl = new URLSearchParams(location.search).get('lang');
  if (LANGS.includes(fromUrl)) return fromUrl;
  try {
    const stored = localStorage.getItem('lang');
    if (LANGS.includes(stored)) return stored;
  } catch {}
  const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return LANGS.includes(nav) ? nav : 'en';
}

function apply(dict) {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const v = dict[el.dataset.i18n];
    if (v != null) el.textContent = v;
  });
  // Only our own JSON is used here, so HTML (line breaks) is trusted.
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const v = dict[el.dataset.i18nHtml];
    if (v != null) el.innerHTML = v;
  });
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(';').forEach((pair) => {
      const [attr, key] = pair.split(':');
      if (dict[key] != null) el.setAttribute(attr, dict[key]);
    });
  });
}

function setupSwitch(current) {
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.lang === current));
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang === current) return;
      try { localStorage.setItem('lang', lang); } catch {}
      const url = new URL(location.href);
      url.searchParams.set('lang', lang);
      url.hash = '';
      location.href = url.toString();
    });
  });
}

export async function initI18n() {
  const lang = detectLang();
  document.documentElement.lang = lang;
  let dict = {};
  if (lang !== 'en') {
    dict = (await loaders[lang]()).default;
    apply(dict);
  }
  setupSwitch(lang);
  return (key, fallback) => dict[key] ?? fallback;
}
