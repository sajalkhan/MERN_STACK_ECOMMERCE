import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../Layout/CheckoutSteps';
import { createOrder } from '../../Action/orderAction';

function PlaceOrderScreen(props) {

    const cart = useSelector(state => state.CartReducer);
    const orderCreate = useSelector(state => state.orderCreateReducer);
    const { success, order } = orderCreate;

    const { cartItems, shipping, payment } = cart;
    if (!shipping.address) {
        props.history.push("/shipping");
    } else if (!payment.paymentMethod) {
        props.history.push("/payment");
    }

    const itemsPrice = cartItems.reduce((a, c) => a + c.price*1 * c.quentity*1, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const dispatch = useDispatch();

    const placeOrderHandler = () => {
        // create an order
        // console.log('test--', cartItems)
        dispatch(createOrder({
            orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
            taxPrice, totalPrice
        }));
    }
    useEffect(() => {
        if (success) {
            props.history.push("/order/" + order._id);
        }

    }, [success]);

    return <div>
        <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
        <div className="placeorder">
            <div className="placeorder-info">
                <div>
                    <h3> Shipping </h3>
                    <div>
                        {cart.shipping.address}, {cart.shipping.city},
                        {cart.shipping.postalCode}, {cart.shipping.country},
                    </div>
                </div>
                <div>
                    <h3>Payment</h3>
                    <div>
                        Payment Method: {cart.payment.paymentMethod}
                    </div>
                </div>
                <div>
                    <ul className="cart-list-container">
                        <li>
                            <h3> Shopping Cart</h3>
                            <div> Price </div>
                        </li>
                        {
                            cartItems.length === 0 ?
                                <div> Cart is empty </div>
                                :
                                cartItems.map(item =>
                                    <li key={item._id}>
                                        <div className="cart-image">
                                            <img src={process.env.PUBLIC_URL + '/images/' + item.image} alt="product" />
                                        </div>
                                        <div className="cart-name">
                                            <div>
                                                <Link to={"/product/" + item._id}>
                                                    {item.name}
                                                </Link>

                                            </div>
                                            <div>
                                                Qty: {item.quentity}
                                            </div>
                                        </div>
                                        <div className="cart-price">
                                            ${item.price}
                                        </div>
                                    </li>
                                )
                        }
                    </ul>
                </div>


            </div>
            <div className="placeorder-action">
                <ul>
                    <li>
                        <button className="button primary full-width" onClick={placeOrderHandler} >Place Order</button>
                    </li>
                    <li>
                        <h3>Order Summary</h3>
                    </li>
                    <li>
                        <div>Items</div>
                        <div>${itemsPrice}</div>
                    </li>
                    <li>
                        <div>Shipping</div>
                        <div>${shippingPrice}</div>
                    </li>
                    <li>
                        <div>Tax</div>
                        <div>${taxPrice}</div>
                    </li>
                    <li>
                        <div>Order Total</div>
                        <div>${totalPrice}</div>
                    </li>
                </ul>



            </div>

        </div>
    </div>

}

export default PlaceOrderScreen;