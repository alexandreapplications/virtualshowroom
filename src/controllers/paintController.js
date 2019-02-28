const PaintModel = require("../models/paintModel");
var paintModel = new PaintModel();

exports.getList = (req, res, next) => {
  paintModel.getList().then(querySnapShot => {
    var data = [];
    querySnapShot.forEach(x => data.push(x.data()));
    res.status(200).send(data);
  });
};
exports.getSingle = (req, res, next) => {
  let id = req.params.id;
  paintModel.getSingle(id).then(doc => {
    if (doc.exists) {
      res.status(200).send(doc.data());
    } else {
      res.status(404).send("Document not found");
    }
  });
};
exports.post = (req, res, next) => {
  paintModel
    .add(req.body)
    .then(record => {
      res.status(201).send(record);
    })
    .catch(error => {
      if (error === 404) {
        res.status(404).send(error);
      } else {
        res.status(401).send(error);
      }
    });
};
exports.put = (req, res, next) => {
  let id = req.params.id;
  paintModel.update(id, req.body);
};
exports.delete = (req, res, next) => {
  let id = req.params.id;
  paintModel
    .delete(id)
    .then(record => {
      res.status(201).send(record);
    })
    .catch(error => {
      if (error === 404) {
        res.status(404).send(error);
      } else {
        res.status(401).send(error);
      }
    });
};
