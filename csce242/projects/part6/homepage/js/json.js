const dataUrl = "https://raw.githubusercontent.com/CSEJaday/CSEJaday.github.io/refs/heads/main/csce242/projects/part6/json/tent.json";
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

  // Try to find a container on the current page (index.html uses "tent-cards", services page uses "services-tent-cards")
  const container = document.getElementById("tent-cards") || document.getElementById("services-tent-cards");
  if (!container) return; // nothing to do on pages that don't have these containers

  // Clear any placeholder
  container.innerHTML = "";

  tents.forEach((item) => {
    // Main card wrapper
    const card = document.createElement("div");
    card.classList.add("card");

    // Image
    const img = document.createElement("img");
    // Build full URL to image on GitHub Pages: siteRoot + "/" + item.img_name
    // item.img_name is expected to be "images/filename.png"
    img.src = `${siteRoot}/${item.img_name}`;
    img.alt = item.title || "Tent image";
    card.appendChild(img);

    // Heading (matches your design: Perfect For <span>Category</span>)
    const h3 = document.createElement("h3");
    const categoryText = item.category || item.title || "";
    h3.innerHTML = `Perfect For <span>${categoryText}</span>`;
    card.appendChild(h3);

    // Optional: show short title or price
    if (item.title) {
      const titleP = document.createElement("p");
      titleP.className = "card-title";
      titleP.textContent = item.title;
      card.appendChild(titleP);
    }

    if (typeof item.startingPrice !== "undefined") {
      const priceP = document.createElement("p");
      priceP.className = "card-price";
      priceP.innerHTML = `<strong>Starting from:</strong> $${item.startingPrice}`;
      card.appendChild(priceP);
    }

    // Short description (first sentence of description) for cards
    if (item.description) {
      const short = item.description.split(".").slice(0, 1).join(".") + ".";
      const desc = document.createElement("p");
      desc.className = "card-desc";
      desc.textContent = short;
      card.appendChild(desc);
    }

    // View / Learn More button that links to a detail page and passes the id in the query string
    const a = document.createElement("a");
    a.className = "card-btn";
    a.textContent = "Learn More";

    // Choose which detail page to use by category (you can adjust mapping as needed)
    const cat = (item.category || "").toLowerCase();
    if (cat.includes("corpor")) {
      a.href = `../corpeventpage/corpevent.html?id=${item._id}`;
    } else if (cat.includes("wedding")) {
      a.href = `../viewweddingspage/viewweddings.html?id=${item._id}`;
    } else if (cat.includes("sport") || cat.includes("festival")) {
      a.href = `../sporteventpage/sport.html?id=${item._id}`; // change to your sport detail page if different
    } else {
      // fallback to a generic detail page (recommended approach)
      a.href = `../viewweddingspage/viewweddings.html?id=${item._id}`;
      // or: a.href = `../detailpage/detail.html?id=${item._id}` if you build a single detail template
    }

    card.appendChild(a);

    // append card to container
    container.appendChild(card);
  });
};

// Run it
showTents().catch(err => {
  console.error('Error in showTents():', err);
  // Optionally show a user-visible message
  const container = document.getElementById("tent-cards") || document.getElementById("services-tent-cards");
  if (container) container.innerHTML = "<p>Unable to load tents right now.</p>";
});