-- CreateTable
CREATE EXTENSION postgis;

CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")

);
