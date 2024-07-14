-- CreateTable
CREATE TABLE "nyc" (
    "gid" TEXT NOT NULL,
    "geom" geometry(MultiPolygon, 26918),
    "boroname" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "nyc_pkey" PRIMARY KEY ("gid")
);

-- CreateIndex
CREATE INDEX "nyc_id" ON "nyc" USING GIST ("geom");
