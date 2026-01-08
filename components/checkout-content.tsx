"use client"

import { Minus, Plus, ArrowLeft, ShoppingCart } from "lucide-react"
import Link from "next/link"
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

const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

export function CheckoutContent() {
  const { items, updateItem, removeItem } = useCart()

  const handleQuantityChange = (index: number, quantity: number) => {
    if (quantity < 1) return
    const item = items[index]
    updateItem(index, quantity, item.size)
  }

  const handleSizeChange = (index: number, size: string) => {
    const item = items[index]
    updateItem(index, item.quantity, size)
  }

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId)
      return total + (product?.price || 0) * item.quantity
    }, 0)
  }

  const getTotalItems = () => items.reduce((sum, item) => sum + item.quantity, 0)

  const allItemsHaveSize = items.length > 0 && items.every((item) => item.size !== "")

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/" className="flex items-center gap-2 text-primary hover:text-accent mb-8 w-fit">
        <ArrowLeft className="w-5 h-5" />
        <span>Kembali ke Toko</span>
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Pilihan Ukuran & Jumlah Pesanan</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground mb-4">Keranjang Anda kosong</p>
          <Link
            href="/"
            className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-accent transition-colors"
          >
            Lanjutkan Belanja
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, index) => {
              const product = products.find((p) => p.id === item.productId)
              if (!product) return null

              return (
                <div key={index} className="bg-white border border-border rounded-lg p-6 shadow-sm">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">{product.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                      <p className="text-xl font-bold text-primary mb-4">Rp {product.price.toLocaleString("id-ID")}</p>

                      {/* Size Selection */}
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-foreground mb-2">Pilih Ukuran:</label>
                        <div className="flex flex-wrap gap-2">
                          {sizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => handleSizeChange(index, size)}
                              className={`px-4 py-2 rounded-lg border-2 transition-colors font-semibold ${
                                item.size === size
                                  ? "bg-primary text-white border-primary"
                                  : "bg-white text-foreground border-border hover:border-primary"
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                        {item.size === "" && <p className="text-xs text-red-500 mt-2">Ukuran harus dipilih</p>}
                      </div>

                      {/* Quantity Selection */}
                      <div className="flex items-center gap-4">
                        <label className="text-sm font-semibold text-foreground">Jumlah:</label>
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(index, item.quantity - 1)}
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <Minus className="w-4 h-4 text-foreground" />
                          </button>
                          <span className="px-4 py-2 font-semibold text-foreground">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(index, item.quantity + 1)}
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <Plus className="w-4 h-4 text-foreground" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors h-fit"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-border rounded-lg p-6 shadow-sm sticky top-20">
              <h2 className="text-xl font-bold text-foreground mb-6">Ringkasan Pesanan</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-foreground">
                  <span>Total Item:</span>
                  <span className="font-semibold">{getTotalItems()} item</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Subtotal:</span>
                  <span className="font-semibold">Rp {calculateTotal().toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Ongkos Kirim:</span>
                  <span className="font-semibold text-green-600">Gratis</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-foreground">Total:</span>
                  <span className="text-2xl font-bold text-primary">Rp {calculateTotal().toLocaleString("id-ID")}</span>
                </div>
              </div>

              <button
                disabled={!allItemsHaveSize}
                className={`w-full py-3 rounded-lg font-bold transition-colors ${
                  allItemsHaveSize
                    ? "bg-primary text-white hover:bg-accent cursor-pointer"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Lanjut ke Pembayaran
              </button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                {allItemsHaveSize ? "Siap untuk checkout" : "Pilih ukuran untuk semua item terlebih dahulu"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
