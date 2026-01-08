"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import CategoryFilter from "@/components/category-filter"
import ProductCard from "@/components/product-card"
import { useCart } from "@/app/context/cart-context"

const products = [
  {
    id: 1,
    name: "Hijab Voile Premium",
    category: "Hijab",
    price: 89000,
    description: "Hijab voile halus dengan finishing sempurna, nyaman dipakai sepanjang hari",
    image: "/modern-hijab-voile-pink.jpg",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Gamis Syari Panjang",
    category: "Gamis",
    price: 189000,
    description: "Gamis syari dengan potongan elegan dan bahan berkualitas premium",
    image: "/islamic-dress-gamis-women.jpg",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Tunik Muslimah Modern",
    category: "Tunik",
    price: 129000,
    description: "Tunik muslimah dengan desain kontemporer dan warna-warna cerah",
    image: "/modest-clothing-tunic-white.jpg",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Pashmina Motif Bunga",
    category: "Pashmina",
    price: 79000,
    description: "Pashmina premium dengan motif bunga tradisional yang cantik",
    image: "/pashmina-floral-pattern.jpg",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Abaya Arab Klasik",
    category: "Abaya",
    price: 249000,
    description: "Abaya arab asli dengan jahitan rapi dan bahan terbaik",
    image: "/abaya-arabian-dress-black-elegant.jpg",
    rating: 5,
  },
  {
    id: 6,
    name: "Jilbab Segi Empat",
    category: "Jilbab",
    price: 69000,
    description: "Jilbab segi empat dengan kualitas terjamin dan harga terjangkau",
    image: "/square-hijab-jilbab-islamic.jpg",
    rating: 4.8,
  },
  {
    id: 7,
    name: "Dress Muslimah Pesta",
    category: "Gamis",
    price: 199000,
    description: "Dress pesta muslimah dengan bordiran cantik untuk acara spesial",
    image: "/islamic-party-dress-embroidered.jpg",
    rating: 4.9,
  },
  {
    id: 8,
    name: "Inner Hijab Berkualitas",
    category: "Aksesori",
    price: 49000,
    description: "Inner hijab yang nyaman dengan bahan breathable dan elastis",
    image: "/hijab-inner-cap-accessory.jpg",
    rating: 4.7,
  },
]

const categories = ["Semua", "Hijab", "Gamis", "Tunik", "Pashmina", "Abaya", "Jilbab", "Aksesori"]

export default function Home() {
  const router = useRouter()
  const { addItem } = useCart()
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [favorites, setFavorites] = useState<number[]>([])

  const filteredProducts =
    selectedCategory === "Semua" ? products : products.filter((p) => p.category === selectedCategory)

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const handleAddToCart = (productId: number) => {
    addItem(productId)
    router.push("/checkout")
  }

  const handleNavigateCart = () => {
    router.push("/checkout")
  }

  return (
    <main className="min-h-screen bg-background">
      <Header onNavigateCart={handleNavigateCart} />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 text-balance">Hijab Paradise</h1>
          <p className="text-lg text-muted-foreground">
            Koleksi pakaian muslim modern dengan kualitas terbaik dan harga terjangkau
          </p>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={() => toggleFavorite(product.id)}
              onAddToCart={() => handleAddToCart(product.id)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">Tidak ada produk di kategori ini</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-secondary text-foreground py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Hijab Paradise</h3>
              <p className="text-muted-foreground">Toko online pakaian muslim terpercaya sejak 2023</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Layanan</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary">
                    Pengiriman Gratis
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Garansi Kualitas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Tukar Balik
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Hubungi Kami</h4>
              <p className="text-muted-foreground">WhatsApp: +62 812 3456 7890</p>
              <p className="text-muted-foreground">Email: info@hijabparadise.com</p>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2026 Hijab Paradise. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
