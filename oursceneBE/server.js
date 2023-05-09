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

app.get('/api/data', async (req, res) => {
    const collection = client.db('mydb').collection('mycollection');
    const result = await collection.find().toArray();
    res.send(result);
  });
  import React, { useState, useEffect } from 'react';
  import { fetchData } from './api';
  
  const App = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const getData = async () => {
        const response = await fetchData();
        setData(response);
      };
      getData();
    }, []);
  
    return (
      <div>
        <h1>Data:</h1>
        <ul>
          {data.map((item) => (
            <li key={item._id}>{item.name}: {item.value}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default App;
  