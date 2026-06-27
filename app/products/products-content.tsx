"use client"

import { Product } from "@/lib/types"
import { ProductGrid } from "@/components/product-grid"

interface ProductsContentProps {
  products: Product[]
  totalPages: number
  currentPage: number
  currentCategory: "all" | "sneakers" | "tshirts" | "caps"
  sneakersCount?: number,
  tshirtsCount?: number,
  capsCount?: number,
  totalItems?: number
}

export function ProductsContent({ totalItems, tshirtsCount, capsCount, sneakersCount, products, totalPages, currentPage, currentCategory,  }: ProductsContentProps) {
  return (
    <ProductGrid
      products={products}
      showAllCategories
      initialCategory={currentCategory}
      totalPages={totalPages}
      currentPage={currentPage}
      sneakersCount={sneakersCount}
      tshirtsCount={tshirtsCount}
      capsCount={capsCount}
      totalItems={totalItems}
    />
  )
}