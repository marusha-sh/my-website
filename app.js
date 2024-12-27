const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}

const port = 8000;

// Mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
});

const Contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded({ extended: true }));

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('home.pug', params);
});

app.get('/Contact', (req, res) => {
    const params = {};
    res.status(200).render('Contact.pug', params);
});

app.post('/Contact', (req, res) => {
    const myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the Database");
    }).catch(() => {
        res.status(400).send("Item was not saved to the Database");
    });
});

// New route for /class
app.get('/class', (req, res) => {
    const params = {}; // Pass any data to the template if needed
    res.status(200).render('class.pug', params); // Render class.pug file
});
app.get('/about', (req, res) => {
    const params = {}; // Pass any data to the template if needed
    res.status(200).render('about.pug', params); // Render about.pug file
});

app.get('/service', (req, res) => {
    const params = {}; // Pass any data to the template if needed
    res.status(200).render('service.pug', params); // Render about.pug file
});

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
