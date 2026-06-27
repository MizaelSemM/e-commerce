"use client"

import { Product } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ProductImage } from "./ui/product-image"

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price

  return (
    <Card
      onClick={onClick}
      className="bg-card border-border overflow-hidden cursor-pointer group transition-all hover:border-accent/50 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <ProductImage
          src={product.images[0]}
          alt={product.title}
          fill                    // ← ocupa todo o container
          sizes="(max-width: 768px) 50vw, 33vw"  // ← diz pro browser o tamanho real
          className="object-cover transition-transform duration-500 group-hover:scale-110"  // ← tira o w-full h-full, fill já cuida disso
        />
        {product.status === "new" && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">Novo</Badge>
        )}
        {product.status === "out_of_stock" && (
          <Badge variant="destructive" className="absolute top-3 left-3">
            Esgotado
          </Badge>
        )}
      </div>
      <CardContent className="p-4 space-y-2">
        <Badge variant="secondary" className="text-xs mb-2">
          {product.category === "sneakers" && "Tênis"}
          {product.category === "tshirts" && "Camiseta"}
          {product.category === "caps" && "Boné"}
        </Badge>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300 flex items-center justify-center">
          <span className="mb-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
            Ver Detalhes
          </span>
        </div>

        <h3 className="font-semibold truncate">{product.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-primary">
            {product.price.toLocaleString("pt-BR", {
              style: 'currency',
              currency: 'BRL'
            })}
          </span>
          {product.status === "in_stock" && (
            <Badge variant="outline" className="text-xs text-green-500 border-green-500/50 bg-green-500/10">
              Em estoque
            </Badge>
          )}
        </div>

      </CardContent>
    </Card>
  )
}
