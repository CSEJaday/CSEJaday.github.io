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

async function showServices() {
    console.log("showServices: looking for container '#services-tent-cards' -- dataUrl:", dataUrl);
    // find existing container (homepage or services page)
    let container = document.querySelector("#services-tent-cards") || document.querySelector(".tent-cards") || document.querySelector(".services-cards");
    if (!container) {
      // create a container that matches your CSS (.tent-cards)
      const parent = document.querySelector(".features") || document.querySelector("main") || document.body;
      container = document.createElement("div");
      container.id = "services-tent-cards";
      container.className = "tent-cards"; // keep your CSS class name
      parent.appendChild(container);
      console.log("Created container and appended to", parent);
    } else {
      console.log("Found container:", container);
    }
  
    try {
      const data = await fetchJson(dataUrl);
      console.log("Fetched JSON preview:", JSON.stringify(data).slice(0, 500));
  
      // normalize to array
      let itemsArr = [];
      if (Array.isArray(data)) itemsArr = data;
      else if (Array.isArray(data.services)) itemsArr = data.services;
      else if (Array.isArray(data.items)) itemsArr = data.items;
      else if (data && typeof data === "object") itemsArr = Object.values(data).filter(v => v && typeof v === "object");
  
      console.log("Resolved items length:", itemsArr.length);

      const toShow = itemsArr.filter(i => ["8","9","10"].includes(String(i._id).trim()));
  
      container.innerHTML = ""; // clear existing
  
      if (!toShow.length) {
        container.innerHTML = `<p class="services-empty">No matching services found.</p>`;
        return;
      }
  
      toShow.forEach(item => {
        // create a card that matches your CSS (.card)
        const card = makeElem("div", "card");
  
        // image (no special class so .card img CSS applies)
        const img = document.createElement("img");
        img.alt = item.title || item.category || "Tent";
        const raw = item.img_name || "";
        img.src = buildImgUrl(raw);
        img.addEventListener("error", function onErr() {
          img.removeEventListener("error", onErr);
          if (!img.src.includes("placeholder.png")) img.src = `${siteRoot}/images/placeholder.png`;
          else img.style.display = "none";
        });
        card.appendChild(img);
  
        // heading (format used in your working CSS: .card h3 -> Perfect For <span>Title</span>)
        const h3html = `Perfect For <span>${escapeHtml(item.title || item.category || "")}</span>`;
        const h3 = makeElem("h3", "", h3html, true); // useInnerHTML=true
        card.appendChild(h3);
  
        // description paragraph (if present)
        if (item.description) {
          const p = makeElem("p", "", item.description);
          card.appendChild(p);
        }
  
        // button (class matches your CSS .card-btn)
        const btn = makeElem("a", "card-btn", "Learn More");
        // build href based on category (mirror your previous logic)
        const cat = (String(item.category || "").toLowerCase());
        const id = encodeURIComponent(String(item._id === undefined ? "" : item._id));
        if (cat.includes("corpor")) {
          btn.href = `../corpeventpage/corpevent.html?id=${id}`;
        } else if (cat.includes("wedding")) {
          btn.href = `../viewweddingspage/viewweddings.html?id=${id}`;
        } else if (cat.includes("sport") || cat.includes("festival")) {
          btn.href = `../sporteventpage/sport.html?id=${id}`;
        } else {
          btn.href = `../viewweddingspage/viewweddings.html?id=${id}`;
        }
        card.appendChild(btn);
  
        container.appendChild(card);
      });
  
    } catch (err) {
      console.error("Error loading services:", err);
      container.innerHTML = `<p class="services-error">Unable to load services (${escapeHtml(err.message)}). See console for details.</p>`;
    }
  }

/** run after DOM is ready */
document.addEventListener("DOMContentLoaded", () => {
  showTents().catch(e => {
    console.error("showTents() failed:", e);
  });
});