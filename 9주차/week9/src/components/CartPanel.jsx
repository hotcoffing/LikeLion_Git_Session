import CartItem from './CartItem'
import React, { useCallback } from 'react'

const MemoizedCartItem = React.memo(CartItem)

function CartPanel({ items, totalPrice, onIncrease, onDecrease, onRemove, onOrder }) {
  const memoziedOnIncrease = useCallback((item) => {
    onIncrease(item)
  }, [onIncrease])

  const memoziedOnDecrease = useCallback((item) => {
    onDecrease(item)
  }, [onDecrease])

  // 카테고리별 합계 계산
  const categoryTotals = useMemo(() => {
    return items.reduce((acc, item) => {
      const amount = item.price * item.quantity
      acc[item.category] = (acc[item.category] || 0) + amount
      return acc
    }, {})
  }, [items])

  return (
    <aside className="cart-panel">
      <h2>장바구니</h2>

      {items.length === 0 ? (
        <p className="empty">장바구니가 비어 있어요.</p>
      ) : (
        <ul className="cart-list">
          {items.map((item) => (
            <MemoizedCartItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              emoji={item.emoji}
              quantity={item.quantity}
              onIncrease={memoziedOnIncrease}
              onDecrease={memoziedOnDecrease}
              onRemove={onRemove}
            />
          ))}
        </ul>
      )}

      {/* 카테고리별 합계 표시 */}
      {items.length > 0 && (
        <div className="cart-panel__category-totals">
          <h3>카테고리별 합계</h3>
          <ul>
            {Object.entries(categoryTotals).map(([category, price]) => (
              <li key={category}>
                <span>{category}</span>
                <strong>{price.toLocaleString()}원</strong>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="cart-panel__total">
        <span>총 합계</span>
        <strong>{totalPrice.toLocaleString()}원</strong>
      </div>

      <button className="checkout-btn" disabled={items.length === 0} onClick={onOrder}>
        주문하기
      </button>
    </aside>
  )
}

export default CartPanel