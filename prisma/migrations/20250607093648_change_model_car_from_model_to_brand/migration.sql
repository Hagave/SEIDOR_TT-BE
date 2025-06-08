/*
  Warnings:

  - You are about to drop the column `model` on the `Car` table. All the data in the column will be lost.
  - Added the required column `brand` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "model",
ADD COLUMN     "brand" TEXT NOT NULL;
