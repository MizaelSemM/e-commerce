"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ProductImageUpload } from "@/components/product-image-upload"
import { createProduct, deleteProduct, updateProduct } from "@/app/actions/product-actions"
import { Category, Product, SneakerSize, TShirtSize } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProductImage } from "./ui/product-image"

const sneakerSizes: SneakerSize[] = ["38", "39", "40", "41", "42", "43", "44"]
const tshirtSizes: TShirtSize[] = ["S", "M", "L", "XL"]

interface ProductFormProps {
  onSuccess: () => void
}

export function ProductForm({ onSuccess }: ProductFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<Category>("sneakers")
  const [status, setStatus] = useState<"in_stock" | "out_of_stock">("in_stock")
  const [price, setPrice] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [selectedSneakerSizes, setSelectedSneakerSizes] = useState<SneakerSize[]>([])
  const [selectedTShirtSizes, setSelectedTShirtSizes] = useState<TShirtSize[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toggleSneakerSize = (size: SneakerSize) => {
    setSelectedSneakerSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    )
  }

  const toggleTShirtSize = (size: TShirtSize) => {
    setSelectedTShirtSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (images.length === 0) {
      alert("Adicione pelo menos uma imagem")
      return
    }

    const productData = {
      title,
      description,
      category,
      status,
      price: parseFloat(price),
      images: images,
      sizes:
        category === "sneakers"
          ? selectedSneakerSizes
          : category === "tshirts"
            ? selectedTShirtSizes
            : undefined,
    }

    setIsSubmitting(true)
    try {
      await createProduct(productData)
      router.refresh()

      setTitle("")
      setDescription("")
      setCategory("sneakers")
      setStatus("in_stock")
      setPrice("")
      setImages([])
      setSelectedSneakerSizes([])
      setSelectedTShirtSizes([])

      onSuccess()
    } catch (error) {
      console.error(error)
      alert("Erro ao criar produto")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Título do Produto</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Air Max 90"
            required
            className="bg-input"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Preço (R$)</Label>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Ex: 899"
            required
            min="0"
            step="0.01"
            className="bg-input"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva o produto..."
          required
          rows={4}
          className="bg-input resize-none"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Categoria</Label>
          <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
            <SelectTrigger className="bg-input">
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sneakers">Tênis</SelectItem>
              <SelectItem value="tshirts">Camiseta</SelectItem>
              <SelectItem value="caps">Boné</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Disponibilidade</Label>
          <Select value={status} onValueChange={(v) => setStatus(v as "in_stock" | "out_of_stock")}>
            <SelectTrigger className="bg-input">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="in_stock">Em Estoque</SelectItem>
              <SelectItem value="out_of_stock">Esgotado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {category === "sneakers" && (
        <div className="space-y-3">
          <Label>Tamanhos Disponíveis (Tênis)</Label>
          <div className="flex flex-wrap gap-3">
            {sneakerSizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={`sneaker-${size}`}
                  checked={selectedSneakerSizes.includes(size)}
                  onCheckedChange={() => toggleSneakerSize(size)}
                />
                <label htmlFor={`sneaker-${size}`} className="text-sm font-medium cursor-pointer">
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {category === "tshirts" && (
        <div className="space-y-3">
          <Label>Tamanhos Disponíveis (Camiseta)</Label>
          <div className="flex flex-wrap gap-3">
            {tshirtSizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={`tshirt-${size}`}
                  checked={selectedTShirtSizes.includes(size)}
                  onCheckedChange={() => toggleTShirtSize(size)}
                />
                <label htmlFor={`tshirt-${size}`} className="text-sm font-medium cursor-pointer">
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <Label>Imagens do Produto (máx. 3)</Label>
        <ProductImageUpload
          value={images}
          onChange={setImages}
          maxImages={3}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        size="lg"
        disabled={isSubmitting}
      >
        <Plus className="mr-2 h-4 w-4" />
        {isSubmitting ? "Adicionando..." : "Adicionar Produto"}
      </Button>
    </form>
  )
}

interface ProductListProps {
  products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  const router = useRouter()

  const sneakersCount = products.filter((p) => p.category === "sneakers").length
  console.log(sneakersCount)

  const handleDelete = async (id: string) => {
    await deleteProduct(id)
    router.refresh()
  }

  return (
    <div className="space-y-4">
      {products.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>Nenhum produto cadastrado ainda.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <Card key={product.id} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary shrink-0">
                    <ProductImage
                      src={product.images[0]}
                      alt={product.title}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold truncate">{product.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Disponibilidade</Label>
                        <Select onValueChange={() => updateProduct(product.id)}>
                          <SelectTrigger className="bg-input">
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="in_stock">Em Estoque</SelectItem>
                            <SelectItem value="out_of_stock">Esgotado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(product.id)}
                        className="text-destructive hover:text-destructive shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        {product.category === "sneakers" && "Tênis"}
                        {product.category === "tshirts" && "Camiseta"}
                        {product.category === "caps" && "Boné"}
                      </Badge>
                      <Badge
                        variant={product.status === "in_stock" ? "outline" : "destructive"}
                        className={cn(
                          "text-xs",
                          product.status === "in_stock" && "text-green-500 border-green-500/50"
                        )}
                      >
                        {product.status === "in_stock" ? "Em estoque" : "Esgotado"}
                      </Badge>
                      <span className="text-sm font-semibold text-primary ml-auto">
                        R$ {product.price.toLocaleString("pt-BR")}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
