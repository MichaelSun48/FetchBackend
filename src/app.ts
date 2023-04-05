import express from 'express';
import { Receipt } from './types/Receipt.js';
import { calcPoints } from './utils/utils.js';
import { v4 as uuid } from 'uuid';
import { is } from 'typia';


const app = express();
const port = 3000; 

app.use(express.json())

// Id : Receipt map
let map = new Map<string, Receipt>(); 


app.post('/receipts/process', (req, res) => {
    let receipt: Receipt = req.body
    if (!is<Receipt>(receipt)) { 
        // Incorrect type 
        res.status(400).send("The receipt is invalid")
    } 
    let id: string = uuid();
    map.set(id, receipt)
    res.status(200).send(id)
})

app.get('/receipts/:id/points', (req, res) => {
    let id: string = req.params.id

    let receipt = map.get(id); 
    if (receipt == undefined) {
        res.status(400).send("No receipt found for that id")
    } 
    res.status(200).send({
        "points": calcPoints(receipt!)
    })
})

app.listen(port, () => {
    console.log(`Connected to port ${port}`)
} )