import ProductCart from './ProductCart'
import React, { useCallback } from 'react'

const MemoizedProductCart = React.memo(ProductCart)

function ProductList({ products, onAddToCart }) {
  if (products.length === 0) {
    return <p className="empty">해당 카테고리에 상품이 없어요.</p>
  }

  const memoziedOnAddToCart = useCallback((productId) => {
    onAddToCart(productId)
  }, [onAddToCart])

  return (
    <div className="product-grid">
      {products.map((product) => (
        <MemoizedProductCart key={product.id} product={product} onAddToCart={memoziedOnAddToCart} />
      ))}
    </div>
  )
}

export default ProductList