const mongoose = require('mongoose');
const config = require('dotenv');

config.config();

const MONGO_ATLAS_PASSWORD = process.env.MONGO_DB_PASSWORD;
const MONGO_ATLAS_USERNAME = process.env.MONGO_DB_USERNAME;


exports.connect = () => {
    mongoose.connect(
        `mongodb+srv://${MONGO_ATLAS_USERNAME}:${MONGO_ATLAS_PASSWORD}@freelance.6gwcm.mongodb.net/node-angular?retryWrites=true&w=majority`, { promiseLibrary: require('bluebird'), useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
    ).then(() => {
        console.log('Connected Successfully to the Database!');
    }).catch(error => {
        console.log('Connection Failed! : ' + error);
    });
};