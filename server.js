var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var NOTES_COLLECTION = "notes";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;
//process.env.MONGODB_URI local === mongodb://localhost/notes
// Connect to the database before starting the application server.
mongodb.MongoClient.connect('mongodb://heroku_6kd29w1h:8cttejuiirs9v2qdvuc7r5if92@ds161950.mlab.com:61950/heroku_6kd29w1h', function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// noteS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/notes"
 *    GET: finds all notes
 *    POST: creates a new note
 */

app.get("/api/notes", function(req, res) {
  db.collection(NOTES_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get notes.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/notes", function(req, res) {
  var newnote = req.body;
  newnote.createDate = new Date();

  if (!req.body.ticker) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(NOTES_COLLECTION).insertOne(newnote, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new note.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/notes/:id"
 *    GET: find note by id
 *    PUT: update note by id
 *    DELETE: deletes note by id
 */

app.get("/api/notes/:id", function(req, res) {
  db.collection(NOTES_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get note");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/notes/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(NOTES_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update note");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/notes/:id", function(req, res) {
  db.collection(NOTES_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete note");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
