const experss = require('express');

const mongoose = require('mongoose');

const Route = require('./routes/routes');

const bodyparser = require('body-parser');

const app = experss();


app.use(bodyparser.json());

mongoose.connect('mongodb://localhost:27017', (err)=>{

    if(!err){
        console.log('Data Connected')
    }else{
        console.log('Data not connected');
    }

})


const PORT = process.env.PORT || 4000;

app.use('/routes', Route);


app.use(experss.json())

app.listen(PORT);