var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());

Genre = require("./models/genre");
Book = require("./models/book");

//connect to Mongo
mongoose.connect("mongodb://localhost/bookstore");
var db = mongoose.connection;

//Handle get for "/"
app.get("/", function (req, res) {
    res.send("Please use /api/books or /api/genres");
});



//------Genre routes------
//GET (read) genres
app.get("/api/genres", function (req, res) {
    Genre.getGenres(function (err, genres) {
        if(err){
            throw err;
        }
        res.json(genres);
    });
});

//POST (create) genres
app.post("/api/genres", function (req, res) {
    var genre = req.body;
    Genre.addGenre(genre, function (err, genre) {
        if(err){
            throw err;
        }
        res.json(genre);
    });
});

//PUT (update) genres
app.put("/api/genres/:_id", function (req, res) {
    var id = req.params._id;
    var genre = req.body;
    Genre.updateGenre(id, genre, {}, function (err, genre) {
        if(err){
            throw err;
        }
        res.json(genre);
    });
});

//DELETE genres
app.delete("/api/genres/:_id", function (req, res) {
    var id = req.params._id;
    var genre = req.body;
    Genre.deleteGenre(id, function (err, genre) {
        if(err){
            throw err;
        }
        res.json(genre);
    });
});



//------Book routes------
//GET books
app.get("/api/books", function (req, res) {
    Book.getBooks(function (err, books) {
        if(err){
            throw err;
        }
        res.json(books);
    });
});

//Get by id
app.get("/api/books/:_id", function (req, res) {

    var id = req.params._id;
    Book.getBookById(id, function (err, book) {
        if(err){
            throw err;
        }
        res.json(book);
    });
});

//POST (create) books
app.post("/api/books", function (req, res) {
    var book = req.body;
    Book.addBook(book, function (err, book) {
        if(err){
            throw err;
        }
        res.json(book);
    });
});

//PUT (update) book
app.put("/api/books/:_id", function (req, res) {
    var id = req.params._id;
    var book = req.body;
    Book.updateBook(id, book, {}, function (err, book) {
        if(err){
            throw err;
        }
        res.json(book);
    });
});

//DELETE book
app.delete("/api/books/:_id", function (req, res) {
    var id = req.params._id;
    var book = req.body;
    Book.deleteBook(id, function (err, book) {
        if(err){
            throw err;
        }
        res.json(book);
    });
});




app.listen(3000);
console.log("Running on port 3000!!!")