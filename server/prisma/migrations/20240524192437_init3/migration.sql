-- CreateTable
CREATE TABLE "Blockgroup" (
    "id" TEXT NOT NULL,
    "geom" geometry(MultiPolygon, 4326),
    "water" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Blockgroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "blockgroup_idx" ON "Blockgroup" USING GIST ("geom");
