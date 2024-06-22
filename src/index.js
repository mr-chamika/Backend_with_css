const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


app.get("/getAllCurrency", async(req, res)=>{

    const nameURL = "https://openexchangerates.org/api/currencies.json?app_id=2571a2f03a6a414598503f64e9c92327"

    try{

        const nameResponse = await axios.get(nameURL);
        const names = nameResponse.data;

        return res.json(names);

    }catch(err){

        console.error(err);

    }

});

app.get("/convert",async (req,res)=>{

    const {date,sourceCurrency,tCurrency,amount} = req.query;

    try{

        const convertURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=2571a2f03a6a414598503f64e9c92327`

        const dataCurrency = await axios.get(convertURL);
        const rates = dataCurrency.data.rates;

        const tRate = rates[tCurrency];
        const sRate = rates[sourceCurrency];

        const target = (tRate/sRate)*amount;

        return res.json(target);

    }catch(err){

        console.error(err);

    }

    

});

app.listen(5000,()=>{console.log("server running")});
