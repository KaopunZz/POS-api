-- CreateTable
CREATE TABLE "SaleTemp" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tableNo" INTEGER NOT NULL,

    CONSTRAINT "SaleTemp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaleTempDetail" (
    "id" SERIAL NOT NULL,
    "saleTempId" INTEGER NOT NULL,
    "foodId" INTEGER NOT NULL,
    "tasteId" INTEGER NOT NULL,
    "foodSizeId" INTEGER NOT NULL,

    CONSTRAINT "SaleTempDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SaleTempDetail" ADD CONSTRAINT "SaleTempDetail_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleTempDetail" ADD CONSTRAINT "SaleTempDetail_tasteId_fkey" FOREIGN KEY ("tasteId") REFERENCES "Taste"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleTempDetail" ADD CONSTRAINT "SaleTempDetail_foodSizeId_fkey" FOREIGN KEY ("foodSizeId") REFERENCES "FoodSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleTempDetail" ADD CONSTRAINT "SaleTempDetail_saleTempId_fkey" FOREIGN KEY ("saleTempId") REFERENCES "SaleTemp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
