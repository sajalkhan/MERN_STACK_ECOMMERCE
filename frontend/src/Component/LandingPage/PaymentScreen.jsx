import React, { useState } from 'react';


import { connect } from 'react-redux';
import { savePayment } from '../../Action/cartAction';
import CheckoutSteps from '../Layout/CheckoutSteps';

function PaymentScreen({savePayment, history}) {

    const [paymentMethod, setPaymentMethod] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        savePayment({ paymentMethod });
        history.push('placeorder');
    }
    return <div>
        <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
        <div className="form">
            <form onSubmit={submitHandler} >
                <ul className="form-container">
                    <li>
                        <h2>Payment</h2>
                    </li>

                    <li>
                        <div>
                            <input type="radio" name="paymentMethod" value="paypal"
                                onChange={(e) => setPaymentMethod(e.target.value)}>
                            </input> { '  '}
                            <label htmlFor="paymentMethod" >
                                Paypal
                            </label>
                        </div>

                    </li>

                    <li>
                        <button type="submit" className="button primary">Continue</button>
                    </li>

                </ul>
            </form>
        </div>
    </div>

}

export default connect(null, { savePayment })(PaymentScreen);