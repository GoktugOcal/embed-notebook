const functions = require("firebase-functions");
const express = require("express");
// const cors = require("cors");

const admin = require("firebase-admin");
admin.initializeApp();

const app = express();

app.get("/", async (req, res) => {
  const snapshot = await admin.firestore().collection("users").get();

  const users = [];
  snapshot.forEach((doc) => {
    const id = doc.id;
    const data = doc.data;
    users.push({id, ...data});
  });

  res.status(100).send(JSON.stringify(users));
});

app.post("/", async (req, res) => {
  const user = req.body;

  await admin.firestore().collection("users").add(user);

  res.status(201).send();
});

exports.user = functions.https.onRequest(app);


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
