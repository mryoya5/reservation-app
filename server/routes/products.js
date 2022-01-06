const express = require("express")
const router = express.Router()
const Product = require("../model/product")

router.get("", function(req, res){
    Product.find({}, function(err, foundProducts){
        res.json(foundProducts)
    })
})

router.get("/:productId", function(req, res){
    const productId = req.params.productId
    Product.findById(productId, function(err, foundProduct){
        if(err){
            console.log("error")
            return res.status(422).send({errors: [{title: "Products error", detail: "Product not found"}]})
        }
        console.log(err)
        console.log("not error")
        return res.json(foundProduct)
    })
})

module.exports = router