"use client"

import { Heart, ShoppingCart, Star } from "lucide-react"

interface Product {
  id: number
  name: string
  category: string
  price: number
  description: string
  image: string
  rating: number
}

interface ProductCardProps {
  product: Product
  isFavorite: boolean
  onToggleFavorite: () => void
  onAddToCart: () => void
}

export default function ProductCard({ product, isFavorite, onToggleFavorite, onAddToCart }: ProductCardProps) {
  return (
    <div className="group bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-48 md:h-64 bg-muted overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Favorite Button */}
        <button
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-muted transition-colors z-10"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-primary text-primary" : "text-gray-400"}`} />
        </button>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-gray-300"}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-foreground text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

        {/* Price */}
        <div className="mb-4">
          <p className="text-lg font-bold text-primary">Rp {product.price.toLocaleString("id-ID")}</p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={onAddToCart}
          className="w-full bg-primary hover:bg-accent text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
        >
          <ShoppingCart className="w-4 h-4" />
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  )
}
