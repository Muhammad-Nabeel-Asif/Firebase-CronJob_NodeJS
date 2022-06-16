const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://node-cron-job-4c14c-default-rtdb.firebaseio.com/",
});

const db = admin.database();
const ref = db.ref("Server/Data");
const userRef = ref.child("User");

module.exports = userRef;
