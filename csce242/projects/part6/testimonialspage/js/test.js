// js/test.js
const base_url = "https://csejaday.github.io/csce242/projects/part6/json";

const getTestimonials = async () => {
  const url = `${base_url}/testimonials.json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
  return response.json();
};

const makeP = (title, content) => {
  const p = document.createElement("p");
  p.innerHTML = `<strong>${title}</strong> ${content}`;
  return p;
};

const showTestimonials = async () => {
  try {
    const items = await getTestimonials();
    const row = document.getElementById("test-row");
    if (!row) {
      console.warn("No #test-row element found — skipping testimonials.");
      return;
    }

    // clear any existing content
    row.innerHTML = "";

    // normalize to array if server returned an object wrapper
    const list = Array.isArray(items) ? items : (items.testimonials || Object.values(items));
    if (!list || !list.length) {
      row.innerHTML = "<p class='test-empty'>No testimonials available.</p>";
      return;
    }

    list.forEach((it, i) => {
      // Create the same structure your slideshow expects: .test-card with children
      const card = document.createElement("div");
      card.className = "test-card";
      card.dataset.index = i;

      const head = document.createElement("div");
      head.className = "test-head";

      const name = document.createElement("h3");
      name.className = "test-name";
      name.textContent = it.name || "Anonymous";

      const rating = document.createElement("div");
      rating.className = "test-rating";
      // simple star string (use innerHTML if you need markup)
      const r = Number(it.rating) || 0;
      rating.innerHTML = "★".repeat(Math.min(5, Math.max(0, r))) + "☆".repeat(Math.max(0, 5 - r));

      head.appendChild(name);
      head.appendChild(rating);

      const date = makeP("Date:", it.date || "");
      date.className = "test-date";

      const text = document.createElement("p");
      text.className = "test-text";
      text.textContent = it.text || "";

      card.appendChild(head);
      card.appendChild(date);
      card.appendChild(text);

      row.appendChild(card);
    });

    console.log(`Rendered ${list.length} testimonials.`);
    // notify slideshow that cards are ready
    document.dispatchEvent(new Event('testimonials:loaded'));



  } catch (err) {
    console.error("Error loading testimonials:", err);
    const row = document.getElementById("test-row");
    if (row) row.innerHTML = `<p class="test-error">Unable to load testimonials: ${err.message}</p>`;
  }
};

// run immediately
showTestimonials();