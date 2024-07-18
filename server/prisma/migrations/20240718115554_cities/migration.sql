-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "coords" geometry(Point, 4326) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities_rs" (
    "id" TEXT NOT NULL,
    "geom" geometry(MultiPolygon, 4326),
    "cd_mun" TEXT NOT NULL,
    "nm_mun" TEXT NOT NULL,
    "sigla_uf" TEXT NOT NULL,
    "area_km2" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "cities_rs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "location_idx" ON "Location" USING GIST ("coords");

-- CreateIndex
CREATE INDEX "cities_rs_idx" ON "cities_rs" USING GIST ("geom");
