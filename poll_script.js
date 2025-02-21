document.addEventListener('DOMContentLoaded', () => { // Wait for the DOM to load

    const addOptionButton = document.getElementById('addOption');
    const removeOptionButton = document.getElementById('removeOption');
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
            `;
            optionsContainer.appendChild(newOptionDiv);
        } else {
            alert(`You can only have up to ${maxOptions} options.`);
        }
    });

    // Remove option event listener
    removeOptionButton.addEventListener('click', () => {
        if (optionCounter > 2) { // Ensure at least 2 options remain
            const lastOption = document.getElementById(`optionDiv${optionCounter}`);
            if (lastOption) {
                optionsContainer.removeChild(lastOption);
                optionCounter--;
            }
        } else {
            alert("You must have at least two options!");
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
