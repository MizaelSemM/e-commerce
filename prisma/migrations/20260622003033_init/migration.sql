-- CreateEnum
CREATE TYPE "Category" AS ENUM ('sneakers', 'tshirts', 'caps');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('in_stock', 'out_of_stock', 'new');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "status" "ProductStatus" NOT NULL,
    "images" TEXT[],
    "price" DOUBLE PRECISION NOT NULL,
    "originalPrice" DOUBLE PRECISION,
    "sizes" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
