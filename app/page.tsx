"use client"

import { Header } from "@/components/header"
import { SearchAndFilter } from "@/components/search-and-filter"
import { ProductCard } from "@/components/product-card"
import { useProducts } from "@/context/product-context"

export default function Home() {
  const { filteredProducts } = useProducts()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome to TechStore</h1>
            <p className="text-lg text-muted-foreground">Discover premium electronics and accessories</p>
          </div>

          <SearchAndFilter />

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No products found. Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
