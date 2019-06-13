const MongoClient = require('mongodb').MongoClient;

let uri = 'mongodb+srv://Myst:rabi12145A@cluster0-0a8va.gcp.mongodb.net/test?retryWrites=true&w=majority';

var connect = MongoClient.connect(uri, { useNewUrlParser: true}, function(err, db) {
      const collection = db.db("Website").collection("users");
      console.log("connected");
      var insTest = {
        name: 'Yahel Rabi',
        email: 'mrprogramy@gmail.com',
        password: 'rabi12145A',
        rule: 'admin',
      }

      collection.insertOne(insTest, function(err, res) {
        console.log("inserted")
      })
      db.close();
    })

module.exports.connect = connect;
