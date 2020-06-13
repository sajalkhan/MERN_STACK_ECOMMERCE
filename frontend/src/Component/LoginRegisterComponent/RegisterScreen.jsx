import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

//Redux connect
import { connect } from 'react-redux';
import { setAlert } from '../../Action/alertAction';
import { registerAction } from '../../Action/loginRegisterAction';

function RegisterScreen({ setAlert, registerAction, isAuthenticated,location }) {

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = state;

    const updateData = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const redirect = location.search ? location.search.split("=")[1] : '/';

    if (isAuthenticated) {
        return <Redirect to={redirect} />
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('password do not match', 'danger');
        } else {
            registerAction({ name, email, password });
        }
    }

    return <div className="form">
        <form onSubmit={e => submitHandler(e)} >
            <ul className="form-container">
                <li>
                    <h2>Create Account</h2>
                </li>
                <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="text" name="name" value={name} id="name" onChange={(e) => updateData(e)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" value={email} id="email" onChange={(e) => updateData(e)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} name="password" onChange={(e) => updateData(e)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="rePassword">Re-Enter Password</label>
                    <input type="password" id="rePassword" value={password2} name="password2" onChange={(e) => updateData(e)}>
                    </input>
                </li>
                <li>
                    <button type="submit" className="button primary">Register</button>
                </li>
                <li>
                    Already have an account?
                    <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button secondary text-center" >Sign In</Link>
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

export default connect(mapStateToProps, { setAlert, registerAction })(RegisterScreen);