import React, { useState } from 'react';

import {connect} from 'react-redux';

import { saveShipping } from '../../Action/cartAction';
import CheckoutSteps from '../Layout/CheckoutSteps';

function ShippingScreen({saveShipping, history}) {

    const [state, setState] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: ''
    });

    const { address, city, postalCode, country } = state;

    const updateData = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        saveShipping({ address, city, postalCode, country });
        history.push('payment');
    }

    return <div>
        <CheckoutSteps step1 step2 ></CheckoutSteps>
        <div className="form">
            <form onSubmit={submitHandler} >
                <ul className="form-container">
                    <li>
                        <h2>Shipping</h2>
                    </li>

                    <li>
                        <label htmlFor="address">
                            Address
                        </label>
                        <input type="text" name="address" value={address} onChange={(e) => updateData(e)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="city">
                            City
                        </label>
                        <input type="text" name="city" value={city} onChange={(e) => updateData(e)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="postalCode">
                            Postal Code
                        </label>
                        <input type="text" name="postalCode" value={postalCode} onChange={(e) => updateData(e)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="country">
                            Country
                        </label>
                        <input type="text" name="country" value={country} onChange={(e) => updateData(e)}>
                        </input>
                    </li>

                    <li>
                        <button type="submit" className="button primary">Continue</button>
                    </li>

                </ul>
            </form>
        </div>
    </div>

}

// const mapStateToProps = (state) => {
//     return {
//         prop: state.prop
//     }
// }

export default connect(null, { saveShipping })(ShippingScreen);