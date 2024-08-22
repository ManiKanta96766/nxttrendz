import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      let totalCost = 0
      for (const c of cartList) {
        totalCost += c.quantity * c.price
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button onClick={() => removeAllCartItems()}>Remove all</button>
                <CartListView />
                {/* TODO: Add your code for Cart Summary here */}
                <div>
                  <h1>Order Total: Rs{totalCost}/-</h1>
                  <p>{cartList.length} Items in cart</p>
                  <button>Checkout</button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
