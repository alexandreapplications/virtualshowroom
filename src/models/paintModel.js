var admin = require("firebase-admin");
const ValidationModel = require("./validationModel");

module.exports = function() {
  var db = admin.firestore();
  const validationModel = new ValidationModel();

  this.getList = () => {
    return db.collection("paints").get();
  };

  this.getSingle = id => {
    return db
      .collection("paints")
      .doc(id)
      .get();
  };

  this.add = value => {
    var parent = this;
    return new Promise((resolve, reject) => {
      var validation = parent.validate(value);
      if (validation) {
        reject(validation);
      }
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

  this.update = (id, value) => {
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

  this.delete = id => {
    return new Promise((resolve, reject) => {
      try {
        var docRef = db.collection("paints").doc(id);
        docRef
          .delete()
          .then(result => {
            resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  };

  this.validate = value => {
    var answer = [];
    if (!value.id) answer.push(validationModel.addRequired("id"));
    return answer.length > 0 ? answer : null;
  };

  return this;
};
