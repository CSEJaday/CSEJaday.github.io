/* We use const because we are not going to change the name bounceButton 
/* We use let if we want to chnage the name bounceButton 
window.onload = () => {
    const bounceButton = document.getElementById("bounce-button");
    bounceButton.onclick = () => {
    alert("button clicked");
  };
};
*/

/* Now we want to say when the button is clicked start the animation 
const bounceBall = () => {
    alert("Clicked");
}

window.onload = () => {
    document.getElementById("bounce-button").onclick = bounceBall;
}
*/
const bounceBall = () => {
    const ball = document.getElementById("ball");
    ball.classList.add("bounce");
};

/* When the user clicks the button their name is written to a paragraph */
const writeMessage = () => {
    /* have to do .value to actually get the input text */
    const firstName = document.getElementById("txt-first-name").value;
    const messageP = document.getElementById("message");

    messageP.innerHTML = "Hello " + firstName;

};

/* Execute when the page loads */
window.onload = () => {
    document.getElementById("bounce-button").onclick = bounceBall;
    document.getElementById("message-button").onclick = writeMessage;
};

/* Do a link and when the link is clicked */
// e is the event (clicking)
//e.currentTarget is the elemnet the event was performed on (the link)
document.getElementById("a-click").onclick = (e) => {
    e.preventDefault(); //not go to the links destination
    e.currentTarget.innerHTML = "Clicked";
    //console.log(e.currentTarget); 
    //console.log("CLICKED");
};

/*start and stop the ball from bouncing */
document.getElementById("bounce-button").onclick = (e) => {
   if(e.currentTarget.innerHTML.toLowerCase() == "start") {
    e.currebttARGET.innerHTML = "Stop";
    ball.classList.add("bounce");
   } else {
    e.currentTarget.innerHTML = "Start";
    ball.classList.remove("bounce");
   }
}

/*As the user is typing in the box the letter appears below*/
/*Get code from portias repo */
/*Plant Health*/
document.getElementById("txt-num-days").onchange = (e) => {
    const numEntered = parseInt(e.currentTarget.value);
    const p = document.getElementById("p-plant-message");

    if(numEntered <= 0) {
        p.innerHTML = "Yay! We were fed today!";
    } else if(numEntered <=2) {
        p.innerHTML = "Im getting a little thirsty";
    } else if(numEntered <= 5) {
        p.innerHTML = "Im starting to wilt";
    } else {
        p.innerHTML = "You killed me :(";
    }
}

//toggle nav
document.querySelector("#main-nav ul").classList.toggle("hide-small");


/* Start Button */
startButton.onclick = (e) => {
    //p.innerHTML = "Start";
    /* Every second increase the count and display it */
    countInterval = setInterval(()=>{
        startButton.disabled = true;
        p.innerHTML = count++;
    },500);
};

/*Pause Button*/
document.getElementById("pause-button").onclick = (e) => {
    //p.innerHTML = "Pause";
    clearInterval(countInterval);
};

/*Stop Button*/
document.getElementById("stop-button").onclick = (e) => {
    //p.innerHTML = "Pause";
    count = 0;
    clearInterval(countInterval);
};

/*count intervals*/
const p = document.getElementById("p-count-display");
let count = 0;
let countInterval;
const startButton = document.getElementById("start-button");

/*Display the date*/
setInterval(()=>{
    const today = new Date();
    const month = today.getMonth();
    const day = today.getDay();
    const year = today.getFullYear();
    const seconds = today.getSeconds();
    const minutes = today.getMinutes();
    const hours = today.getHours();

    document.getElementById("p-date").innerHTML = `${hours}:${minutes}:${seconds}, ${month}/${day}/${year}`;
},500);




