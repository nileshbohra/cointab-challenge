import React, { useState, useEffect } from 'react';
import { Button, Typography, TextField } from '@mui/material';
import Select from 'react-select';
import './App.css'
import axios from 'axios';

function App() {
  const [twoDecimal, setTwoDecimal] = useState(0.00);
  const [courierRate, setcourierRate] = useState(0);
  const [isZero, setIsZero] = useState(false);
  const [pincodes, setPincodes] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/api/pincodes').then(res => setPincodes(res.data.pincodes)).catch(e => console.log(e));
  }, [])

  const pincodeOptions = pincodes.map(pincode => ({ label: pincode['Customer Pincode'], value: pincode.Zone + pincode['Customer Pincode'] }));
  const deliveryType = [{ label: 'Forward', value: 'Forward' }, { label: 'Forward & RTO', value: 'Forward & RTO' }]

  function setTwoNumberDecimal(event) {
    const value = event.target.value
    let num = Math.abs(parseFloat(value).toFixed(2));
    setTwoDecimal(num);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget)
    const weight = data.get('weight');
    const pincode = data.get('pincode');
    const dtype = data.get('dtype');
    //rounds the weight to multiple of 0.5
    const roundedWeight = Math.round(weight * 2) / 2; //if w=0.5 then 0.5*2 = 1 / 2 = 0.5
    //check if weight is greater than 0
    //if less than zer0 then throw error
    if (roundedWeight >= 0.5) {
      setIsZero(false);
    } else {
      setIsZero(true);
    }

    axios.post('http://localhost:3001/api/checkrate', { roundedWeight: roundedWeight, pincode: pincode, dtype: dtype })
      .then(async res => { await setcourierRate(res.data.rate) })
      .catch(e => console.log(e));


  }
  return (
    <main className='main-container'>
      <Typography component='h1' variant='h5'>COURIER CHARGES</Typography>
      <form onSubmit={handleSubmit} className='form-container'>
        <TextField
          margin="normal"
          required
          fullWidth
          type='number'
          id="weight"
          label="weight in kg"
          name="weight"
          inputProps={{ step: '.01' }}
          value={twoDecimal}
          onChange={setTwoNumberDecimal}
        />
        {isZero ? <Typography variant='h6' color='error'>weight should be at least greater or equal to 0.5</Typography> : null}
        <Select options={pincodeOptions} name='pincode' placeholder='Pincode' />
        <Select options={deliveryType} name='dtype' placeholder='Delivery Type' />
        <Button type='submit' variant='contained'>Check Price</Button>
      </form>
      <Typography variant='h5'>expected courier charge: {courierRate.toFixed(2)} </Typography>
    </main>
  );
}

export default App;
