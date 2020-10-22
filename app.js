const express = require('express');

const app = express();

const port = process.env.PORT || 3000; 

app.use(express.json());

const contentRoute = require('./src/routes/content');

app.use('/api', contentRoute);

app.listen(port, ()=>{
  console.log('Server running in port: ' + port);
});