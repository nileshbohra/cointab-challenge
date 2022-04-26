const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;
const rates = require('./data/rates');
const pincodes = require('./data/pincodes');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/api/pincodes', (req, res) => {
    res.json({ pincodes: pincodes });
})

app.post('/api/checkrate', (req, res) => {
    const pincode = req.body.pincode;
    const dtype = req.body.dtype;
    const roundedWeight = Number(req.body.roundedWeight);

    const rate = rates.find(rate => rate['Rate Type'] === dtype && rate.Zone === pincode.charAt(0))
    //calculate courier rate
    if (roundedWeight === 0.5) {
        res.json({ rate: rate['First 0.5 KG'] });
    } else if (roundedWeight >= 1) {
        res.json({ rate: rate['First 0.5 KG'] + ((roundedWeight / 0.5) - 1) * rate['Every Additional 0.5 KG'] });
    }
})

app.listen(port, () => {
    console.log(`server started at port ${port}`);
})