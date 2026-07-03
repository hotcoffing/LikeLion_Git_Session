import React, { useState, useMemo } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { fetchProducts } from './api/products'
import { useCreateOrder } from './api/CUD'
import Header from './components/Header'
import CategoryFilter from './components/CategoryFilter'
import ProductList from './components/ProductList'
import CartPanel from './components/CartPanel'
import useCartStore from './store/cartStore'
import './App.scss'

// 재렌더링 방지를 위해 최상위 컴포넌트에서 QueryClient를 생성
const queryClient = new QueryClient();

// QueryClientProvider 하위 컴포넌트에서 사용하기 위해 함수로 분리
// 바로 하위 컴포넌트만 인식하기 떄문에 새로운 하나의 컴포넌트로 분리
function AppContent() {
    // isLoading, isError, error은 useQuery에서 기본적으로 제공하는 상태
  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  if (isLoading) return <div>로딩 중...</div>
  if (isError) return <div>에러 발생: {error.message}</div>

  return (
    <div className="app">
      <CartHeader products={products} />
      <div className="app__body">
        <main className="app__main">
          <ProductArea products={products} />
        </main>
        <CartArea products={products} />
      </div>
    </div>
  )
}

// 헤더 부분 분리
function CartHeader({ products }) {
  const cart = useCartStore((state) => state.cart)
  const { totalCount, totalPrice } = useMemo(() => {
    const cartItems = cart.map((item) => {
      const product = products.find((p) => p.id === item.id)
      return { ...product, quantity: item.quantity }
    })
    return {
      totalCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }
  }, [cart, products])
  return <Header totalCount={totalCount} totalPrice={totalPrice} />
}

const MemoizedCategoryFilter = React.memo(CategoryFilter)

// 상품 부분 분리
function ProductArea({ products }) {
  const addToCart = useCartStore((state) => state.addToCart)
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const filteredProducts = useMemo(
    () =>
      selectedCategory === '전체'
        ? products
        : products.filter((p) => p.category === selectedCategory),
    [products, selectedCategory]
  )
  return (
    <>
      <MemoizedCategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      <ProductList products={filteredProducts} onAddToCart={addToCart} />
    </>
  )
}

// 장바구니 부분 분리
function CartArea({ products }) {
  const cart = useCartStore((state) => state.cart)
  const increase = useCartStore((state) => state.increase)
  const decrease = useCartStore((state) => state.decrease)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const createOrderMutation = useCreateOrder()
  const cartItems = useMemo(
    () =>
      cart.map((item) => {
        const product = products.find((p) => p.id === item.id)
        return { ...product, quantity: item.quantity }
      }),
    [cart, products]
  )
  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  )
  return (
    <CartPanel
      items={cartItems}
      totalPrice={totalPrice}
      onIncrease={increase}
      onDecrease={decrease}
      onRemove={removeFromCart}
      // Mutation 함수는 .mutate()를 호출하여 실행해야 함
      onOrder={createOrderMutation.mutate}
    />
  )
}

function App() {
  return (
    // 바로 하위 컴포넌트의 상태 데이터를 캐싱 및 동기화
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  )
}

export default App