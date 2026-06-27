import { getProducts } from "@/lib/data/products"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProductGrid } from "@/components/product-grid"
import { Footer } from "@/components/footer"

export default async function HomePage() {
  const { products } = await getProducts(1, "sneakers")

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ProductGrid products={products} showAllCategories={false} />
      </main>
      <Footer />
    </div>
  )
}
