/*const form = document.getElementById('contact-form');
const submitBtn = form.querySelector('contact-result');

form.onsubmit = (e) => {
    e.preventDefault(); //dont follow the forms action

    const formData = new FormData(form);
    formData.append("access_key", "f68b1ede-6a0a-476b-961a-6ff461248dd0");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
*/