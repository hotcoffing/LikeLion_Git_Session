import { useMutation, useQueryClient } from '@tanstack/react-query'
import useCartStore from '../store/cartStore'

// 주문 성공 시 장바구니 비우기
export function useCreateOrder() {
    const clearCart = useCartStore((state) => state.clearCart)
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: () => {
            console.log('주문 성공')
            clearCart()
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
    })

    return mutation
}