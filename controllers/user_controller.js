const express = require('express');
const app = express();
const USER = require('../models/user');
const mongoose = require('mongoose');

exports.add = async (req,res) => {
    const {name,email,password} = req.body;
    try{
        let result = await USER.create({
            name:name,
            email:password,
            password:password
        }) 
        return res.status(201).send("User Created"+result);
    }
    catch(error){
        console.log("Error on User Addition");
        console.log(error);
    }
}