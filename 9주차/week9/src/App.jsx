import { useState } from 'react'
import products from './data/products'
import Header from './components/Header'
import CategoryFilter from './components/CategoryFilter'
import ProductList from './components/ProductList'
import CartPanel from './components/CartPanel'
import useCartStore from './store/cartStore'

function App() {
  const [cart, setCart] = useState([]) 
  const [selectedCategory, setSelectedCategory] = useState('전체')

  const { addToCart, increase, decrease, removeFromCart, getCartItems, getTotalCount, getTotalPrice, getFilteredProducts } = useCartStore()

  const cartItems = useCartStore.getState().getCartItems(useCartStore.getState().cart)
  const totalCount = useCartStore.getState().getTotalCount(cartItems)
  const totalPrice = useCartStore.getState().getTotalPrice(cartItems)
  const filteredProducts = useCartStore.getState().getFilteredProducts(selectedCategory)

  return (
    <div className="app">
      <Header totalCount={totalCount} totalPrice={totalPrice} />

      <div className="app__body">
        <main className="app__main">
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
          <ProductList products={filteredProducts} onAddToCart={addToCart} />
        </main>

        <CartPanel
          items={cartItems}
          totalPrice={totalPrice}
          onIncrease={increase}
          onDecrease={decrease}
          onRemove={removeFromCart}
        />
      </div>
    </div>
  )
}

export default App