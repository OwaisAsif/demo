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

function checkAuth() {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (!auth) {
        window.location.href = 'auth/login.html';
        return;
    }

    fetch('data/users.csv')
        .then(response => response.text())
        .then(data => {
            const users = parseCSV(data);
            const user = users.find(user => user.username === auth.name && user.password === auth.password);
            if (!user) {
                window.location.href = 'auth/login.html';
            }
        })
        .catch(error => {
            console.error('Error fetching the CSV file:', error);
        });
}

checkAuth();
