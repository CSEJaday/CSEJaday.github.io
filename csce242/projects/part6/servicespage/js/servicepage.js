const siteRoot = "https://csejaday.github.io/csce242/projects/part6";
const dataUrl = `${siteRoot}/json/about.json`;

async function fetchJson(url) {
  const res = await fetch(url);
  console.log("fetch", url, "status:", res.status, "ok:", res.ok);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  // parse and return JSON
  return res.json();
}

// siteRoot is already defined in your script
function buildImgUrl(path) {
    if (!path) return `${siteRoot}/images/placeholder.png`;
    if (/^https?:\/\//i.test(path)) return path;
    // ensure no leading slash then build absolute URL under siteRoot
    return `${siteRoot}/${path.replace(/^\/+/, "")}`;
  }

function makeElem(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

async function showServices() {
    console.log("showServices: looking for container '#services-tent-cards' -- dataUrl:", dataUrl);
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
      console.log("raw JSON (first 200 chars):", JSON.stringify(data).slice(0, 200));
      
      // Try several plausible ways to extract an array of items:
      let itemsArr = [];
      if (Array.isArray(data)) itemsArr = data;
      else if (Array.isArray(data.services)) itemsArr = data.services;
      else if (Array.isArray(data.items)) itemsArr = data.items;
      else if (data && typeof data === "object") {
        // fallback: object keyed by id -> convert to array
        itemsArr = Object.values(data).filter(v => v && typeof v === "object");
      }
  
      console.log("Resolved items length:", itemsArr.length);
      // Debug: show actual _id types and values
      console.log("IDs in JSON:", itemsArr.map(i => (i && i._id !== undefined) ? (typeof i._id + " : " + i._id) : "no _id"));
  
      // --- REPLACE FILTER: robust to strings OR numbers ---
      const selected = itemsArr.filter(i => i && [8,9,10].includes(Number(i._id)));
      console.log("Filtered items (ids 8,9,10):", selected.map(s => ({ id: s._id, title: s.title })));
  
      container.innerHTML = ""; // clear existing
  
      if (selected.length === 0) {
        container.innerHTML = `<p class="services-empty">No matching services found.</p>`;
        return;
      }
  
      selected.forEach(item => {
        const card = makeElem("div", "service-card");
  
        const img = document.createElement("img");
        img.className = "service-image";
        const src = buildImgUrl(item.img_name || "");
        console.log("image src for id", item._id, "->", src);
        img.src = src;
        img.alt = item.title || "service";
        // fallback image on error, but avoid infinite loop
        img.addEventListener("error", function handleImgError() {
          img.removeEventListener("error", handleImgError);
          if (img.src && img.src.indexOf("placeholder.png") === -1) {
            img.src = `${siteRoot}/images/placeholder.png`;
          } else {
            img.style.display = "none";
          }
        });
  
        const heading = makeElem("h3", "service-heading", item.title || "");
        const desc = makeElem("p", "service-desc", item.description || "");
  
        const btn = makeElem("a", "learn-btn", "Learn More");
        btn.href = item.url || "#";
  
        card.appendChild(img);
        card.appendChild(heading);
        card.appendChild(desc);
        card.appendChild(btn);
  
        container.appendChild(card);
      });
  
    } catch (err) {
      console.error("Error loading services:", err);
      container.innerHTML = `<p class="services-error">Unable to load services (${escapeHtml(err.message)}). See console for details.</p>`;
    }
  }
function escapeHtml(s) {
  return (s===undefined||s===null) ? '' : String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
}

document.addEventListener("DOMContentLoaded", showServices);