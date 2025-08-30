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
    {
    req.envelope = found;
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
    {const foundIndex = envelopesData.findIndex((x) => {return Number(req.params.id) === x.id});
        envelopesData[foundIndex].budget = req.body.budget;
        envelopesData[foundIndex].title = req.body.title;
        res.send(envelopesData[foundIndex]);}
});

// Special route for updating budget
envelopeRouter.put('/:id/:budgetUpdate', (req,res,next) => {
    const foundIndex = envelopesData.findIndex((x) => {return Number(req.params.id) === x.id});
    const currentBudget = envelopesData[foundIndex].budget
        
    if (Number(currentBudget) >= Number(req.params.budgetUpdate))
    {envelopesData[foundIndex].budget = Number(currentBudget) - Number(req.params.budgetUpdate) 
    res.send(envelopesData[foundIndex]);}
    else {throw new Error('Amount more than budget')}
});

// Delete Specific Envelope
envelopeRouter.delete('/:id', (req,res,next) => {
    const foundIndex = envelopesData.findIndex((x) => {return Number(req.params.id) === x.id});
    removedEnvelope = envelopesData[foundIndex]
    envelopesData.splice(foundIndex,1);
    res.send(removedEnvelope)
})

// Transfer route
envelopeRouter.get('/transfer/:transferFrom/:transferTo', (req,res,next) => {
    const transferFromIndex = envelopesData.findIndex((x) => {return Number(req.params.transferFrom) === x.id})
    const transfertoIndex = envelopesData.findIndex((x) => {return Number(req.params.transferTo) === x.id})
   
    
    envelopesData[transferFromIndex].budget -= req.body.amount
    envelopesData[transfertoIndex].budget += req.body.amount

    res.status(201).send(envelopesData[transferFromIndex])
}) 