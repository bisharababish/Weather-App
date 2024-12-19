const apiKey = 'e4b94e73fd77294305a84b586563d4be&units=imperial';

const fetchWeather = async (baseURL, zip, apiKey) => {
    const response = await fetch(`${baseURL}zip=${zip}&appid=${apiKey}`);
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.error('Error posting data:', error);
    }
};

const updateUI = async () => {
    const request = await fetch('/getData');
    try {
        const allData = await request.json();
        document.getElementById('temp').innerHTML = `${Math.round(allData.temperature)}°F`;
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('content').innerHTML = allData.userResponse;
    } catch (error) {
        console.error('Error updating UI:', error);
    }
};

document.getElementById('generate').addEventListener('click', async () => {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    const baseURL = 'http://api.openweathermap.org/data/2.5/weather?';
    const weatherData = await fetchWeather(baseURL, zip, apiKey);

    if (weatherData.main) {
        const newDate = new Date().toLocaleDateString();
        await postData('/addData', {
            temperature: weatherData.main.temp,
            date: newDate,
            userResponse: feelings,
        });
        updateUI();
    } else {
        alert('Try Again with a different zipcode.');
    }
});
