function CartItem({ id, name, price, emoji, quantity, onIncrease, onDecrease, onRemove }) {
  return (
    <li className="cart-item">
      <span className="cart-item__emoji">{emoji}</span>
      <div className="cart-item__info">
        <p>{name}</p>
        <span>{price.toLocaleString()}원</span>
      </div>
      <div className="cart-item__qty">
        <button onClick={() => onDecrease(id)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => onIncrease(id)}>+</button>
      </div>
      <button className="cart-item__remove" onClick={() => onRemove(id)}>
        ✕
      </button>
    </li>
  )
}

export default CartItem
