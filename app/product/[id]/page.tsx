"use client"

import { Header } from "@/components/header"
import { useCart } from "@/context/cart-context"
import { useProducts } from "@/context/product-context"
import { Star, ShoppingCart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ProductDetail({ params }: { params: { id: string } }) {
  const { products } = useProducts()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl text-muted-foreground">Product not found</p>
        </div>
      </>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta))
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-secondary rounded-lg p-8 h-96">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover rounded"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                  {product.category}
                </span>

                <h1 className="text-4xl font-bold text-foreground mt-4 mb-2">{product.name}</h1>

                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-foreground">{product.rating} • Highly Rated</span>
                </div>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

                <div className="text-5xl font-bold text-primary mb-8">${product.price.toFixed(2)}</div>

                {!product.inStock && (
                  <div className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200 px-4 py-3 rounded-lg mb-6 font-medium">
                    This product is currently out of stock
                  </div>
                )}
              </div>

              {/* Add to Cart Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-secondary p-4 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 flex items-center justify-center bg-background rounded hover:bg-background/80 transition"
                  >
                    −
                  </button>
                  <span className="flex-1 text-center font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 flex items-center justify-center bg-background rounded hover:bg-background/80 transition"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-lg font-bold text-lg transition ${
                    addedToCart
                      ? "bg-green-500 text-white"
                      : "bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {addedToCart ? "Added to Cart!" : "Add to Cart"}
                </button>

                <p className="text-sm text-muted-foreground text-center">Free shipping on orders over $100</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
