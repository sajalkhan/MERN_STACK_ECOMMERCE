import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { listMyOrders } from '../../Action/orderAction';
import { updateUserProfile, logOut } from '../../Action/loginRegisterAction';


function ProfileScreen({ updateUserProfile, 
    listMyOrders, 
    logOut, 
    auth: { user, loading }, 
    history, 
    myOrderList: { loading: loadingOrders, orders, error: errorOrders} }) {

    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    useEffect(() => {

        listMyOrders();
        if (user) {
            setFormData({
                name: loading || !user.name ? '' : user.name,
                email: loading || !user.email ? '' : user.email,
                password: loading || !user.password ? '' : user.password
            });
        }
    },[user]);

    const { name, email, password } = formData;

    const handleFormData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleLogout = () => {
        logOut();
        history.push("/signin");
    }

    const submitFormData = (e) => {
        e.preventDefault();
        updateUserProfile(formData);
        history.push("/signin");
    }

    return <div className="profile">
        <div className="profile-info">
            <div className="form">
                <form onSubmit={submitFormData} >
                    <ul className="form-container">
                        <li>
                            <h2>User Profile</h2>
                        </li>
                        <li>
                            <label htmlFor="name">
                                Name
                            </label>
                            <input type="name" name="name" value={name} onChange={(e) => handleFormData(e)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="email">
                                Email
                            </label>
                            <input type="email" name="email" value={email} onChange={(e) => handleFormData(e)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={password} onChange={(e) => handleFormData(e)}>
                            </input>
                        </li>

                        <li>
                            <button type="submit" className="button primary">Update</button>
                        </li>
                        <li>
                            <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button>
                        </li>

                    </ul>
                </form>
            </div>
        </div>
        <div className="profile-orders content-margined">
            {
                loadingOrders ? <div>Loading...</div> :
                    errorOrders ? <div>{errorOrders} </div> :
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid.toString()}</td>
                                    <td>
                                        <Link to={"/order/" + order._id}>DETAILS</Link>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
            }
        </div>
    </div>
}


const mapStateToProps = (state) => {
    return {
        auth: state.loginRegisterState,
        myOrderList: state.myOrderListReducer
    }
}


export default connect(mapStateToProps, { updateUserProfile, logOut, listMyOrders })(ProfileScreen);