const express = require('express');
const bodyParser = require('body-parser');
const config = require('dotenv');
const cors = require('cors');

const userRoutes = require("./routes/user");
const jobRoutes = require("./routes/job");
const mongodb = require('./utils/mongodb');

config.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongodb.connect();

// app.use((req,res,next) => {
//   res.setHeader('Access-Control-Allow-Origin','http://localhost:4200/');
//   res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS')
//   next();
// });

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.use("/api/user", userRoutes);
app.use("/api/job", jobRoutes);

app.get('/', function(req, res) {
    res.send("hello");
})
module.exports = app;