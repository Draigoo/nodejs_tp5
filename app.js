const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const path = require("path");
const indexRouter = require(path.join(__dirname,'routes/index.js'));
const categoriesRouter = require(path.join(__dirname,'routes/categories.js'));
const productRouter = require(path.join(__dirname,'routes/products.js'));
const bp = require('body-parser')


app.use(morgan('tiny'));
app.use(express.static("public"));
app.set('views', 'views');
app.set('view engine', 'pug');

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use("/", indexRouter);
app.use("/categories", categoriesRouter);
app.use("/products", productRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
