const express = require("express");
const envelopeRouter = express.Router();
const envelopesData = require('./envelopes-data');
const bodyParser = require('body-parser');

module.exports = envelopeRouter;

// dealing with requests that have the envelope id parameter
envelopeRouter.param('id', (req,res,next,id) => 
{ 
    try {
    const found = envelopesData.find((x) => {return Number(id) === x.id});
    if (found)
    {req.envelope = found;
    next()}
    else { next(new Error('No Envelope matched the id you requested'));}
    }
    catch (err) {res.send(err)}

});

// add new envelope
envelopeRouter.post('/', (req,res,next) => {
    try
    { 
    const newTitle = req.body.title;
    const newBudget = req.body.budget;
    const newId = envelopesData.length + 1;
    
    const newEnvelope = {
        id: newId,
        title: newTitle,
        budget: newBudget
    };

    envelopesData.push(newEnvelope);
    res.status(201).send(newEnvelope)}
    
    catch (err) {
        res.status(500).send(err)
    }


});

// get all envelopes
envelopeRouter.get('/', (req,res,next) => {
    res.status(200).send(envelopesData)
})

// get single new envelope
envelopeRouter.get('/:id', (req,res,next) => {
   res.send(req.envelope)
})

// PUT request to update envelopes
envelopeRouter.put('/:id', (req,res,next) => {
   res.send(req.envelope)
})