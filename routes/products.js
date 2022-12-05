const express = require('express');
const router = express.Router();
const path = require("path");
const category = require(path.join(__dirname,'../model/Category.js'));
const product = require(path.join(__dirname,'../model/Product.js'));


router.get('/new', (req, res) => {
    res.render('productForm.pug', {title:'Créer un produit', categories:category.getAll()});
});

router.get('/:id', (req, res) => {
    res.render('product.pug', {product:product.getById(req.params.id)});
});

router.get('/:id/update', (req, res) => {
    res.render('productUpdate.pug', {title: "Modification de : "+ product.getById(req.params.id).name, categories:category.getAll(), product:product.getById(req.params.id)});
});

router.get('/:id/delete', (req, res) => {
    res.render('delete.pug', {item:product.getById(req.params.id)});
});

module.exports = router;