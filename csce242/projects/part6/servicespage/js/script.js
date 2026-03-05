document.getElementById("toggle-nav").onclick = () => {
    const nav = document.querySelector("#main-nav ul");
    nav.classList.toggle("show");
 
    const toggle = document.getElementById("toggle-nav");
    toggle.textContent = nav.classList.contains("show") ? "close" : "☰";
};