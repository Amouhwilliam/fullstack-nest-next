-- CreateEnum
CREATE TYPE "TYPE" AS ENUM ('FILE', 'FOLDER');

-- CreateTable
CREATE TABLE "CompanyData" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT,
    "type" "TYPE" NOT NULL DEFAULT 'FILE',
    "parentId" INTEGER,

    CONSTRAINT "CompanyData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompanyData" ADD CONSTRAINT "CompanyData_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "CompanyData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
