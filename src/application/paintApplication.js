var admin = require("firebase-admin");

var serviceAccount = require("../../keys/paintshowroom-firebase-adminsdk-nsi44-ea9a4b00a9.json");

// // Load Chance
// var Chance = require("chance");

// // Instantiate Chance so it can be used
// var chance = new Chance();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://paintshowroom.firebaseio.com"
});

var db = admin.firestore();

exports.getList = () => {
  // https://firebase.google.com/docs/firestore/quickstart?authuser=0
  return db.collection("paints").get();
};

exports.getSingle = id => {
  // https://firebase.google.com/docs/firestore/quickstart?authuser=0
  // https://firebase.google.com/docs/firestore/query-data/get-data?authuser=0
  return db
    .collection("paints")
    .doc(id)
    .get();
};

exports.add = value => {
  return new Promise((resolve, reject) => {
    var docRef = db.collection("paints").doc(value.id);
    var data = {
      id: value.id,
      name: value.name,
      author: value.author || "",
      collection: value.collection,
      url: value.url,
      description: value.description,
      date: value.date,
      sold: value.sold,
      price: value.price
    };

    try {
      docRef.set(data);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

exports.update = (id, value) => {
  return new Promise((resolve, reject) => {
    var docRef = db.collection("paints").doc(id);
    docRef.get().then(doc => {
      if (doc.exists) {
        var record = doc.data();
        record.name = value.name || record.name;
        record.collection = value.collection || record.collection;
        record.url = value.url || record.url;
        record.description = value.description || record.description;
        record.date = value.date || record.date;
        record.sold = value.sold || record.sold;
        record.price = value.price || record.price || 0;
        record.author = value.author || record.author || "";
        try {
          docRef.set(record);
          resolve(record);
        } catch (error) {
          reject(error);
        }
      } else {
        reject(404);
      }
    });
  });
};

exports.delete = (id, value) => {
  return new Promise((resolve, reject) => {
    try {
      var docRef = db.collection("paints").doc(id);
      if (docRef.exists) {
        docRef.delete();
        resolve(true);
      } else reject(404);
    } catch (error) {
      reject(error);
    }
  });
};
