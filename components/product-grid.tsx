"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Category, Product } from "@/lib/types"
import { ProductCard } from "@/components/product-card"
import { ProductModal } from "@/components/product-modal"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Pagination } from "@/components/pagination"

const categories: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "sneakers", label: "Tênis" },
  { value: "tshirts", label: "Camisetas" },
  { value: "caps", label: "Bonés" },
]

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}

// 1. ADICIONADO: Tipagem dos novos contadores vindo daquela nossa função do Prisma
interface ProductGridProps {
  products: Product[]
  showAllCategories?: boolean
  initialCategory?: Category | "all"
  totalPages?: number
  currentPage?: number
  totalItems?: number     // <-- Adicionado
  sneakersCount?: number   // <-- Adicionado
  tshirtsCount?: number    // <-- Adicionado
  capsCount?: number       // <-- Adicionado
}

export function ProductGrid({
  products,
  showAllCategories = false,
  initialCategory = "sneakers",
  totalPages = 1,
  currentPage = 1,
  totalItems = 0,     // <-- Valores padrão adicionados aqui
  sneakersCount = 0,   // <--
  tshirtsCount = 0,    // <--
  capsCount = 0,       // <--
}: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(initialCategory)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

  useEffect(() => {
    setSelectedCategory(initialCategory)
  }, [initialCategory])

  const sneakers = products.filter((p) => p.category === "sneakers")
  const filteredProducts = products
  const selectedProduct = products.find((p) => p.id === selectedProductId)
  const sneakersSection = useInView()
  const filteredSection = useInView()

  const router = useRouter()

  // 2. FUNÇÃO AUXILIAR: Mapeia cada categoria para a sua respectiva variável de contagem
  const getCategoryCount = (value: Category | "all") => {
    if (value === "all") return totalItems
    if (value === "sneakers") return sneakersCount
    if (value === "tshirts") return tshirtsCount
    if (value === "caps") return capsCount
    return 0
  }

  if (!showAllCategories) {
    return (
      <>
        <section id="sneakers" className="py-16 scroll-mt-32" ref={sneakersSection.ref}>
          <div className="container mx-auto px-4">
            <div
              className={cn(
                "mb-10 transition-all duration-700",
                sneakersSection.isInView ? "animate-fade-in-left" : "opacity-0"
              )}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Nossos Tênis</h2>
              <p className="text-muted-foreground mt-2">Nossa coleção premium de sneakers originais</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sneakers.map((product, index) => (
                <div
                  key={product.id}
                  className={cn(
                    "transition-all duration-500",
                    sneakersSection.isInView ? "animate-fade-in-up" : "opacity-0"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} onClick={() => setSelectedProductId(product.id)} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <ProductModal product={selectedProduct} onClose={() => setSelectedProductId(null)} />
      </>
    )
  }

  const searchParams = useSearchParams()
  return (
    <>
      <section id="products" className="py-8 border-b border-border bg-background sticky top-[68px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedCategory(cat.value)
                  const params = new URLSearchParams(searchParams)
                  params.set("category", cat.value)
                  params.set("page", "1")
                  router.push(`?${params.toString()}`)
                }}
                className={cn(
                  "min-w-[100px] transition-all",
                  selectedCategory === cat.value && "bg-primary text-primary-foreground"
                )}
              >
                {/* 3. MODIFICADO: Agora exibe "Todos (100)", "Tênis (45)", etc. */}
                {cat.label} ({getCategoryCount(cat.value)})
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" ref={filteredSection.ref}>
        <div className="container mx-auto px-4">
          <div
            className={cn(
              "mb-10 transition-all duration-700",
              filteredSection.isInView ? "animate-fade-in-left" : "opacity-0"
            )}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {selectedCategory === "all" && "Todos os Produtos"}
              {selectedCategory === "sneakers" && "Tênis"}
              {selectedCategory === "tshirts" && "Camisetas"}
              {selectedCategory === "caps" && "Bonés"}
            </h2>
            <p className="text-muted-foreground mt-2">
              {/* 4. MODIFICADO: Mostra a quantidade real total da categoria selecionada */}
              {getCategoryCount(selectedCategory)} produto{getCategoryCount(selectedCategory) !== 1 && "s"} encontrado{getCategoryCount(selectedCategory) !== 1 && "s"}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={cn(
                  "transition-all duration-500",
                  filteredSection.isInView ? "animate-fade-in-up" : "opacity-0"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} onClick={() => setSelectedProductId(product.id)} />
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          )}
        </div>
      </section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProductId(null)} />
    </>
  )
}
