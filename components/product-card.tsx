"use client"

import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/context/product-context"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = React.useState(1)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    })
    setQuantity(1)
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group h-full rounded-lg border border-border bg-card hover:shadow-lg hover:border-accent transition-all duration-300 overflow-hidden flex flex-col">
        <div className="relative w-full h-48 bg-secondary overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2">{product.name}</h3>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">{product.description}</p>

          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{product.rating}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="m-4 w-[calc(100%-2rem)] flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium py-2 rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </Link>
  )
}

import React from "react"
