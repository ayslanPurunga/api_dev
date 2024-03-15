/*
  Warnings:

  - You are about to drop the column `birthdAt` on the `Developer` table. All the data in the column will be lost.
  - Added the required column `birthDate` to the `Developer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Developer" DROP COLUMN "birthdAt",
ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL;
