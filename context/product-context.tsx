"use client"

import type React from "react"
import { createContext, useContext, useState, useMemo } from "react"

export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  description: string
  rating: number
  inStock: boolean
}

interface ProductContextType {
  products: Product[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  filteredProducts: Product[]
  categories: string[]
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones Pro",
    price: 199.99,
    image: "/wireless-headphones.png",
    category: "Electronics",
    description: "Premium wireless headphones with noise cancellation and 30-hour battery",
    rating: 4.8,
    inStock: true,
  },
  {
    id: "2",
    name: "Smart Watch Ultra",
    price: 349.99,
    image: "/smartwatch-lifestyle.png",
    category: "Wearables",
    description: "Advanced fitness tracking and health monitoring smartwatch",
    rating: 4.6,
    inStock: true,
  },
  {
    id: "3",
    name: "USB-C Fast Charger",
    price: 49.99,
    image: "/usb-charger.jpg",
    category: "Accessories",
    description: "65W ultra-fast charging for laptops and smartphones",
    rating: 4.5,
    inStock: true,
  },
  {
    id: "4",
    name: "Mechanical Keyboard",
    price: 159.99,
    image: "/mechanical-keyboard.png",
    category: "Electronics",
    description: "Premium mechanical keyboard with RGB lighting and custom switches",
    rating: 4.7,
    inStock: true,
  },
  {
    id: "5",
    name: "4K Webcam",
    price: 129.99,
    image: "/4k-webcam.png",
    category: "Electronics",
    description: "Crystal clear 4K video for streaming and video calls",
    rating: 4.4,
    inStock: true,
  },
  {
    id: "6",
    name: "Phone Stand Pro",
    price: 29.99,
    image: "/phone-stand.jpg",
    category: "Accessories",
    description: "Adjustable aluminum phone stand for all devices",
    rating: 4.3,
    inStock: true,
  },
  {
    id: "7",
    name: "Portable SSD 1TB",
    price: 99.99,
    image: "/portable-ssd.jpg",
    category: "Storage",
    description: "Fast and compact 1TB external solid state drive",
    rating: 4.9,
    inStock: true,
  },
  {
    id: "8",
    name: "Laptop Stand",
    price: 39.99,
    image: "/laptop-stand.png",
    category: "Accessories",
    description: "Ergonomic laptop stand for better posture",
    rating: 4.2,
    inStock: false,
  },
]

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", ...new Set(PRODUCTS.map((p) => p.category))]

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  return (
    <ProductContext.Provider
      value={{
        products: PRODUCTS,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        filteredProducts,
        categories,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within ProductProvider")
  }
  return context
}
