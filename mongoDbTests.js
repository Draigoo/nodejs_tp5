const { MongoClient, ObjectId} = require('mongodb');

const args = process.argv.slice(2);
const url = args[0] ?? 'mongodb://127.0.0.1:27017';
const dbName = args[1] ?? "isen_drive";
const client = new MongoClient(url);

async function getCategories() {
    await client.connect();
    const db = client.db(dbName);
    const categoriesCollection = db.collection('categories');
    const productsCollection = db.collection('products');
    let categories = await categoriesCollection.find().toArray();

    let category_id = [];
    categories.forEach(category => {category_id.push(category._id.toString());})
    let products;
    for(const category of category_id){

        products = await productsCollection.countDocuments({categoryId : new ObjectId((category))})
        await categoriesCollection.updateOne({_id: new ObjectId(category)}, {$set: {'size': products}})
    }


    return categoriesCollection.find().toArray();
}

getCategories()
    .then(console.log)
    .catch(console.error)
