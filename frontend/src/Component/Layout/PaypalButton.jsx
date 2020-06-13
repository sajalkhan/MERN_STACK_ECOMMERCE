import React from 'react';
import { useSelector } from 'react-redux';

function PaypalButton(props) {
    
    const cart = useSelector(state => state.CartReducer);
    const { cartItems } = cart;

    const itemsPrice = cartItems.reduce((a, c) => a + c.price * 1 * c.quentity * 1, 0);
    // const shippingPrice = itemsPrice > 100 ? 0 : 10;
    // const taxPrice = 0.15 * itemsPrice;
    // const totalPrice = itemsPrice + shippingPrice + taxPrice;


    return (
        <form class="pp" action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post">
            <input type="hidden" name="cmd" value="_cart" />
            <input type="hidden" name="upload" value="1" />
            <input type="hidden" name="business" value="jultranet-facilitator@gmail.com" />

            <input type="hidden" name={cartItems.name} value="<%= p.title %>"/>
            <input type="hidden" name="amount" value={itemsPrice} />
            <input type="hidden" name="quantity" value={cartItems.quentity} />

            <input type="hidden" name="currency_code" value="USD" />
            <input type="hidden" name="amount" value={props.amount} />
            <input type="image" className="button primary full-width" 
                src="https://i.ya-webdesign.com/images/paypal-buy-now-button-png-14.png" name="submit" alt="Make payments with PayPal - it's fast, free and secure!" />
        </form>
    )
}

export default PaypalButton;