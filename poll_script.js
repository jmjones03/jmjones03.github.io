// poll_script.js
document.addEventListener('DOMContentLoaded', () => { // Wait for the DOM to load

    const addOptionButton = document.getElementById('addOption');
    const optionsContainer = document.getElementById('optionsContainer');
    let optionCounter = 2; // Start with 2 options (A and B)

    addOptionButton.addEventListener('click', () => {
        optionCounter++;
        const newOptionDiv = document.createElement('div');
        newOptionDiv.className = 'option';
        newOptionDiv.innerHTML = `
            <label for="option${String.fromCharCode(64 + optionCounter)}">${String.fromCharCode(64 + optionCounter)} -</label>
            <input type="text" id="option${String.fromCharCode(64 + optionCounter)}" name="options[]" required>
        `;
        optionsContainer.appendChild(newOptionDiv);
    });

    document.getElementById('pollForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const premise = document.getElementById('pollPremise').value;
        const options = Array.from(document.querySelectorAll('input[name="options[]"]')).map(input => input.value);

        console.log("Premise:", premise);
        console.log("Options:", options);

        // Send data to your backend (replace with your endpoint)
        fetch('/create_poll', { // Example using fetch
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ premise, options })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Poll created:', data);
            // Handle success (e.g., redirect, show message)
        })
        .catch(error => {
            console.error('Error creating poll:', error);
            // Handle error (e.g., display error message)
        });
    });
});