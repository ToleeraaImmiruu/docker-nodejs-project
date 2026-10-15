const express = require('express');
const path = require('path');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const app = express();
app.use(express.json());
// MongoDB connection
const url = process.env.MONGO_URL || 'mongodb://admin:password@localhost:27017';
const client = new MongoClient(url);
const dbName = 'user-account';


let users; // will hold the "users" collection
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/profile-picture', function (req, res) {
    const img = fs.readFileSync(path.join(__dirname, 'image.png'));
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.end(img);
});
// Get the profile from the database
app.get('/get-profile', async function (req, res) {
    try {
        const profile = await users.findOne({ userid: 1 });
        res.json(profile || {});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not load profile' });
    }
});

// Save (insert or update) the profile in the database
app.post('/update-profile', async function (req, res) {
    try {
        console.log('Save request received:', req.body);

        const { name, email, interests } = req.body;

        await users.updateOne(
            { userid: 1 },
            { $set: { userid: 1, name, email, interests } },
            { upsert: true }
        );

        res.json({ message: 'Profile saved' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not save profile' });
    }
});

// Connect to MongoDB first, then start the server
async function start() {
    try {
        await client.connect();
        users = client.db(dbName).collection('users');
        console.log('Connected to MongoDB, database: ' + dbName);

        app.listen(3000, function () {
            console.log(
                'App listening on port 3000! Check it out at http://localhost:3000'
            );
        });
    } catch (err) {
        console.error('Could not connect to MongoDB:', err);
        process.exit(1);
    }
}

start();
