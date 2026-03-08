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
  return "★".repeat(Math.min(5, Math.max(0, n))) + "☆".repeat(Math.max(0, 5 - n));
};

/* render function (idempotent) */
async function renderTestimonials() {
  const row = document.getElementById("test-row");
  const dotsContainer = document.getElementById("test-dots");
  if (!row) { console.warn("No #test-row found — skipping testimonials."); return; }
  if (!dotsContainer) { console.warn("No #test-dots found — skipping dots."); }

  try {
    const res = await fetch(DATA_URL);
    console.log("fetch testimonials:", DATA_URL, "status=", res.status, "ok=", res.ok);
    if (!res.ok) throw new Error("Failed to fetch testimonials: " + res.status);
    const text = await res.text();
    const data = JSON.parse(text);
    const items = Array.isArray(data) ? data : (data.testimonials || Object.values(data));
    if (!items || !items.length) {
      row.innerHTML = "<p class='test-empty'>No testimonials available.</p>";
      return;
    }

    // Clear any previous content
    row.innerHTML = "";
    if (dotsContainer) dotsContainer.innerHTML = "";

    items.forEach((it, i) => {
      // build card
      const card = el("div", "test-card");
      card.dataset.index = i;

      const head = el("div", "test-head");
      const name = el("h3", "test-name", it.name || "Anonymous");
      const rating = el("div", "test-rating", stars(it.rating), true);
      head.appendChild(name);
      head.appendChild(rating);

      const date = el("div", "test-date", it.date || "");
      const txt = el("p", "test-text", it.text || "");

      card.appendChild(head);
      card.appendChild(date);
      card.appendChild(txt);

      row.appendChild(card);

      // create dot (class name expected by slideshow.js)
      if (dotsContainer) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "dot";
        dot.dataset.index = i;
        dot.setAttribute("aria-label", `Show testimonial ${i + 1}`);
        if (i === 0) dot.classList.add("active"); // optional: initial dot active
        dotsContainer.appendChild(dot);
      }
    });

    console.log(`Rendered ${items.length} testimonials and ${dotsContainer ? dotsContainer.children.length : 0} dots.`);
    // Do NOT call slideshow init here — your slideshow.js listens for DOMContentLoaded and will run.
  } catch (err) {
    console.error("Error loading testimonials JSON:", err);
    const row = document.getElementById("test-row");
    if (row) row.innerHTML = `<p class="test-error">Unable to load testimonials: ${err.message}</p>`;
  }
}

/* Run as early as possible but safely (so slideshow's DOMContentLoaded will see content) */
if (document.readyState === "loading") {
  // register early — this handler will run before DOMContentLoaded fires (deferred scripts run in order)
  document.addEventListener("DOMContentLoaded", renderTestimonials);
} else {
  // if script is executed after DOM loaded already
  renderTestimonials();
}