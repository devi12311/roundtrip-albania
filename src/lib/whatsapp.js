const NUMBER = '355683392743';

const EN = {
  general: "Hello! I'd like to book a trip with Roundtrip Albania.",
  winter: "Hello! I'm interested in a winter tour in the Balkans.",
};

// Every [data-wa="key"] link opens WhatsApp with a pre-filled message in the current language.
export function initWhatsApp(t) {
  document.querySelectorAll('[data-wa]').forEach((a) => {
    const key = a.dataset.wa in EN ? a.dataset.wa : 'general';
    const msg = t(`wa.${key}`, EN[key]);
    a.href = `https://wa.me/${NUMBER}?text=${encodeURIComponent(msg)}`;
  });
}
