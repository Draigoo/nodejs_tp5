const Product = require("./Product.js")
const { MongoClient, ObjectId} = require('mongodb');

const args = process.argv.slice(2);
const url = args[0] ?? 'mongodb://127.0.0.1:27017';
const dbName = args[1] ?? "isen_drive";
const client = new MongoClient(url);


const Category = {

    getById : async function(categoryId){
        await client.connect();
        const db = client.db(dbName);
        const categoriesCollection = db.collection('categories');

        return categoriesCollection.find( {_id:new ObjectId((categoryId))}).toArray();
    },

    getAll : async function(){
        await client.connect();
        const db = client.db(dbName);
        const categoriesCollection = db.collection('categories');
        let categories = await categoriesCollection.find().toArray();

        return categories;
    },

    insert : async function(category){
        await client.connect();
        const db = client.db(dbName);
        const categoriesCollection = db.collection('categories');
        const doc = {
            name: category,
            size: 0
        }
        await categoriesCollection.insertOne(doc)

    }

}



module.exports = Category;
