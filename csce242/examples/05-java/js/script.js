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





