import React from 'react';

import HomeScreen from './Component/LandingPage/HomeScreen';
import CartScreen from './Component/LandingPage/CartScreen';
import ProductDetailScreen from './Component/LandingPage/ProductDetailScreen';
import CreateProductScreen from './Component/LandingPage/CreateProductScreen';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function App() {

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  }

  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  }

  document.addEventListener("click", function (evt) {
    var flyoutElement = document.getElementsByClassName('.sidebar'), targetElement = evt.target;  // clicked element

    do {
      if (targetElement === flyoutElement) {
        // This is a click inside. Do nothing, just return.
        document.querySelector('.sidebar').classList.add('open');
        return;
      }
      // Go up the DOM
      targetElement = targetElement.parentNode;
    } while (targetElement);

    // This is a click outside.
    document.querySelector('.sidebar').classList.remove('open');
  });

  return (
    <Router>

      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}> &#9776; </button>
            <Link to="/"> Aliexpress</Link>
          </div>
          <div className="header-links">
            <Link to="/cart">Cart</Link>
          </div>
        </header>

        <aside className="sidebar">
          <h3 className="sidebar-title">Shopping Category</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>X</button>
          <ul className="sidebar-ul">
            <li>
              <Link to="/">Pants</Link>
            </li>
            <li>
              <Link to="/">Shirts</Link>
            </li>
            <hr/>
            <li>
              <Link to="/create-product">Create Product</Link>
            </li>
          </ul>
        </aside>

        <main className="main">
          <div className="content">
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route exact path="/cart/:id?" component={CartScreen}/>
              <Route exact path="/products/:id" component={ProductDetailScreen} />
              <Route exact path="/create-product" component={CreateProductScreen}/>
            </Switch>
          </div>
        </main>

        <footer className="footer"> All Right Reserved.</footer>
      </div>
    </Router>
  );
}

export default App;
