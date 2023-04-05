import express from 'express';
import { Receipt } from './types/Receipt.js';
import { calcPoints } from './utils/utils.js';
import { v4 as uuid } from 'uuid';
import { is } from 'typia';


const app = express();
const port = 3000; 

// Using built-in json middleware 
app.use(express.json())

// Id : Receipt map 
let map = new Map<string, Receipt>(); 

// POST /receipts/process 
app.post('/receipts/process', (req, res) => {
    let receipt: Receipt = req.body
    if (!is<Receipt>(receipt)) { 
        // Incorrect type 
        res.status(400).send("The receipt is invalid")
    } 
    // Tokenize receipt with uuid 
    let id: string = uuid();
    map.set(id, receipt)

    // Send response 
    res.status(200).send({
        "id": id
    })
})

// GET /receipts/{id}/points
app.get('/receipts/:id/points', (req, res) => {
    let id: string = req.params.id

    // Get receipt associated with id in path params 
    let receipt = map.get(id); 
    if (receipt == undefined) { // If no receipt found, throw 400 error 
        res.status(400).send("No receipt found for that id")
    } 

    // Send response 
    res.status(200).send({
        "points": calcPoints(receipt!)
    })
})

app.listen(port, () => {
    console.log(`Success`)
} )