'use client'

import { useEffect } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import { ProductImage } from './ui/product-image'
import { ImagePlus, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  value: string[]
  onChange: React.Dispatch<React.SetStateAction<string[]>>
  maxImages?: number
}

export function ProductImageUpload({ value, onChange, maxImages = 3 }: Props) {

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  function handleRemove(publicId: string) {
    onChange(value.filter((img) => img !== publicId))
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">

        {/* slots preenchidos */}
        {value.map((publicId) => (
          <div key={publicId} className="relative aspect-square rounded-lg overflow-hidden border border-border">
            <ProductImage
              src={publicId}
              alt="Imagem do produto"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(publicId)}
              className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        {/* slots vazios clicáveis — um por vez */}
        {Array.from({ length: maxImages - value.length }).map((_, i) => (
          <CldUploadWidget
            key={i}
            uploadPreset="portfolio_uploads"
            onSuccess={(result, { widget }) => {
              if (result.info && typeof result.info === 'object') {
                const publicId = (result.info as any).public_id
                onChange((prev: string[]) => [...prev, publicId])
                widget.close() // fecha após cada upload
                document.body.style.overflow = ''
              }
            }}
            onClose={() => {
              document.body.style.overflow = ''
            }}
            options={{
              multiple: false,
              resourceType: 'image',
              clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className={cn(
                  "aspect-square rounded-lg border-2 border-dashed border-border",
                  "flex flex-col items-center justify-center gap-2",
                  "text-muted-foreground hover:border-primary hover:text-primary transition"
                )}
              >
                <ImagePlus className="h-8 w-8" />
                <span className="text-xs">Imagem {value.length + i + 1}</span>
              </button>
            )}
          </CldUploadWidget>
        ))}

      </div>
    </div>
  )
}