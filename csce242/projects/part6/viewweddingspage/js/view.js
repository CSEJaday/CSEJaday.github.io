const dataUrl = "https://csejaday.github.io/csce242/projects/part6/json/tent.json";
const siteRoot = "https://csejaday.github.io/csce242/projects/part6";

fetch(dataUrl)
  .then(response => response.json())
  .then(data => {
    const product = data.find(item => item._id === 4);

    if (!product) {
      console.error("Product not found");
      return;
    }

    // Title
    document.getElementById("product-title").textContent = product.title;

    // Short description
    document.getElementById("product-description").textContent = product.description;

    // Long description (first <p> inside .product-long-desc)
    document.querySelector(".product-long-desc p").textContent =
      product.description;

    // Price (span inside .starting-price)
    document.querySelector(".starting-price span").textContent =
      "$" + product.startingPrice;

    // Specifications (the 4 <li> items in order)
    const specs = document.querySelectorAll(".spec-list li");

    specs[0].textContent = "Dimensions: " + product.dimensions;
    specs[1].textContent = "Capacity: " + product.capacity;
    specs[2].textContent = "Materials: " + product.materials;
    specs[3].textContent = "Extra Fee Services: " + product.extraFeeServices;

    // Background image (.front-pic)
    document.querySelector(".front-pic").style.backgroundImage =
      `url(${siteRoot}/${product.img_name})`;
  })
  .catch(error => console.error("Error loading JSON:", error));