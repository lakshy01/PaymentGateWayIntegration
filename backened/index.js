
const cors = require('cors');
const express = require('express');
const stripe = require("stripe")("sk_test_51GzJysCi4iDK6EhZLTlHbo9KqfrQ4XNUx90eAmFLcz9xIptKVfSWFp9ta6dv6l8U0nTjowVXNDnxhouq9XvHtxRu00oionwEH2");
const uuid = require("uuid/v4");

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Worked!!!');
})

app.post('/payement', (req, res) => {

    const { product, token } = req.body;
    console.log("PRODUCTS", product);
    console.log("PRODUCT PRICE", product.price);
    const idempotencyKey = uuid();

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then((customer) => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            recipt_email: token.email,
            description: `Purchase Of ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, { idempotencyKey })
    })
        .then((result) => { res.status(200).json(result) })
        .catch((err) => { console.log(err) })

})

app.listen(8282, () => console.log("Server started at http://localhost:8282"));
