const dataUrl = "https://csejaday.github.io/csce242/projects/part6/json/tent.json";
const siteRoot = "https://csejaday.github.io/csce242/projects/part6";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(dataUrl);
    const data = await response.json();

    const product = data.find(item => item._id === 7);

    if (!product) {
      console.error("Corporate tent not found");
      return;
    }

    // Image
    const tentImage = document.getElementById("tent-image");
    if (tentImage) {
      tentImage.src = `${siteRoot}/${product.img_name}`;
    }

    // Title
    document.getElementById("tent-title").textContent = product.title;

    // Yellow highlight text (SUB TITLE)
    document.getElementById("tent-highlight").textContent =
      product["sub-title"];

    // Left paragraph (LONG DESCRIPTION)
    document.querySelector(".tent-info-left p").textContent =
      product.description;

    // Price
    document.querySelector(".tent-info-left h2 span").textContent =
      `$${product.startingPrice}`;

  } catch (error) {
    console.error("Error loading corporate tent:", error);
  }
});