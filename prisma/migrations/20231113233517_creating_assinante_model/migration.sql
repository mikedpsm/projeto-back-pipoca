-- CreateTable
CREATE TABLE "assinantes" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "data_de_nascimento" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "assinantes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "assinantes_email_key" ON "assinantes"("email");
