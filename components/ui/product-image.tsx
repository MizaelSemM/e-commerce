import { CldImage } from "next-cloudinary"

// components/ui/product-image.tsx
interface Props {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  sizes?: string 
}

export function ProductImage({ src, alt, width, height, fill, className, sizes }: Props) {
  return (
    <CldImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      className={className}
      sizes={sizes}  // ← e essa
      quality="auto"
      format="auto"
    />
  )
}