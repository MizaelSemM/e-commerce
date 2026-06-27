import { getProducts } from "@/lib/data/products"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductsContent } from "./products-content"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>
}) {
  const { category: rawCategory, page: rawPage } = await searchParams

  const category = (rawCategory as "all" | "sneakers" | "tshirts" | "caps") || "all"
  const page = Number(rawPage) || 1

  const { products, totalPages, currentPage, sneakersCount, tshirtsCount, capsCount, totalItems } = await getProducts(page, category)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <ProductsContent
          products={products}
          totalPages={totalPages}
          currentPage={currentPage}
          sneakersCount={sneakersCount}
          tshirtsCount={tshirtsCount}
          capsCount={capsCount}
          totalItems={totalItems}
          currentCategory={category}
        />
      </main>
      <Footer />
    </div>
  )
}