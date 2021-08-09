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
const App = () => {
  const classes = useStyles();
  return (
    <div>
      <Router>
        <Navbar></Navbar>
        <div className={classes.toolbar}></div>

        <Switch>
          <Route path='/' exact component={Products}></Route>
          <Route path='/product/:id' component={ProductDetail}></Route>
          <Route path='/cart' component={Cart}></Route>
        </Switch>


      </Router>
    </div>
  )
}

export default App

