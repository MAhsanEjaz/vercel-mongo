const experss = require('express');
const post = require('../models/post');
const multer = require('multer');
const express = require('express');
const image = require('../models/image');
const app = express.Router();

app.use(express.static('uploads'));




const storage = multer.diskStorage({
  destination: function(req, file, cb){
   cb(null, './uploads/')
  },
  filename: function(req, file, cb) {
   cb(null, Date.now() + file.originalname);
 }
});


const upload = multer({
   storage : storage, 
}).single('image');


app.post("", upload, (req, res, next) => {
  const product = new image({
    // // _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.filename
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
            // name: result.name,
            // price: result.price,
            // _id: result._id,
            request: {
                type: 'GET',
                url: "http://localhost:1000/products/" + result._id
            }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    }); });



      
  app.get("", (req, res, next) => {
    image.find()
      .select("name price _id productImage")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return {
              name: doc.name,
              price: doc.price,
              productImage: doc.productImage,
              _id: doc._id,
              request: {
                type: "GET",
                url: "http://localhost:1000/products/" + doc._id
              }
            };
          })
        };
      
        //   if (docs.length >= 0) {
        res.status(200).json(response);
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });




// app.post('', (req, res)=>{

//     const data = post({

//         name: req.body.name,
//         address: req.body.address


//     })

//     data.save().then(myData=>{
//         res.json(myData);
//     })
// })

// app.get('',async(req, res)=>{
//     const data = await post.find();
//     res.json(data);
// } )


module.exports = app;