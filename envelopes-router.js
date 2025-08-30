const express = require("express");
const envelopeRouter = express.Router();
const envelopesData = require('./envelopes-data')

module.exports = envelopeRouter;


envelopeRouter.post('/', (req,res,next) => {

    try {    const title = req.body['title'];
    const budget = req.body['budget']
    const newId = envelopesData.length + 1
    const newEnvelope = {
        id: newId,
        title: title,
        budget: budget
    }
    envelopesData.push(newEnvelope);
    res.status(201).send(newEnvolope)}
    catch (err) {res.status(500).send(err)}


});