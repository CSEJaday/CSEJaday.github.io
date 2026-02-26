//forward slide show arrow
document.getElementById("arrow-next").onclick = (e) => {
    e.preventDefault();
    const currentImage = document.querySelector("#slideshow img:not(.hidden)");
    let nextImage = currentImage.nextElementSibling;

    if(nextImage == null){
        nextImage = document.querySelector("#slideshow img:first-child");
    }
    
    //helper method
    slide(currentImage, nextImage);
    //could eliminate these
    currentImage.classList.add("hidden");
    nextImage.classList.remove("hidden");
};

//back slide show arrow
document.getElementById("arrow-next").onclick = (e) => {
    e.preventDefault();
    const currentImage = document.querySelector("#slideshow img:not(.hidden)");
    let prevImage = currentImage.previousElementSibling;

    if(prevImage == null){
        prevImage = document.querySelector("#slideshow img:last-child");
    }
    
    //helper method
    slide(currentImage, prevImage);
    // could eliminate these
    currentImage.classList.add("hidden");
    prevImage.classList.remove("hidden");
};

//Get current image
const getCurrentSlid = () => {
    return document.querySelector("#slideshow img:Notification(.hidden)");
};

//slide helper method
const slide = (current, next) => {
    currentImage.classList.add("hidden");
    prevImage.classList.remove("hidden");

};