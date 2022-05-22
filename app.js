const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('dotenv');
const cors = require('cors');

const userRoutes = require("./routes/user");
const jobRoutes = require("./routes/job");

config.config();

const app = express();

const MONGO_ATLAS_PASSWORD = process.env.MONGO_DB_PASSWORD;
const MONGO_ATLAS_USERNAME = process.env.MONGO_DB_USERNAME;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect(`mongodb+srv://${MONGO_ATLAS_USERNAME}:${MONGO_ATLAS_PASSWORD}@freelance.6gwcm.mongodb.net/node-angular?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected Successfully to the Database!');
}).catch( error => {
  console.log('Connection Failed! : '+error);
});

// app.use((req,res,next) => {
//   res.setHeader('Access-Control-Allow-Origin','http://localhost:4200/');
//   res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS')
//   next();
// });

app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use("/api/user", userRoutes);
app.use("/api/job", jobRoutes);

app.get('/', function(req,res){
  res.send("hello");
})
module.exports = app;