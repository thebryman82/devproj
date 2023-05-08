const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(express.json());

app.post('/create', async (req, res) => {
    const collection = client.db('mydb').collection('mycollection');
    const result = await collection.insertOne(req.body);
    res.send(result);
});

app.get('/read/:id', async (req, res) => {
    const collection = client.db('mydb').collection('mycollection');
    const result = await collection.findOne({ _id: ObjectId(req.params.id) });
    res.send(result);
});

app.put('/update/:id', async (req, res) => {
    const collection = client.db('mydb').collection('mycollection');
    const result = await collection.updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body });
    res.send(result);
});

app.delete('/delete/:id', async (req, res) => {
    const collection = client.db('mydb').collection('mycollection');
    const result = await collection.deleteOne({ _id: ObjectId(req.params.id) });
    res.send(result);
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

process.on('SIGINT', () => {
    client.close();
    console.log('MongoDB connection closed');
    process.exit();
});
