import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { useState } from 'react';

const Header = ({ auth: { isAuthenticated, user } }) => {

    const [state, setState] = useState(
        {
            sidebarState: 'sidebarClose'
        }
    )
    const openMenu = () => {
        setState({ sidebarState: 'sidebarOpen' })
    }

    const closeMenu = () => {
        setState({ sidebarState: 'sidebarClose' })
    }

    return (
        <Fragment>
            <header className="header">
                <div className="brand">
                    <button onClick={openMenu}> &#9776; </button>
                    <Link to="/"> Aliexpress</Link>
                </div>
                <div className="header-links">
                    <Link to="/cart">Cart</Link>
                    {
                        isAuthenticated ? <Link to="/profile">{user && user.name}</Link> :
                            <Link to="/signin">Sign In</Link>
                    }

                    {isAuthenticated && user.isAdmin && (
                        <div className="dropdown">
                            <Link to="#"  >Admin</Link>
                            <div className="dropdown-content">
                                <Link to="/orders">Orders</Link>
                                <Link to="/create-product">Products</Link>
                            </div>
                        </div>
                    )}

                </div>
            </header>

            <aside className={state.sidebarState}>
                <h3 className="sidebar-title">Shopping Category</h3>
                <button className="sidebar-close-button" onClick={closeMenu}>X</button>
                <ul className="sidebar-ul">
                    <li>
                        <Link to="/">Pants</Link>
                    </li>
                    <li>
                        <Link to="/">Shirts</Link>
                    </li>
                </ul>
            </aside>
        </Fragment>
    )
}


const mapStateToProps = (state) => {
    return {
        auth: state.loginRegisterState
    }
}

export default connect(mapStateToProps, null)(Header);