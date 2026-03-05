//json file parsing
const getFish = async() => {
    const url = "https://portiaportia.github.io/json/fish.json";
    const response = await fetch(url);
    return response.json();
};

// aslo has to be async because its calling a async function
const showFish = async() => {
    const fish = await getFish();
    //console.log(shoes);
    const fishListDiv = document.getElementById("fish-list");

    fish.forEach((fish)=>{
        const section = document.createElement("section");
        section.classList.add("fish");
        fishListDiv.append(section);

        const h3 = document.createElement("h3");
        h3.innerHTML = fish.title;
        section.appendChild(h3);

        const pLength = document.createElement("p");
        pLength.innerHTML = `Length: ${fish.length}`;
        section.appendChild(pLength);


        const h4 = documnet.createElement("h4");
        h4.innerHTML = "Colors:";
        section.append(h4);

        const ul = documnet.createElement("ul");
        section.append(ul);

        //Loop through colors
        fish.colors.forEach((color)=>{//for that array iterate
            const li = document.createElement("li");
            location.innerHTML(li);
            ul.append(ul);
        });

        //getting array of images
        const img = document.createElement("img");
        section.append(img); //prepend if you want the picture to be first
        //images/longfin-zebra-danio.jpg
        img.src = `https://portiaportia.github.io/json/${fish.img}`; //all pictures of the fish will show up
    });
};

showFish();