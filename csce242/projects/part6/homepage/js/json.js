const dataUrl = "https://csejaday.github.io/csce242/projects/part6/json/tent.json";
const siteRoot = "https://csejaday.github.io/csce242/projects/part6";

const getTents = async () => {
  const response = await fetch(dataUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch tents.json: ' + response.status);
  }
  return response.json();
};

const makeP = (title, content) => {
  const p = document.createElement("p");
  p.innerHTML = `<strong>${title}</strong> ${content}`;
  return p;
};

const showTents = async () => {
  const tents = await getTents();
  const homeContainer = document.getElementById("tent-cards");
  const servicesContainer = document.getElementById("services-tent-cards");
  const container = homeContainer || servicesContainer;
  if (!container) return;

  container.innerHTML = "";

  let toShow;
  if (homeContainer) {
    // homepage: prefer featured items, otherwise use the first 3
    const featured = tents.filter(t => t.featured === true);
    toShow = featured.length ? featured.slice(0, 3) : tents.slice(0, 3);
  } else {
    // services page: show all (or filter by category if desired)
    toShow = tents;
  }

  // Render each selected item
  toShow.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    // Image
    const img = document.createElement("img");
    const raw = item.img_name || "";
    img.src = raw.startsWith("http") ? raw : `${siteRoot}/${raw.replace(/^\/+/, "")}`;
    img.alt = item.title || "Tent";
    img.onerror = () => { img.src = `${siteRoot}/images/placeholder.png`; };
    card.appendChild(img);

    // Heading: "Perfect For <span>Title</span>"
    const h3 = document.createElement("h3");
    h3.innerHTML = `Perfect For <span>${item.title || item.category || ""}</span>`;
    card.appendChild(h3);

    // Add the View/Learn More button
    const a = document.createElement("a");
    a.className = "card-btn";
    a.textContent = "View";
    const cat = (item.category || "").toLowerCase();
    if (cat.includes("corpor")) {
      a.href = `../corpeventpage/corpevent.html?id=${item._id}`;
    } else if (cat.includes("wedding")) {
      a.href = `../viewweddingspage/viewweddings.html?id=${item._id}`;
    } else if (cat.includes("sport") || cat.includes("festival")) {
      a.href = `../sporteventpage/sport.html?id=${item._id}`;
    } else {
      a.href = `../viewweddingspage/viewweddings.html?id=${item._id}`;
    }
    card.appendChild(a);

    container.appendChild(card);
  });
};

showTents().catch(err => {
  console.error('Error in showTents():', err);
  // Optionally show a user-visible message
  const container = document.getElementById("tent-cards") || document.getElementById("services-tent-cards");
  if (container) container.innerHTML = "<p>Unable to load tents right now.</p>";
});