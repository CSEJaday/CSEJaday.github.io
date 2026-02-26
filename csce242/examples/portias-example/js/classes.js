//add dogs
class Dog {
    constructor(title, breed, age, size, pic) {
        this.title = title;
        this.breed = breed;
        this.age = age;
        this.size = size;
        this.pic = pic;
    }

    //can access by doing .item
    get item() {
        constdogSection = document.createElement("section");
        dogSection.classlist.add("dog");

        //title
        const a1 = document.createElement("a");
        a1.href = "#";
        const h3 = document.createElement("h3");
        a1.append(h3);
        h3.innerHTML = this.title;
        dogSection.append(a1);

        //image
        const img = document.createElement("img");
        img.src = `images/classes/${this.pic}`;
        a1.append(img);

        //more info section
        dogSection.append(this.moreInfo());
        //const infoSection = this.moreInfo();
        //const infoSection = document.createElement("section");
        dogSection.append(infoSection);

        //hide and show more info
        a1.onclick = (e) => {
            e.preventDefault(); //takes pound away
            dogSection.querySelector("ul").classList.toggle("hidden");
        };

        return dogSection;
    }

    //helper method does not use the get
    /*moreInfo() {
        //const section = document.createElement("section");
        //section.innerHTML = "Hello";
        const ul = document.createElement("ul");
        const li = document.createElement("li");
        li.innerHTML = `<strong>${label}</strong>: ${this.breed}`;
        ul.append(li);

        return ul;

        //return section;
    }*/
    
    //helper method
    moreInfo(label,value) {
        const ul = document.createElement("ul");
        classList.add("hidden");
        ul.append(this.infoLi("Breed", this.breed));
        ul.append(this.infoLi("Size", this.size));
        ul.append(this.infoLi("Age", this.age));

        return ul;
    }

    infoLi(label, value) {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${label}</strong>: ${value}`;

        return li;
    }
    /* Example
    get item() {
        const p = document.createElement("p");
        p.innerHTML = this.title; //will print out coco, sam, and gerald
        return p;
    }*/
}

//make dogs
const dogs = [];
dogs.push(new Dog("coco", "yorkie", 5, "small", "yorkie.jpg")); //pushing a new element into the array
dogs.push(new Dog("Sam", "Golden Retriever", 2, "large", "golden-retriever.jpg"));
dogs.push(new Dog("Gerald", "Pit Bull", 1, "large", "pit-bull.jpg"));

//loop through it
dogs.forEach((dog)=> {
    document.getElementsById("dogs").append(dog.item);

});



