const siteRoot = "https://csejaday.github.io/csce242/projects/part6";
const dataUrl = `${siteRoot}/json/tent.json`; // adjust if needed

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  return res.json();
}

function buildImgUrl(path) {
  if (!path) return "";
  return `${siteRoot}/${path}`;
}

async function showServices() {
  try {
    const data = await fetchJson(dataUrl);

    // ✅ Only grab id 8, 9, and 10
    const selected = data.filter(item =>
      item._id === 8 ||
      item._id === 9 ||
      item._id === 10
    );

    const container = document.querySelector(".services-cards");
    container.innerHTML = "";

    selected.forEach(item => {
      const card = document.createElement("div");
      card.className = "service-card";

      card.innerHTML = `
        <img src="${buildImgUrl(item.img_name)}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <a href="#" class="learn-btn">Learn More</a>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error("Error loading services:", err);
  }
}

document.addEventListener("DOMContentLoaded", showServices);