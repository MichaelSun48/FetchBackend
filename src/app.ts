import express from 'express';
import { Receipt } from './Types/Receipt.js';
import { v4 as uuid } from 'uuid';
import { is } from 'typia';


const app = express();
const port = 3000; 

app.use(express.json())

// Id : Receipt map
let map = new Map<string, Receipt>(); 


app.post('/receipts/process', (req, res) => {
    let receipt = req.body
    if (!is<Receipt>(receipt)) { 
        // Incorrect type 
    } 
})

app.get('/receipts/:id/points', (req, res) => {
    let id: string = req.params.id
})

app.listen(port, () => {
    console.log(`Connected to port ${port}`)
} )