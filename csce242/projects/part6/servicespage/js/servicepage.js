const siteRoot = "https://csejaday.github.io/csce242/projects/part6";
const dataUrl = `${siteRoot}/json/about.json`;

async function fetchJson(url) {
  const res = await fetch(url);
  console.log("fetch", url, "status:", res.status, "ok:", res.ok);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.json();
}

function buildImgUrl(path) {
  if (!path) return "../images/placeholder.png";
  if (/^https?:\/\//i.test(path)) return path;
  // if already "../" keep it; otherwise prefix
  return path.startsWith("../") ? path : `../${path.replace(/^\/+/, "")}`;
}

function makeElem(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

async function showServices() {
  console.log("showServices: looking for container '#services-tent-cards'");
  // attempt to find container; we'll create one if it's not present
  let container = document.querySelector("#services-tent-cards") || document.querySelector(".services-cards");
  if (!container) {
    console.warn("No container found with id '#services-tent-cards' or class '.services-cards'. Creating one inside .features (or body).");
    const parent = document.querySelector(".features") || document.querySelector("main") || document.body;
    container = document.createElement("div");
    container.id = "services-tent-cards";
    container.className = "services-cards";
    parent.appendChild(container);
    console.log("Created container and appended to", parent);
  } else {
    console.log("Found container:", container);
  }

  try {
    const data = await fetchJson(dataUrl);

    // Make sure we have an array
    const itemsArr = Array.isArray(data) ? data : (Array.isArray(data.services) ? data.services : []);
    console.log("Loaded JSON items count:", itemsArr.length);

    const selected = itemsArr.filter(i => i && [8,9,10].includes(i._id));
    console.log("Filtered items (ids 8,9,10):", selected);

    container.innerHTML = ""; // safe now because container exists

    selected.forEach(item => {
      const card = makeElem("div", "service-card");

      const img = document.createElement("img");
      img.className = "service-image";
      img.src = buildImgUrl(item.img_name || "");
      img.alt = item.title || "service";
      // fallback image on error
      img.onerror = () => { img.src = "../images/placeholder.png"; };

      const heading = makeElem("h3", "service-heading", item.title || "");
      const desc = makeElem("p", "service-desc", item.description || "");

      const btn = makeElem("a", "learn-btn", "Learn More");
      btn.href = "#";

      card.appendChild(img);
      card.appendChild(heading);
      card.appendChild(desc);
      card.appendChild(btn);

      container.appendChild(card);
    });

  } catch (err) {
    // Show a visible warning and log details
    console.error("Error loading services:", err);
    container.innerHTML = `<p class="services-error">Unable to load services (${escapeHtml(err.message)}). See console for details.</p>`;
  }
}

function escapeHtml(s) {
  return (s===undefined||s===null) ? '' : String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
}

document.addEventListener("DOMContentLoaded", showServices);