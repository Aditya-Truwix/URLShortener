const express = require('express');
const app = express();
const PORT = 8000;
const urlRoute = require('./routes/url_route');
const userRoute = require('./routes/user_route');
const {connectMongoDB} = require('./connect');

connectMongoDB("mongodb+srv://btech1020920:cWby8UZU1c4Zkmv1@cluster0.19scr.mongodb.net/")
.then(() => {
    console.log("MongoDB connected !!");
})
.catch((err) => {
    console.log("Error while connecting MongoDB", err);
})
app.use(express.json());
app.use('/url',urlRoute);
app.use('/user',userRoute);
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

