/* w3schools.com onclick Event */
function showTriangle () {
    document.getElementById("triangle").style.display = "block";
};

document.addEventListener("DOMContentLoaded", function() {
    const dateInput = document.getElementById("date-input");
    const dateOutput = document.getElementById("date-output");

    dateInput.addEventListener("change", function() {
        const selectionDate = dateInput.value;

        //Date Conversion
        const parts = selectionDate.split("-");
        const dateFormat = parts[1] + "/" + parts[2] + "/" + parts[0];

        dateOutput.textContent = "You picked the date: " + dateFormat;
    });
});

function showBorder () {
    const img = document.getElementById("sun-pic");
    img.classList.toggle("frame");
}