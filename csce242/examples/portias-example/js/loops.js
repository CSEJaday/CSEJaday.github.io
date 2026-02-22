document.getElementById("btn-first-loop").onclick = () => {
    const ul = document.getElementById("ul-first-loop");

    for(let i = 0; i < 10; i++) {
        const li = document.createElement("li");
        li.innerHTML = `I'm the ${i+1} element`;
        ul.append(li);
    }
};

document.getElementById("btn-range-button").onclick = () => {
    //console.log("clicked");
    const startNumber = parseInt(document.getElementById("txt-start").value);
    const endNumber  = parseInt(document.getElementById("txt-end").value);
    const errorP = document.getElementById("error-range");
    errorP.innerHTML = "";
    const divNumRange = document.getElementById("number-range");

    //console.log(startNumber + endNumber);
    if(startNumber > endNumber) {
        errorP.innerHTML = "Not at valid range";
        return;
    }

    for(let i = startNumber; i < endNumber + 1; i++) {
        const p = document.createElement("p");
        p.innerHTML = i;
        divNumRange.append(p);
        p.onclick = () => {
            //console.log(`You clicked ${i}`);
            document.getElementById("number-message").innerHTML = `You clciked the ${i}th item`;
        };
    }
};

document.getElementById("a-show-toys").onclick = (e) => {
    e.preventDefault(); //dont go to the link destination!!
    const toyList = document.getElementById("toy-list");
    toyList.innerHTML = "";
    //toyList.innerHTML = "Portia"; just to see if it worked

    //array of toys
    const toys = ["fish", "guitar", "popsicle", "rc cards", "shoe"];

    //Traditional for loop
    //When lick is clicked the list or toys will appear
    for (let i = 0; i < toys; i++) {
        const li = document.createElement("li");
        li.innerHTML = toys[i];
        toyList.append(li);
    }

    //Second way preferred
    //(toy,i) can also do toy,i
    // toys the array you want to iterate over
    // toy is the array item
    toys.forEach((toy)=>{
        //console.log(toy);
        const li = document.createElement("li");
        li.innerHTML = toy;
        toyList.append(li);
    });
};

//Associative Array
const toyPrices = []
toyPrices = ["fish"] = 2.99;
toyPrices = ["guitar"] = 200.00;
toyPrices = ["popsicle sticks"] = 0.1;
toyPrices = ["rc car"] = 59.99;
toyPrices = ["shoes"] = 49.99;

for(let toy in toyPrices) {
    const toyTable = document.getElementById("toy-table");
    const tr = createElement("tr");
    toyTable.append(tr);
    const tdToy = document.createElement("td");
    tdToy.innerHTML = toy;
    tr.append(tdToy);

    const tdPrice = document.createElement("td");
    tdPrice.innerHTML = `$${toyPrices[toy]}`;
    tr.append(tdPrice);

    tr.onclick = () => {
        document.getElementById("p-toy-desc").innerHTML =
            `You want a ${toy} so ask your mom for $${toyPrices[toy]}`;
    };
}
