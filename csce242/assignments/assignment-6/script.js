
function showExercise1() {
    document.getElementById("exercise-1").style.display = "block";
    document.getElementById("exercise-2").style.display = "none";
}

function showExercise2() {
    document.getElementById("exercise-1").style.display = "none";
    document.getElementById("exercise-2").style.display = "block";

    updateCountdown();
}

document.getElementById("toggle-nav").onclick = () => {
   const nav = document.querySelector("#main-nav ul");
   nav.classList.toggle("hide-small");

   const toggle = document.getElementById("toggle-nav");
   toggle.textContent = nav.classList.contains("hide-small") ? "▲" : "▼"
};

const range = document.getElementById("min-range");
const minutesDisplay = document.getElementById("min-display");
const messageP = document.getElementById("range-message");

function updateMinutesUI() {
    const minute = parseInt(range.value, 10);

    minutesDisplay.textContent = minute + (minute == 1 ? " minute " : " minutes ");

    let msg = " ";
    if (minute > 45) {
      msg = "🥓 🥞 More than 45 minutes let's eat breakfast!";
    } else if (minute > 30) {
      msg = "☕️ Between 31 and 45 grab a coffee.";
    } else if (minute >= 15) {
      msg = "🍎 Between 15 and 30 you have time for a quick snack.";
    } else {
      msg = "🏃‍♀️ Less than 15 run to class!";
    }

    messageP.textContent = msg;
  }

  // wire up events
  range.addEventListener("input", updateMinutesUI); //live update while dragging
  updateMinutesUI();

function updateCountdown() {
    const now = new Date();

    // Start time for class
    const classTime = new Date();
    classTime.setHours(8);
    classTime.setMinutes(30);
    classTime.setSeconds(0);

    // Calculate difference
    const diff = classTime - now;

    //Convert to minutes
    const minutes = Math.floor(diff/ 60000);
    const countdownMessage = document.getElementById("countdown-msg");

    let msg = "";

    if (minutes > 15) {
        msg = "😌 Plenty of time! Relax.";
    } 
    else if (minutes > 10) {
        msg = "🙂 You’ve got some time left.";
    } 
    else if (minutes > 5) {
        msg = "⏳ Getting close!";
    } 
    else if (minutes > 0) {
        msg = "🏃 Hurry! Class starts very soon!";
    } 
    else if (minutes >= -5) {
        msg = "😬 Class just started! You’re a little late.";
    } 
    else if (minutes >= -15) {
        msg = "😅 You’re pretty late now my friend...";
    } 
    else {
        msg = "😕 Class started a long time ago.";
    }

    countdownMessage.textContent = msg;
}





