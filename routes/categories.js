const express = require('express');
const router = express.Router();
const path = require("path");
const category = require(path.join(__dirname,'../model/Category.js'));
const product = require(path.join(__dirname,'../model/Product.js'));


router.get('/new', (req, res) => {
    res.render('categoryForm.pug', {title:'Créer un rayon'});
});

router.get('/', async (req, res) => {
    res.render('categories.pug', {categories: await category.getAll(), title: 'Rayons'});
});

router.get('/:id', async(req, res) => {
    let cate = await category.getById(req.params.id)
    res.render('category.pug', {products:await product.getByCategory(req.params.id), title:'Produits du rayon ' + cate[0].name});
});

router.get('/:id/update', (req, res) => {
    res.render('categoryUpdate.pug', {title:'Modifier ' + category.getById(req.params.id).name});
});

router.get('/:id/delete', (req, res) => {
    res.render('delete.pug', {item:category.getById(req.params.id)});
});

router.post('/new', async(req, res) => {
    await category.insert(req.body.name);
    res.render('categoryForm.pug', {title:'Créer un rayon'});
});

module.exports = router;