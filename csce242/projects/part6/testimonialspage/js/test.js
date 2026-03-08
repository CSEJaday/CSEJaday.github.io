// js/test.js
const TEST_URL = "https://csejaday.github.io/csce242/projects/part6/json/testimonials.json";

function make(tag, cls, text, useInnerHTML = false) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) {
    if (useInnerHTML) e.innerHTML = text;
    else e.textContent = text;
  }
  return e;
}
function stars(n) { n = Number(n) || 0; return "★".repeat(n) + "☆".repeat(Math.max(0, 5 - n)); }

async function loadTestimonialsData() {
  const row = document.getElementById("test-row");
  if (!row) { console.warn("No #test-row found — testimonials skipped."); return; }

  try {
    const res = await fetch(TEST_URL);
    console.log("fetch testimonials:", TEST_URL, res.status, res.ok);
    if (!res.ok) throw new Error(`Failed to fetch testimonials: ${res.status}`);

    const data = await res.json();
    const items = Array.isArray(data) ? data : (data.testimonials || Object.values(data));
    if (!items || !items.length) { row.innerHTML = "<p class='test-empty'>No testimonials available.</p>"; return; }

    row.innerHTML = ""; // clear existing
    items.forEach((it, i) => {
      const card = make("div", "test-card");
      const head = make("div", "test-head");
      const name = make("h3", "test-name", it.name || "Anonymous");
      const rating = make("div", "test-rating", stars(it.rating), true);
      head.appendChild(name); head.appendChild(rating);
      const date = make("div", "test-date", it.date || "");
      const text = make("p", "test-text", it.text || "");
      card.appendChild(head); card.appendChild(date); card.appendChild(text);
      card.dataset.index = i;
      row.appendChild(card);
    });

    console.log(`Rendered ${items.length} testimonial cards into #test-row.`);
    // If your slideshow provides an init function, call it here:
    if (typeof window.initTestimonials === "function") window.initTestimonials();

  } catch (err) {
    console.error("Error loading testimonials JSON:", err);
    row.innerHTML = `<p class="test-error">Unable to load testimonials: ${err.message}</p>`;
  }
}

document.addEventListener("DOMContentLoaded", loadTestimonialsData);