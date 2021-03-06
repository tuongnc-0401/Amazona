import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Products from './components/Products/Products'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import useStyles from './styles'
import ProductDetail from './components/Products/Product/ProductDetail/ProductDetail';
import Cart from './components/Cart/Cart';
import SignIn from './components/Signin/Signin';
import Register from './components/Register/Register';
import Shipping from './components/Shipping/Shipping';
import Payment from './components/Payment/Payment';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';
import UserProfile from './components/Profile/UserProfile/UserProfile';
import OrderDetails from './components/OrderDetails/OrderDetails';
import OrderHistory from './components/Profile/OrderHistory/OrderHistory';
const App = () => {
  const classes = useStyles();
  return (
    <div>
      <Router>
        <Navbar></Navbar>
        <div className={classes.toolbar}></div>

        <Switch>
          <Route path='/products' exact component={Products}></Route>
          <Route path='/product/:id' component={ProductDetail}></Route>
          <Route path='/signin' component={SignIn}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/cart' component={Cart}></Route>
          <Route path='/shipping' component={Shipping}></Route>
          <Route path='/payment' component={Payment}></Route>
          <Route path='/placeorder' component={PlaceOrder}></Route>
          <Route path='/userprofile' component={UserProfile}></Route>
          <Route path='/orderhistory' component={OrderHistory}></Route>
          <Route path='/order/:id' component={OrderDetails}></Route>

        </Switch>


      </Router>
    </div>
  )
}

export default App

