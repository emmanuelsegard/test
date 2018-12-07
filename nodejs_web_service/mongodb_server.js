var express = require("express");
var app = express();
var MongoClient = require("mongodb").MongoClient;
// For locally installed MongoDB, use localhost :
//var db_url = "mongodb://localhost:27017/";
// For local MongoDB Docker container, use the local IP address :
//var db_url = "mongodb://10.142.58.164:27017/";
// For AWS deployed MongoDB Docker container, use the AWS EC2 public DSN :
var db_url = "mongodb://ec2-18-220-24-81.us-east-2.compute.amazonaws.com:27017/";
const collection = "esegard-collection";
const db_name = "esegard-db";
// For local server use :
//const port = 8080;
// For AWS deployed server user :
const port = 80;

app
  .post("/v1/key/:key/value/:value", function(req, res) {
    MongoClient.connect(
      db_url,
      { useNewUrlParser: true },
      function(err, db) {
        if (err) throw err;

        //////////////////////////
        // DOCUMENTS INSERTIONS //
        //////////////////////////

        var dbo = db.db(db_name);
        var doc = {
          key: req.params.key,
          value: req.params.value
        };

        dbo.collection(collection).insertOne(doc, function(err, result) {
          if (err) throw err;
          console.log("1 document inserted !");
          res.write("1 document inserted !");
          res.end();
          db.close();
        });
      }
    );
  })
  .get("/v1/key/:key", function(req, res) {
    MongoClient.connect(
      db_url,
      { useNewUrlParser: true },
      function(err, db) {
        if (err) throw err;

        var dbo = db.db(db_name);

        //////////////////////
        // DOCUMENTS QUERIES//
        //////////////////////

        dbo
          .collection(collection)
          .findOne(
            { key: req.params.key },
            { projection: { _id: 0 } },
            function(err, result) {
              if (err) throw err;
              console.log(result);
              if (result) {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.write(JSON.stringify(result));
              } else {
                res.status(404).send('Document not found !');
              }
              res.end();
              db.close();
            }
          );
      }
    );
  })
  .delete("/v1/key/:key", function(req, res) {
    MongoClient.connect(
      db_url,
      { useNewUrlParser: true },
      function(err, db) {
        if (err) throw err;

        var dbo = db.db(db_name);

        ////////////////////////
        // DOCUMENTS DELETION //
        ////////////////////////

        var del_q = { key: req.params.key };

        dbo.collection(collection).deleteMany(del_q, function(err, obj) {
          if (err) throw err;
          console.log(obj.result.n + " document(s) deleted !");
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.write(obj.result.n + " document(s) deleted !");
          res.end();
          db.close();
        });
      }
    );
  })
  .use(function(req, res, next) {
    console.log("Unknown command !");
    res.setHeader("Content-Type", "text/plain");
    res.status(404).send("Unknown command !");
  });

app.listen(port);
