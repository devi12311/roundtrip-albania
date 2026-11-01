export const q = (sel, root = document) => root.querySelector(sel);
export const qa = (sel, root = document) => [...root.querySelectorAll(sel)];

// Rect of `el` relative to `parent`, for absolutely positioning an overlay inside `parent`.
export function relRect(el, parent) {
  const r = el.getBoundingClientRect();
  const p = parent.getBoundingClientRect();
  return { left: r.left - p.left, top: r.top - p.top, width: r.width, height: r.height };
}

// Given a timeline and the times each step becomes active, toggle .is-active on the
// matching elements of every list passed in. Returns the update fn for onUpdate.
export function stepper(times, lists, onChange) {
  let current = -2;
  return (tl) => {
    const t = tl.time();
    let idx = -1;
    for (let i = 0; i < times.length; i++) if (t >= times[i]) idx = i;
    if (idx === current) return;
    current = idx;
    lists.forEach((els) => els.forEach((el, i) => {
      el.classList.toggle('is-active', i === idx);
      el.classList.toggle('is-done', i < idx);
    }));
    onChange?.(idx);
  };
}

// Wrap each word of [data-split] elements in a span.word (once).
export function splitWords(root) {
  qa('[data-split]', root).forEach((el) => {
    if (el.dataset.splitDone) return;
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach((w, i) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = w;
      el.append(span);
      if (i < words.length - 1) el.append(' ');
    });
    el.dataset.splitDone = '1';
  });
  return qa('.word', root);
}
