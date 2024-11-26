// Personal API Key for OpenWeatherMap API
const apiKey = 'e4b94e73fd77294305a84b586563d4be';

// Generate Button Event Listener
document.getElementById('generate').addEventListener('click', performAction);

function performAction() {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    console.log('Feelings input value:', feelings);

    getWeatherData(zip)
        .then((data) => {
            const newDate = new Date().toLocaleDateString();
            postData('/add', {
                date: newDate,
                temp: data.main.temp,
                feel: feelings,
            });
        })
        .then(updateUI);
}

// fetches the weather data from the link provided 
const getWeatherData = async (zip) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=e4b94e73fd77294305a84b586563d4be`);
    try {
        return await res.json();

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};

// post method 
const postData = async (url = '', data = {}) => {
    console.log('Data sent to server:', data);
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    try {
        return await res.json();
    } catch (error) {
        console.error('Error posting data:', error);
        alert(`Error: ${error.message}`);

    }
};

// updates the ui with the information when fetched
const updateUI = async () => {
    const req = await fetch('/all');
    try {
        const allData = await req.json();
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${Math.round(allData.temp)}°F`;
        document.getElementById('content').innerHTML = `Feelings: ${allData.feel}`;
    } catch (error) {
        console.error('Error updating UI:', error);
    }
};
