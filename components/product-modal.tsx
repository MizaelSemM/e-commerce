"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, MessageCircle, Shield, Truck, RefreshCw } from "lucide-react"
import { Product, SneakerSize, TShirtSize } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ProductImage } from "./ui/product-image"

const WHATSAPP_NUMBER = "5511999999999"

interface ProductModalProps {
  product: Product | undefined
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState<SneakerSize | TShirtSize | null>(null)

  if (!product) return null

  const hasSizes = product.sizes && product.sizes.length > 0

  const getWhatsAppUrl = () => {
    const sizeText = selectedSize ? ` - Tamanho: ${selectedSize}` : ""
    const message = `Olá! Tenho interesse no produto: ${product.title}${sizeText} - R$ ${product.price.toLocaleString("pt-BR")}`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }

  const whatsappContactUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Gostaria de mais informações.")}`

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="h-1 bg-primary" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">SneakerVault</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={onClose} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Início
            </button>
            <button onClick={onClose} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Produtos
            </button>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Sobre
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contato
            </Link>
          </nav>

          {/* CTA Button */}
          <a href={whatsappContactUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Fale Conosco
            </Button>
          </a>
        </div>
      </header>

      {/* Back Link - Below Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Voltar para produtos</span>
        </button>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-secondary rounded-lg overflow-hidden">
              {product.status === "new" && (
                <Badge className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground px-4 py-1 text-sm">
                  Novo
                </Badge>
              )}
              <ProductImage
                src={product.images[currentImageIndex]}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
                      index === currentImageIndex
                        ? "border-primary"
                        : "border-border hover:border-muted-foreground"
                    )}
                  >
                    <ProductImage
                      src={img}
                      alt={`${product.title} ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand */}
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">
              {product.category === "sneakers" ? "Tênis" : product.category === "tshirts" ? "Camisetas" : "PREMIUM"}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-emerald-400">
                R$ {product.price.toLocaleString("pt-BR")}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  R$ {product.originalPrice.toLocaleString("pt-BR")}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            {hasSizes && (
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">
                  Selecione o tamanho:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "w-12 h-12 rounded-lg border-2 font-medium transition-all",
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-secondary text-foreground hover:border-muted-foreground"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* WhatsApp CTA */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-base font-semibold"
                disabled={hasSizes && !selectedSize}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Comprar via WhatsApp
              </Button>
            </a>

            {/* Benefits */}
            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">100% Original</p>
                  <p className="text-sm text-muted-foreground">Garantia de autenticidade</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Entrega Rápida</p>
                  <p className="text-sm text-muted-foreground">Em até 3 dias úteis</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <RefreshCw className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Troca Grátis</p>
                  <p className="text-sm text-muted-foreground">Primeira troca sem custo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer in Modal */}
      <footer className="border-t border-border py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-xl font-bold">SneakerVault</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Sua loja de tênis premium com os melhores modelos do mercado. Autenticidade garantida e atendimento exclusivo.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground uppercase tracking-wider text-sm">Navegação</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={onClose} className="hover:text-foreground transition-colors">Início</button></li>
                <li><button onClick={onClose} className="hover:text-foreground transition-colors">Produtos</button></li>
                <li><Link href="/about" className="hover:text-foreground transition-colors">Sobre</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contato</Link></li>
              </ul>
            </div>

            {/* Brands */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground uppercase tracking-wider text-sm">Marcas</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="hover:text-foreground transition-colors cursor-pointer">Nike</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">Jordan</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">Adidas</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">New Balance</span></li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground uppercase tracking-wider text-sm">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><span className="hover:text-foreground transition-colors cursor-pointer">FAQ</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">Trocas e Devoluções</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">Formas de Pagamento</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">Frete</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} SneakerVault. Todos os direitos reservados.</p>
            <p>CNPJ: 00.000.000/0001-00</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
