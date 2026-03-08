// about.js
// Adjust siteRoot if your site lives somewhere else
const siteRoot = "https://csejaday.github.io/csce242/projects/part6";
const dataUrl = `${siteRoot}/json/about.json`;

// helper to fetch JSON
async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.json();
}

// safe image URL builder: allows filenames with spaces and leading slashes
function buildImgUrl(path) {
  if (!path) return `${siteRoot}/images/placeholder.png`;
  // if path is already absolute url start-with http, return as-is
  if (/^https?:\/\//i.test(path)) return path;
  // remove leading slashes and encode the path components
  const cleaned = path.replace(/^\/+/, '').split('/').map(encodeURIComponent).join('/');
  return `${siteRoot}/${cleaned}`;
}

function makeElem(tag, className, innerHTML) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (innerHTML !== undefined) el.innerHTML = innerHTML;
  return el;
}

async function showAbout() {
  let data;
  try {
    data = await fetchJson(dataUrl);
  } catch (err) {
    console.error("Error loading about.json:", err);
    return;
  }

  // Render the two "aboutCards"
  const aboutContainer = document.querySelector('.About-us-cards') || document.querySelector('#about-cards');
  if (aboutContainer && Array.isArray(data.aboutCards)) {
    // clear any existing
    aboutContainer.innerHTML = '';

    data.aboutCards.forEach(card => {
      const cardDiv = makeElem('div', 'card');

      const img = makeElem('img');
      img.src = buildImgUrl(card.image);
      img.alt = card.title || 'About image';
      img.onerror = () => { img.src = `${siteRoot}/images/placeholder.png`; };

      const h3 = makeElem('h3', 'box-heading', card.title || '');
      const p = makeElem('p', 'desc-text', card.text || '');

      cardDiv.appendChild(img);
      cardDiv.appendChild(h3);
      cardDiv.appendChild(p);

      aboutContainer.appendChild(cardDiv);
    });
  }

  // Render owners
  const ownersContainer = document.querySelector('.owners-container') || document.getElementById('owners-container');
  if (ownersContainer && Array.isArray(data.owners)) {
    ownersContainer.innerHTML = '';

    data.owners.forEach(owner => {
      const card = makeElem('div', 'owner-card');

      const img = makeElem('img', 'owner-photo');
      img.src = buildImgUrl(owner.photo);
      img.alt = owner.name || 'Owner photo';
      img.onerror = () => { img.src = `${siteRoot}/images/placeholder.png`; };

      const name = makeElem('h3', 'owner-name', owner.name || '');
      const role = makeElem('p', 'owner-role', owner.role || '');
      const bio = makeElem('p', 'owner-bio', owner.bio || '');
      const a = makeElem('a', 'owner-email', owner.email ? owner.email : 'No email available');
      a.href = owner.email ? `mailto:${owner.email}` : '#';

      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(role);
      card.appendChild(bio);
      card.appendChild(a);

      ownersContainer.appendChild(card);
    });
  }

  // Render quoteText
  if (data.quoteText) {
    const qEl = document.getElementById('quote-text') || document.querySelector('.quote-text');
    if (qEl) qEl.textContent = data.quoteText;
  }
}

// run it
document.addEventListener('DOMContentLoaded', () => {
  showAbout().catch(e => console.error(e));
});