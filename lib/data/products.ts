import { prisma } from "@/lib/prisma"
import { productSchema, Product, CreateProductData, Category } from "@/lib/schemas/productSchema"


const PAGE_SIZE = 8 // quantos produtos por página


export async function getProducts(
  page: number = 1,
  category?: Category | "all"
): Promise<{
  products: Product[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
  sneakersCount: number;
  tshirtsCount: number;
  capsCount: number;
}> {
  const where =
    category && category !== "all" ? { category } : {}

  const [raw, total, sneakersCount, tshirtsCount, capsCount, totalItems] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.product.count({ where }), // Total geral
    prisma.product.count({ where: { category: "sneakers" } }), // Total de tênis
    prisma.product.count({ where: { category: "tshirts" } }),  // Total de camisas
    prisma.product.count({ where: { category: "caps" } }),     // Total de bonés
    prisma.product.count(),
  ])



  const products = productSchema.array().parse(raw)

  return {
    products,
    totalPages: Math.ceil(total / PAGE_SIZE),
    currentPage: page,
    totalItems,
    sneakersCount,
    tshirtsCount,
    capsCount,
  }
}


export async function getProductById(id: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({ where: { id } })
  if (!product) return null
  return productSchema.parse(product)
}

export async function createProductInDb(data: CreateProductData) {
  return prisma.product.create({ data })
}

export async function deleteProductInDb(id: string) {
  return prisma.product.delete({ where: { id } })
}

export async function toggleStock(productId: string) {

  const product = await prisma.product.findUnique({
    where: { id: productId },
  })

  if (!product) {
    throw new Error('Produto não encontrado')
  }

  await prisma.product.update({
    where: { id: productId },
    data: {
      status:
        product.status === 'in_stock'
          ? 'out_of_stock'
          : 'in_stock',
    },
  })
}
