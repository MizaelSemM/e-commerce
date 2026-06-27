"use client"

import { useState } from "react"
import Link from "next/link"
import { Category, Product } from "@/lib/types"
import { ProductForm, ProductList } from "@/components/admin-components"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Package, Plus, LayoutGrid } from "lucide-react"
import { Pagination } from "./pagination"

interface AdminDashboardProps {
  products: Product[],
  totalPages?: number,
  currentPage?: number
  sneakersCount?: number,
  tshirtsCount?: number,
  capsCount?: number,
  totalItems?: number
}

export function AdminDashboard({
  products,
  totalPages = 1,
  currentPage = 1,
  sneakersCount,
  tshirtsCount,
  capsCount,
  totalItems
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("list")

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">Painel Administrativo</h1>
                <p className="text-sm text-muted-foreground">Gerencie seus produtos</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                Ver Loja
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalItems}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <span className="text-blue-500 font-bold text-sm">T</span>
                </div>
                <div>
                  <p className="text-2xl font-bold">{sneakersCount}</p>
                  <p className="text-xs text-muted-foreground">Tênis</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <span className="text-green-500 font-bold text-sm">C</span>
                </div>
                <div>
                  <p className="text-2xl font-bold">{tshirtsCount}</p>
                  <p className="text-xs text-muted-foreground">Camisetas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <span className="text-orange-500 font-bold text-sm">B</span>
                </div>
                <div>
                  <p className="text-2xl font-bold">{capsCount}</p>
                  <p className="text-xs text-muted-foreground">Bonés</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="list" className="gap-2">
              <LayoutGrid className="h-4 w-4" />
              Produtos
            </TabsTrigger>
            <TabsTrigger value="add" className="gap-2">
              <Plus className="h-4 w-4" />
              Adicionar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Lista de Produtos</CardTitle>
                <CardDescription>Visualize e gerencie todos os produtos cadastrados</CardDescription>
              </CardHeader>
              <CardContent>
                <ProductList products={products} />
              </CardContent>
              {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} />
              )}
            </Card>
          </TabsContent>

          <TabsContent value="add">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Adicionar Novo Produto</CardTitle>
                <CardDescription>Preencha os campos abaixo para cadastrar um novo produto</CardDescription>
              </CardHeader>
              <CardContent>
                <ProductForm onSuccess={() => setActiveTab("list")} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
