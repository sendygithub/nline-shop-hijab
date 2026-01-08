"use client"

import { Suspense } from "react"
import Header from "@/components/header"
import { CheckoutContent } from "@/components/checkout-content"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const router = useRouter()

  const handleNavigateCart = () => {
    router.push("/checkout")
  }

  return (
    <main className="min-h-screen bg-background">
      <Header onNavigateCart={handleNavigateCart} />

      <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
        <CheckoutContent />
      </Suspense>

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
