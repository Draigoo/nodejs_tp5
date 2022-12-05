const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.pug', {title:'Bienvenue à l\'ISEN Drive'});
});

module.exports = router;