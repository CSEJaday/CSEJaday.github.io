const DATA_URL = "https://csejaday.github.io/csce242/projects/part6/json/testimonials.json";
const SITE_ROOT = "https://csejaday.github.io/csce242/projects/part6";

/** small helpers **/
const make = (tag, cls, text, useInner = false) => {
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
  return "★".repeat(Math.min(5, Math.max(0, n))) + "☆".repeat(Math.max(0, 5 - n));
};

/** fetch + parse **/
const getTestimonials = async () => {
  const res = await fetch(DATA_URL);
  console.log("fetch testimonials:", DATA_URL, "status=", res.status, "ok=", res.ok);
  if (!res.ok) throw new Error("Failed to fetch testimonials: " + res.status);
  const text = await res.text();
  // helpful debug output if something's wrong
  console.log("raw response (first 300 chars):", text.slice(0, 300));
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error("JSON parse error: " + err.message);
  }
};

/** render **/
const showTestimonials = async () => {
  const row = document.getElementById("test-row");
  if (!row) { console.warn("No #test-row element found — skipping testimonials."); return; }

  try {
    const data = await getTestimonials();
    const items = Array.isArray(data) ? data : (data.testimonials || Object.values(data));
    if (!items || !items.length) {
      row.innerHTML = "<p class='test-empty'>No testimonials available.</p>";
      return;
    }

    row.innerHTML = "";
    items.forEach((it, i) => {
      const card = make("div", "test-card");
      const head = make("div", "test-head");
      const name = make("h3", "test-name", it.name || "Anonymous");
      const rating = make("div", "test-rating", stars(it.rating), true); // stars use innerHTML
      head.appendChild(name);
      head.appendChild(rating);

      const date = make("div", "test-date", it.date || "");
      const text = make("p", "test-text", it.text || "");
      card.appendChild(head);
      card.appendChild(date);
      card.appendChild(text);
      card.dataset.index = i;

      row.appendChild(card);
    });

    console.log(`Rendered ${items.length} testimonial cards into #test-row.`);
    if (typeof window.initTestimonials === "function") window.initTestimonials();

  } catch (err) {
    console.error("Error loading testimonials JSON:", err);
    row.innerHTML = `<p class="test-error">Unable to load testimonials: ${err.message}</p>`;
  }
};

/** run after DOM ready **/
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", showTestimonials);
} else {
  showTestimonials();
}