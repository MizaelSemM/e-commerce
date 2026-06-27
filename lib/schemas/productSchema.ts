import { number, optional, z } from "zod"

export const categorySchema = z.enum(["sneakers", "tshirts", "caps"])
export const productStatusSchema = z.enum(["in_stock", "out_of_stock", "new"])
export const sneakerSizeSchema = z.enum(["38", "39", "40", "41", "42", "43", "44"])
export const tshirtSizeSchema = z.enum(["S", "M", "L", "XL"])

export const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: categorySchema,
  status: productStatusSchema,
  images: z.array(z.string()),
  sneakersCount: z.number().optional(),
  tshirtsCount: z.number().optional(),
  totalItems: z.number().optional(),
  capsCount: z.number().optional(),
  price: z.number(),
  originalPrice: z
    .number()
    .nullable()
    .optional()
    .transform((v) => v ?? undefined),
  sizes: z.array(z.union([sneakerSizeSchema, tshirtSizeSchema])).optional(),
  createdAt: z.date(),
})

export const createProductSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: categorySchema,
  status: z.enum(["in_stock", "out_of_stock"]),
  price: z.number(),
  images: z.array(z.string()),
  sizes: z.array(z.union([sneakerSizeSchema, tshirtSizeSchema])).optional(),
})

export type Category = z.infer<typeof categorySchema>
export type ProductStatus = z.infer<typeof productStatusSchema>
export type SneakerSize = z.infer<typeof sneakerSizeSchema>
export type TShirtSize = z.infer<typeof tshirtSizeSchema>
export type Product = z.infer<typeof productSchema>
export type CreateProductData = z.infer<typeof createProductSchema>
