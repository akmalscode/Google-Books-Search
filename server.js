const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3030;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/googlebooks";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Schema=mongoose.Schema;

const bookSchema=new Schema({
    title:String,
    link:String
})

const Book=mongoose.model("Book",bookSchema);

app.get('/books', function(req, res) {
    Book.find({}, function(err, books) {
        return res.json(books)
    })
})

app.post("/api/books",function(req,res){
    Book.create(req.body);
    return res.sendStatus(201);
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "./client/build/index.html"));
    });
}


app.listen(PORT);