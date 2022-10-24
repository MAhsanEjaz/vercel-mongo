const experss = require('express');
const post = require('../models/post');

const app = experss.Router();

app.post('', (req, res)=>{

    const data = post({

        name: req.body.name,
        address: req.body.address


    })

    data.save().then(myData=>{
        res.json(myData);
    })


})


app.get('',async(req, res)=>{
    const data = await post.find();
    res.json(data);
} )


module.exports = app;