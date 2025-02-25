document.addEventListener('DOMContentLoaded', () => { // Wait for the DOM to load

    const addOptionButton = document.getElementById('addOption');
    const optionsContainer = document.getElementById('optionsContainer');
    let optionCounter = 2; // Start with 2 options (A and B)
    const maxOptions = 6; // Set the max limit of options

    // Add option event listener
    addOptionButton.addEventListener('click', () => {
        if (optionCounter < maxOptions) {
            optionCounter++;
            const newOptionDiv = document.createElement('div');
            newOptionDiv.className = 'option';
            newOptionDiv.id = `optionDiv${optionCounter}`;
            newOptionDiv.innerHTML = `
                <label for="option${String.fromCharCode(64 + optionCounter)}">${String.fromCharCode(64 + optionCounter)} -</label>
                <input type="text" id="option${String.fromCharCode(64 + optionCounter)}" name="options[]" required>
                <button class="remove-btn" data-id="${optionCounter}">❌</button>
            `;
            optionsContainer.appendChild(newOptionDiv);
        } else {
            alert(`You can only have up to ${maxOptions} options.`);
        }
    });

    // Event delegation to handle dynamic delete buttons
    optionsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const optionId = event.target.getAttribute('data-id');
            const optionDiv = document.getElementById(`optionDiv${optionId}`);
            if (optionDiv && optionCounter > 2) { // Ensure at least 2 options remain
                optionsContainer.removeChild(optionDiv);
                optionCounter--;
            } else {
                alert("You must have at least two options!");
            }
        }
    });

    // Form submission event listener
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
