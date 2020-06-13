import React, { useEffect } from 'react';

import Alert from './Component/Layout/Alerts';
import Header from './Component/Layout/Header';
import SignInScreen from './Component/LoginRegisterComponent/SignInScreen';
import RegisterScreen from './Component/LoginRegisterComponent/RegisterScreen';
import HomeScreen from './Component/LandingPage/HomeScreen';
import CartScreen from './Component/CartComponent/CartScreen';
import ProfileScreen from './Component/UserProfileComponent/ProfileScree';
import ShippingScreen from './Component/LandingPage/ShippingScreen';
import PaymentScreen from './Component/LandingPage/PaymentScreen';
import PlaceOrderScreen from './Component/OrderComponent/PlaceOrderScreen';
import OrdersScreen from './Component/OrderComponent/OrderScreen';
import OrderDetailsScreen from './Component/OrderComponent/OrderDetailsScreen';
import ProductDetailScreen from './Component/ProductComponent/ProductDetailScreen';
import CreateProductScreen from './Component/ProductComponent/CreateProductScreen';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { loadUser } from './Action/loginRegisterAction';
import setAuthToken from './Util/setAuthToken';
import store from './Store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="grid-container">
        <Header />
        <main className="main">
          <div className="content">
            <Alert />
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route exact path="/cart/:id?" component={CartScreen} />
              <Route path="/order/:id" component={OrderDetailsScreen} />
              <Route path="/orders" component={OrdersScreen} />
              <Route exact path="/products/:id" component={ProductDetailScreen} />
              <Route exact path="/create-product" component={CreateProductScreen} />
              <Route exact path="/shipping" component={ShippingScreen}/>
              <Route exact path="/payment" component={PaymentScreen}/>
              <Route exact path="/placeorder" component={PlaceOrderScreen} />
              <Route exact path="/signin" component={SignInScreen} />
              <Route exact path="/register" component={RegisterScreen} />
              <Route exact path="/profile" component={ProfileScreen}/>
            </Switch>
          </div>
        </main>
        <footer className="footer"> All Right Reserved.</footer>
      </div>
    </Router>
  );
}

export default App;
