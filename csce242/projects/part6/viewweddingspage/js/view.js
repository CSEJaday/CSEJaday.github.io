const dataUrl = "https://csejaday.github.io/csce242/projects/part6/json/tent.json";
const siteRoot = "https://csejaday.github.io/csce242/projects/part6";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const resp = await fetch(dataUrl);
    if (!resp.ok) throw new Error(`Failed to fetch JSON: ${resp.status}`);
    const data = await resp.json();

    const product = data.find(item => item._id === 4);
    if (!product) {
      console.error("Product not found");
      return;
    }

    console.log("Loaded product:", product);

    // title
    const titleEl = document.getElementById("product-title");
    if (titleEl) titleEl.textContent = product.title || "";

    // sub-title field in JSON 
    const subtitleEl = document.getElementById("product-description");
    if (subtitleEl) subtitleEl.textContent = product["sub-title"] || "";

    // longer description
    const longDescP = document.querySelector(".product-long-desc p:first-child");
    if (longDescP) longDescP.textContent = product.description || "";

    const priceSpan = document.querySelector(".starting-price span");
    if (priceSpan) priceSpan.textContent =
      product.startingPrice != null ? `$${product.startingPrice}` : "";

    const specs = document.querySelectorAll(".spec-list li");
    if (specs.length >= 4) {
      specs[0].textContent = "Dimensions: " + (product.dimensions || "");
      specs[1].textContent = "Capacity: " + (product.capacity || "");
      specs[2].textContent = "Materials: " + (product.materials || "");
      specs[3].textContent = "Extra Fee Services: " + (product.extraFeeServices || "");
    }

    const frontPic = document.querySelector(".front-pic");
    if (frontPic && product.img_name) {
      const imgPath = product.img_name.replace(/^\/+/, "");
      frontPic.style.backgroundImage = `url(${siteRoot}/${imgPath})`;
      frontPic.style.backgroundSize = "cover";
      frontPic.style.backgroundPosition = "center";
    }

  } catch (err) {
    console.error("Error loading product data:", err);
  }
});