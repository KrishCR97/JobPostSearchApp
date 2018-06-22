var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
mongoose.Promise = require('q').Promise;
const bodyParser = require('body-parser');

app.use(cors({
    origin: "http://127.0.0.1:5500"
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var user_schema = mongoose.Schema({
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phoneNum: Number,
    location: String,
    userType: String
});

var user_model = mongoose.model('users', user_schema);

app.listen(4000, () => {
    console.log("Server running @ 4000");
    mongoose.connect("mongodb://localhost:27017/job")
    var db = mongoose.connection;

    db.on('open', () => {
        console.log('Connected with database')
    })
    db.on('error', () => {
        console.log('Error in  connecting with the database')
    })
});

app.get('/', (req, res) => {
    res.send({ "name": "Kishon" });
});

app.post('/saveUser', (req, res) => {
    var userToSave = new user_model(req.body);
    userToSave.save((err, doc) => {
        if (err) {
            console.log("Cannot insert new user into the database");
            res.send({ savedUser: false })
        }
        else {
            console.log(doc);
            res.send({ savedUser: true })
        }
    });
});

app.post('/checkLogin', (req, res) => {
    user_model.find({ userName: req.body.userName, password: req.body.password }, (err, doc) => {
        if (doc.length == 0) {
            res.send({ validUser: false });
            console.log("HEhe");
        }
        else {
            console.log({ validUser: true , userType : doc[0].userType});
            res.send({ validUser: true , userType : doc[0].userType});
        }
    });
});
