document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Fetch the users.csv file and check credentials
    fetch('../data/users.csv')
        .then(response => response.text())
        .then(data => {
            const users = parseCSV(data);
            const user = users.find(user => user.username === username && user.password === password);

            const messageElement = document.getElementById('message');
            if (user) {
                messageElement.textContent = 'Login successful!';
                messageElement.style.color = 'green';
                localStorage.setItem('auth', JSON.stringify({name: user.username,password: user.password}))
                // Redirect to a different page or perform other actions
                window.location.href = '../index.html';
            } else {
                messageElement.textContent = 'Invalid username or password.';
                messageElement.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error fetching the CSV file:', error);
        });
});

// Function to parse CSV data
function parseCSV(data) {
    const lines = data.split('\n').map(line => line.trim()).filter(line => line);
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
        const values = line.split(',');
        return headers.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
        }, {});
    });
}
