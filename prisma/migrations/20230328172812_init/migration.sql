-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "house" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "patronus" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "parent_blood" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "house" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "patronus" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "courses" TEXT[],

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);
