import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../../Action/cartAction';

//Redux 
import { connect } from 'react-redux';

const CartScreen = ({ addToCart, removeFromCart, cart:{cartItems}, match, location }) => {

    const productId = match.params.id;
    const Qty = location.search ? Number(location.search.split("=")[1]) : 1;

    useEffect(() => {
        if (productId) addToCart(productId, Qty);
    }, [productId, Qty]);

    const removeFromCartHandler = (productId) => {
        removeFromCart(productId);
    }

    return (
        <div className="cart">
            <div className="cart-list">
                <ul className="cart-list-container">
                    <li>
                        <h3> Shopping Cart </h3>
                        <div> Price </div>
                    </li>
                    {
                        cartItems.length === 0 ?
                            <div>Cart is empty</div>
                            :
                            cartItems.map(item =>
                                <li key={item.id}>
                                    <div className="cart-image">
                                        <img src={process.env.PUBLIC_URL + '/images/' + item.image} alt="product" />
                                    </div>
                                    <div className="cart-name">
                                        <div>
                                            <Link to={"/products/" + item.id}>
                                                {item.name}
                                            </Link>

                                        </div>
                                        <div>
                                            Qty:
                                            <select value={item.quentity} onChange={(e) => addToCart(item.id, e.target.value)}>
                                                {[...Array(item.inStock).keys()].map(x =>
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                )}
                                            </select>
                                            <button type="button" className="button" onClick={() => removeFromCartHandler(item.id)} >
                                                Delete
                                            </button>
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
            <div className="cart-action">
                <h3>
                    Subtotal ( {cartItems.reduce((a, c) => a + c.quentity*1, 0)} items) : ${cartItems.reduce((a, c) => a + c.price * c.quentity, 0)}
                </h3>
                <button className="button primary full-width" disabled={cartItems.length === 0}> Proceed to Checkout </button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.CartReducer
    }
}
export default connect(mapStateToProps, { addToCart, removeFromCart })(CartScreen);