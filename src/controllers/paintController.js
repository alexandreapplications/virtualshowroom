var paintApplication = require("../application/paintApplication");
exports.getList = (req, res, next) => {
  paintApplication.getList().then(querySnapShot => {
    var data = [];
    querySnapShot.forEach(x => data.push(x.data()));
    res.status(200).send(data);
  });
};
exports.getSingle = (req, res, next) => {
  let id = req.params.id;
  paintApplication.getSingle(id).then(doc => {
    if (doc.exists) {
      res.status(200).send(doc.data());
    } else {
      res.status(404).send("Document not found");
    }
  });
};
exports.post = (req, res, next) => {
  paintApplication
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
  paintApplication.update(id, req.body);
};
exports.delete = (req, res, next) => {
  let id = req.params.id;
  paintApplication
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
