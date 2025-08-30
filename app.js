const express = require("express");
const app = express();
const envelopeRouter = require('./envelopes-router')

app.get('/', (req,res,next) =>
    {res.send('Hello World');
    next()
}
);

app.use('/api/envelopes', envelopeRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});