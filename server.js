const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
let projectData = {};

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('website'));

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

app.get('/all', (req, res) => {
    res.send(projectData);
})

app.post('/add', (req, res) => {
    console.log('Data received on server:', req.body);
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        feel: req.body.feel,
    };
    res.send(projectData);
})