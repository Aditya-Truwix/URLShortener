const express = require(`express`);
const crypto = require(`crypto`);
const app = express();
const URL = require('../models/url');
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

exports.add = async (req,res) => {
    const body = req.body;
    const nanoidd=nanoid(8);
    const currentTime = new Date().toISOString; 
    await URL.create({
        shortId:nanoidd,
        redirectURL:body.url,
        visitHistory:[],
        time:currentTime
    })
    return res.json({msg:'Successfull',id:nanoid});
}

exports.redirect_to = async (req,res) => {
    const shortId = req.params.body;
    console.log("ID : ",shortId);
    try{
        const entry = await URL.findOneAndUpdate(
            { shortId: { $exists: true } },
            { $push: { visitHistory: { timestamp: Date.now() } } },
          );
        console.log("Redirecting"+entry.redirectURL);
        console.log("Visited :"+entry.visitHistory);
        res.redirect(entry.redirectURL);
    }
    catch(error){
        console.log(error);
        return res.status(500).send("Error Occured");
    }
}

exports.analytics = async (req,res) => {
    const {id} = req.params;
    console.log(id);
    try {
        const result = await URL.findOne({shortId: id });

        console.log(result)

        if (!result) {
            return res.status(404).json({
                error: 'URL not found',
                message: 'No entry found with the provided short ID'
            });
        }
        
        return res.json({
            totalClicks : result.visitHistory.length,
            analytics: result.visitHistory
        });
    } 
    catch (error) {
        console.error('Error in analytics:', error);
        return res.status(500).json({
            error: 'An error occurred while processing your request',
            message: error.message || 'Internal server error'
        });
    }  
}

