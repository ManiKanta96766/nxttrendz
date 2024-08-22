import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    //   TODO: Update the code here to implement addCartItem
    this.setState(prevState => {
      const {cartList} = prevState
      console.log(cartList)
      let count = false
      const updateCartList = cartList.map(item => {
        if (item.id === product.id) {
          count = true
          return {
            ...item,
            quantity: item.quantity + 1,
          }
        }
        return item
      })
      if (count) {
        return {
          cartList: updateCartList,
        }
      }
      return {
        cartList: [...cartList, product],
      }
    })
  }

  removeAllCartItems = () => {
    this.setState({
      cartList: [],
    })
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updateCartList = cartList.filter(item => item.id !== id)
    this.setState({
      cartList: updateCartList,
    })
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updateCartList = cartList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        }
        return item
      }
    })
    this.setState({
      cartList: updateCartList,
    })
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    let count = false
    let updateCartList = cartList.map(item => {
      if (item.id === id) {
        if (item.quantity === 1) {
          count = true
          return item
        }
        return {
          ...item,
          quantity: item.quantity - 1,
        }
        return item
      }
    })
    if (count) {
      updateCartList = updateCartList.filter(item => item.id !== id)
    }
    this.setState({
      cartList: updateCartList,
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
