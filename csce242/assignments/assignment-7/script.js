document.addEventListener("DOMContentLoaded", () => {
    const water = document.querySelector(".water");
    const bCount = 20;

    for(let i = 0; i < bCount; i++) {

        const bubble = document.createElement("div");
        bubble.classList.add("bubble");

        //Random horizontal position
        const randomX = Math.random() * 100;
        bubble.style.left = randomX + "%";

        //Random Size
        const randomSize = 8 + Math.random() * 12;
        bubble.style.width = randomSize + "px";
        bubble.style.height = randomSize + "px";

        //Random Speed
        const randomDuration = 3 + Math.random() * 5;
        bubble.style.animationDuration = randomDuration + "s";

        water.appendChild(bubble);
    }
});
