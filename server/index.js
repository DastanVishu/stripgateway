require("dotenv").config();
const  http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors');
const stripe = require("stripe")("sk_test_51NzdnlSB5Vd7i9JHfMzvuEhZZssXBuWdXfdbRDltsv9RsiAQ0ZoPIqDzkaIfaCPEirB5lQzg6GsHQXeg6vEtNYeg00LpzOcb04")
// const stripe = require("stripe")("sk_test_aediX53shAzQkRvioEKu6CXV")

const app = express();
const httpServer = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({
    limit: '500mb',
    parameterLimit: 1000000,
    extended: true 
}));

app.use(bodyParser.json());


// ===========================================================

app.post("/api/ccs", async (req, res) => {
 try {
    console.log(req.body)
    // const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ["card"],
    //     line_item:[
    //         {
    //             price_data:{
    //                 currency:"inr",
    //                 product_data:{
    //                     name:"hello"
    //                 },
    //                 unit_amount:100 * 100,
    //             },
    //             quantity:4
    //         }
    //     ],
    //     mode: "payment",
    //     success_url: "http://localhost:3000/success",
    //     cancel_url: "http://localhost:3000/cancel"
    // })
    const session = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: {
          order_id: '6735',
        },
      });

    console.log(session);
    
    res.status(200).json({ 
        msg: "working now....",
        id: session.id
    });
 } catch (error) {
    res.status(400).json({ error: error });
 }
})
app.get("/api/ccs", async (req, res) => {
 try {
    res.status(200).json({ 
        msg: "working now...."
    });
 } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
 }
})

// ===========================================================

httpServer.listen( 8080 , () => {
    console.log("Server is Listening on port no.", 8080)
})
  