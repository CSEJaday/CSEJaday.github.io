// js/test.js
const DATA_URL = "https://csejaday.github.io/csce242/projects/part6/json/testimonials.json";

/* helpers */
const el = (tag, cls, text, useInner = false) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) {
    if (useInner) e.innerHTML = text;
    else e.textContent = text;
  }
  return e;
};

const stars = (n) => {
  n = Number(n) || 0;
  return "★".repeat(Math.min(5, Math.max(0, n))) +
         "☆".repeat(Math.max(0, 5 - n));
};

async function renderTestimonials() {
  const row = document.getElementById("test-row");
  if (!row) {
    console.warn("No #test-row found.");
    return;
  }

  try {
    const res = await fetch(DATA_URL);
    console.log("fetch testimonials:", res.status, res.ok);

    if (!res.ok) {
      throw new Error("Failed to fetch testimonials: " + res.status);
    }

    const data = await res.json();
    const items = Array.isArray(data)
      ? data
      : (data.testimonials || Object.values(data));

    if (!items || !items.length) {
      row.innerHTML = "<p>No testimonials available.</p>";
      return;
    }

    row.innerHTML = "";

    items.forEach((it, i) => {
      const card = el("div", "test-card");
      card.dataset.index = i;

      const head = el("div", "test-head");
      const name = el("h3", "test-name", it.name || "Anonymous");
      const rating = el("div", "test-rating", stars(it.rating), true);

      head.appendChild(name);
      head.appendChild(rating);

      const date = el("div", "test-date", it.date || "");
      const text = el("p", "test-text", it.text || "");

      card.appendChild(head);
      card.appendChild(date);
      card.appendChild(text);

      row.appendChild(card);
    });

    console.log(`Rendered ${items.length} testimonials.`);

  } catch (err) {
    console.error("Error loading testimonials:", err);
    row.innerHTML =
      `<p class="test-error">Unable to load testimonials.</p>`;
  }
}

/* run after DOM ready */
document.addEventListener("DOMContentLoaded", renderTestimonials);