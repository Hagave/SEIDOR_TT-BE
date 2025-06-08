/*
  Warnings:

  - Made the column `deliveredAt` on table `BookCar` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BookCar" ALTER COLUMN "deliveredAt" SET NOT NULL;
