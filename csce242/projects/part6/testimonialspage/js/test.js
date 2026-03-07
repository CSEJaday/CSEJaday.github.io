const TEST_URL = "https://csejaday.github.io/csce242/projects/part6/json/testimonials.json";

async function loadTestimonials() {
  try {
    const res = await fetch(TEST_URL);
    console.log("fetch testimonials:", res.status, res.ok);

    if (!res.ok) throw new Error("Failed to load testimonials");

    const data = await res.json();

    const container = document.getElementById("test-row");
    if (!container) return;

    container.innerHTML = "";

    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "test-card"; // use whatever class your CSS expects

      const name = document.createElement("h3");
      name.textContent = item.name;

      const rating = document.createElement("div");
      rating.className = "rating";
      rating.textContent = "★".repeat(item.rating);

      const date = document.createElement("div");
      date.className = "test-date";
      date.textContent = item.date;

      const text = document.createElement("p");
      text.textContent = item.text;

      card.appendChild(name);
      card.appendChild(rating);
      card.appendChild(date);
      card.appendChild(text);

      container.appendChild(card);
    });

  } catch (err) {
    console.error("Error loading testimonials:", err);
    const container = document.getElementById("test-row");
    if (container) container.innerHTML = "<p>Unable to load testimonials.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadTestimonials);