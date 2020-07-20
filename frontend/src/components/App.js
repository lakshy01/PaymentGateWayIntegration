import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import './style.css';

const App = () => {

    const [product, setProduct] = useState({
        name: 'Fund',
        price: 10
    })


    const onMakePayment = (token) => {
        const body = {
            token,
            product
        }
        const headers = {
            "Content-Type": "application/json"
        }

        return fetch(`http://localhost:8282/payment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        })
            .then((response) => {
                console.log("RESPONSE ", response);
                const { status } = response;
                console.log("STATUS ", status);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="ui container segment back">
            <h2 id="back2">Payement Gateway</h2>
            <StripeCheckout stripeKey='pk_test_51GzJysCi4iDK6EhZf7niMaXRCUACCmc15oOsnnC2Sy7pfNi0UD7nvGQbANW8GjEK6N8VulC10OI3L74vD8equxeM00WpFmjMlh' token={onMakePayment} name="Donate" amount={product.price * 100}>
                <button className="ui button">Donate For Good</button>
            </StripeCheckout>
        </div>
    )

}

export default App;