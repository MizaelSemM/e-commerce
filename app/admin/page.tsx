import { getProducts } from "@/lib/data/products"
import { AdminDashboard } from "@/components/admin-dashboard"

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>
}) {
  const { category: rawCategory, page: rawPage } = await searchParams

  const category = (rawCategory as "all" | "sneakers" | "tshirts" | "caps") || "all"
  const page = Number(rawPage) || 1


  const { products, totalPages, currentPage, sneakersCount, tshirtsCount, capsCount, totalItems } = await getProducts(page, category)
  return <AdminDashboard
    products={products}
    totalPages={totalPages}
    currentPage={currentPage}
    sneakersCount={sneakersCount}
    tshirtsCount={tshirtsCount}
    capsCount={capsCount}
    totalItems={totalItems}
  />
}
