/*
  Warnings:

  - Added the required column `coords` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "coords" geometry(Point, 4326) NOT NULL;

-- CreateIndex
CREATE INDEX "location_idx" ON "Location" USING GIST ("coords");
