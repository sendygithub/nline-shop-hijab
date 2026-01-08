"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface CartItem {
  productId: number
  quantity: number
  size: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (productId: number) => void
  updateItem: (index: number, quantity: number, size: string) => void
  removeItem: (index: number) => void
  clearCart: () => void
  getTotalItems: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (productId: number) => {
    setItems([...items, { productId, quantity: 1, size: "" }])
  }

  const updateItem = (index: number, quantity: number, size: string) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], quantity, size }
    setItems(newItems)
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalItems = () => items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, updateItem, removeItem, clearCart, getTotalItems }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
