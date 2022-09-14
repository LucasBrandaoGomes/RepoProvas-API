-- CreateTable
CREATE TABLE "Tests" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pdfUrl" TEXT NOT NULL,
    "categorieId" INTEGER NOT NULL,

    CONSTRAINT "Tests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tests_name_key" ON "Tests"("name");

-- AddForeignKey
ALTER TABLE "Tests" ADD CONSTRAINT "Tests_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
