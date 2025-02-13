// script.js
document.addEventListener('DOMContentLoaded', function() {
    const goButton = document.getElementById('goButton');
    const classCodeInput = document.getElementById('classCode');
    

    goButton.addEventListener('click', function() {
        const classCode = classCodeInput.value;

        if (classCode.trim() === "") {
            alert("Please enter a class code.");
        } else {
            console.log("Class Code:", classCode);
            // Or redirect, or send data, etc.
            // Example redirect:
            // window.location.href = "next_page.html?classCode=" + classCode;
        }
    });
});
