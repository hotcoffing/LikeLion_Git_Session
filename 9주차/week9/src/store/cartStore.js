import { create } from 'zustand'
import items from '../data/products'

const useCartStore = create((set) => ({
    cart: [],
    
    addToCart: (productId) => 
        set((state) => ({
            cart: [...state.cart, { id: productId, quantity: 1 }]
        })),
    
    increase: (productId) =>
        set((state) => ({
            cart: state.cart.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        })),
    
    decrease: (productId) =>
        set((state) => ({
            cart: state.cart.map((item) =>
                item.id === productId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
            )
        }))
        .filter((item) => item.quantity > 0),

    removeFromCart: (productId) =>
        set((state) => ({
            cart: state.cart.filter((item) => item.id !== productId)
        })),

    getCartItems: (cart) => cart.map((item) => {
        const product = items.find((p) => p.id === item.id)
        return { ...product, quantity: item.quantity }
    }),

    getTotalCount: (cartItems) => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    getTotalPrice: (cartItems) => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),

    getFilteredProducts: (selectedCategory) =>
        selectedCategory === '전체'
            ? items
            : items.filter((p) => p.category === selectedCategory)
}));

export default useCartStore