import Link from "next/link"
import { Instagram, MessageCircle } from "lucide-react"

const WHATSAPP_NUMBER = "5511999999999"
const WHATSAPP_MESSAGE = "Olá! Gostaria de saber mais sobre os produtos."

export function Footer() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <footer className="bg-background border-t border-border">
      {/* WhatsApp CTA Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ficou com alguma dúvida?
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Nossa equipe está pronta para te ajudar a encontrar o par perfeito.
            <br />
            Atendimento rápido e personalizado via WhatsApp.
          </p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <button className="inline-flex items-center gap-2 px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all rounded-lg font-medium">
              <MessageCircle className="w-5 h-5" />
              Falar no WhatsApp
            </button>
          </a>
        </div>
      </div>

      {/* Footer Links */}
      <div className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-foreground">SneakerVault</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Sua loja de tênis premium com os melhores modelos do mercado. Autenticidade garantida e atendimento exclusivo.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground uppercase tracking-wider text-sm">Navegação</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground transition-colors">
                    Início
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-foreground transition-colors">
                    Produtos
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contato
                  </Link>
                </li>
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
      </div>
    </footer>
  )
}
