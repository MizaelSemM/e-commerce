"use server"

import { revalidatePath } from "next/cache"
import { createProductInDb, deleteProductInDb, toggleStock } from "@/lib/data/products"
import { CreateProductData } from "@/lib/types"
import { verifyAuth } from "@/lib/auth"

export async function createProduct(data: CreateProductData) {
  await verifyAuth();

  await createProductInDb(data)
  revalidatePath("/")
  revalidatePath("/products")
  revalidatePath("/admin")
}

export async function deleteProduct(id: string) {
  await verifyAuth();

  await deleteProductInDb(id)
  revalidatePath("/")
  revalidatePath("/products")
  revalidatePath("/admin")
}


export async function updateProduct(id: string) {
  await verifyAuth();

  await toggleStock(id)
  revalidatePath("/")
  revalidatePath("/products")
  revalidatePath("/admin")
}