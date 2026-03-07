// js/servicepage.js
const dataUrl = "https://csejaday.github.io/csce242/projects/part6/json/tent.json";
const siteRoot = "https://csejaday.github.io/csce242/projects/part6";

/** fetch JSON with error handling */
async function getTents() {
  const res = await fetch(dataUrl);
  console.log("fetch", dataUrl, "status:", res.status, "ok:", res.ok);
  if (!res.ok) throw new Error(`Failed to fetch ${dataUrl}: ${res.status}`);
  return res.json();
}

/** build absolute image url under siteRoot (or return remote url untouched) */
function buildImgUrl(path) {
  if (!path) return `${siteRoot}/images/placeholder.png`;
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteRoot}/${path.replace(/^\/+/, "")}`;
}

/** helper to create elements */
function makeElem(tag, className, textOrHtml, useInnerHTML = false) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textOrHtml !== undefined) {
    if (useInnerHTML) el.innerHTML = textOrHtml;
    else el.textContent = textOrHtml;
  }
  return el;
}

/** main render */
async function showTents() {
  // find container: support homepage or services page
  const homeContainer = document.getElementById("tent-cards");
  const servicesContainer = document.getElementById("services-tent-cards");
  let container = homeContainer || servicesContainer;

  // If there isn't an existing container, try to create one in .features (keeps page working)
  if (!container) {
    const parent = document.querySelector(".features") || document.querySelector("main") || document.body;
    container = document.createElement("div");
    container.id = "services-tent-cards";
    container.className = "tent-cards"; // keep your HTML/CSS naming; JS will create .card children
    parent.appendChild(container);
    console.log("Created container #services-tent-cards inside", parent);
  }

  container.innerHTML = ""; // clear any existing

  try {
    const tents = await getTents();

    // Normalize to an array in case JSON is wrapped (defensive)
    let items = [];
    if (Array.isArray(tents)) items = tents;
    else if (Array.isArray(tents.services)) items = tents.services;
    else if (typeof tents === "object" && tents !== null) items = Object.values(tents).filter(v => v && typeof v === "object");

    console.log("Resolved items count:", items.length);
    // For homepage: show featured if present, otherwise first 3. For services page: show all.
    let toShow;
    if (homeContainer) {
      const featured = items.filter(t => t.featured === true);
      toShow = (featured.length ? featured.slice(0, 3) : items.slice(0, 3));
    } else {
        toShow = items.filter(i => ["8","9","10"].includes(String(i._id).trim()));
    }

    if (!toShow.length) {
      container.innerHTML = `<p class="services-empty">No matching services found.</p>`;
      return;
    }

    // Render each item using your CSS classes (.card, .card-btn)
    toShow.forEach(item => {
      const card = makeElem("div", "card");

      // image
      const img = document.createElement("img");
      img.alt = item.title || item.category || "Tent";
      const rawPath = item.img_name || "";
      img.src = buildImgUrl(rawPath);
      // fallback image on error
      img.addEventListener("error", function onErr() {
        img.removeEventListener("error", onErr);
        if (!img.src.includes("placeholder.png")) img.src = `${siteRoot}/images/placeholder.png`;
        else img.style.display = "none";
      });
      card.appendChild(img);

      // heading in the format: Perfect For <span>Title</span>
      const headingText = `Perfect For <span>${escapeHtml(item.title || item.category || "")}</span>`;
      const h3 = makeElem("h3", "", headingText, true);
      card.appendChild(h3);

      // description paragraph (if available)
      if (item.description) {
        const p = makeElem("p", "", item.description);
        card.appendChild(p);
      }

      // View/Learn More button that navigates by category
      const btn = makeElem("a", "card-btn", "Learn More");
      const cat = (String(item.category || "").toLowerCase());
      const id = encodeURIComponent(String(item._id === undefined ? "" : item._id));
      if (cat.includes("corpor")) {
        btn.href = `../corpeventpage/corpevent.html?id=${id}`;
      } else if (cat.includes("wedding")) {
        btn.href = `../viewweddingspage/viewweddings.html?id=${id}`;
      } else if (cat.includes("sport") || cat.includes("festival")) {
        btn.href = `../sporteventpage/sport.html?id=${id}`;
      } else {
        // default fallback
        btn.href = `../viewweddingspage/viewweddings.html?id=${id}`;
      }
      card.appendChild(btn);

      container.appendChild(card);
    });

  } catch (err) {
    console.error("Error loading tents:", err);
    container.innerHTML = `<p class="services-error">Unable to load services: ${escapeHtml(err.message)}</p>`;
  }
}

/** small helper to escape HTML for safety when inserting text into innerHTML */
function escapeHtml(s) {
  if (s === undefined || s === null) return "";
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
}

/** run after DOM is ready */
document.addEventListener("DOMContentLoaded", () => {
  showTents().catch(e => {
    console.error("showTents() failed:", e);
  });
});