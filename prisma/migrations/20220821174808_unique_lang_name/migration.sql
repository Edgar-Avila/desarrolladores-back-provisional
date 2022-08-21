/*
  Warnings:

  - A unique constraint covering the columns `[Name]` on the table `ProgrammingLanguage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProgrammingLanguage_Name_key" ON "ProgrammingLanguage"("Name");
