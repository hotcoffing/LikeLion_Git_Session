function ProductCart({ product, onAddToCart }) {
  console.log(`${product.name} 카트 렌더링됨`)

  return (
    <div className="product-cart">
      <div className="product-cart__thumb">{product.emoji}</div>
      <span className="product-cart__category">{product.category}</span>
      <h3>{product.name}</h3>
      <p className="product-cart__price">{product.price.toLocaleString()}원</p>
      <button onClick={() => onAddToCart(product.id)}>담기</button>
    </div>
  )
}

export default ProductCart