const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");

const url = "mongodb+srv://param270604:4vDMjO08tXJpItFh@users.qzwkmmp.mongodb.net/?retryWrites=true&w=majority"; // Use environment variable for MongoDB connection URL

app.get("/", (req, res) => {
    const client = new MongoClient(url);
    client.connect()
        .then(() => {
            const db = client.db("music");
            const collection = db.collection("movies");
            return collection.insertOne({ name: "param" }); 
        })
        .then(() => {
            client.close();
            console.log("data inserted successfully");
            res.send("hey param");
        })
        .catch(error => {
            console.error("Error:", error);
            res.status(500).send("Error inserting data");
        });
});

app.listen(3000);
