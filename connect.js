const mongoose = require('mongoose');

async function connectMongoDB(url)
{
    return mongoose.connect(url);
}

exports.connectMongoDB = connectMongoDB;