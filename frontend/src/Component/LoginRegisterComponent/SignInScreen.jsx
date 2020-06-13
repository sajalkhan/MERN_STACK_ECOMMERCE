import React, { useState } from 'react';
import { Link,Redirect } from 'react-router-dom';

//Redux connect
import { connect } from 'react-redux';
import { loginAction } from '../../Action/loginRegisterAction';

function SigninScreen({ loginAction, isAuthenticated, location }) {

    const redirect = location.search ? location.search.split("=")[1] : '/';
    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const { email, password } = state;

    const updateData = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    if (isAuthenticated) {
        return <Redirect to={redirect} />
    }

    const submitHandler = (e) => {
        e.preventDefault();
        loginAction(email, password);
    }

    return <div className="form">
        <form onSubmit={submitHandler} >
            <ul className="form-container">
                <li>
                    <h2>Sign-In</h2>
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" required value={email} id="email" onChange={(e) => updateData(e)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required value={password} onChange={(e) => updateData(e)}>
                    </input>
                </li>
                <li>
                    <button type="submit" className="button primary">Signin</button>
                </li>
                <li>
                    New to aliexpress?
                </li>
                <li>
                    <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center" >Create your aliexpress account</Link>
                </li>
            </ul>
        </form>
    </div>
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.loginRegisterState.isAuthenticated
    }
}

export default connect(mapStateToProps, { loginAction })(SigninScreen);