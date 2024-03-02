require('dotenv').config(); // Load environment variables from .env file

const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = process.env.port || 3000; 
const url = process.env.MONGODB_URL;

app.get("/", (req, res) => {
    if (!url) {
        console.error("MongoDB URL not found in environment variables.");
        res.status(500).send("MongoDB URL not found.");
        return;
    }

    const client = new MongoClient(url);
    client.connect()
        .then(() => {
            const db = client.db("music");
            const collection = db.collection("movies");
            return collection.insertOne({ name: "param" }); // Inserting name from query parameters
        })
        .then(() => {
            client.close();
            console.log("Data inserted successfully");
            res.send("Data inserted successfully");
        })
        .catch(error => {
            console.error("Error:", error);
            res.status(500).send("Error inserting data");
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
