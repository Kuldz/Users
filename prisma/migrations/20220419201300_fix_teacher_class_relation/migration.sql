/*
  Warnings:

  - You are about to drop the column `teacher` on the `Class` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[teacherId]` on the table `Class` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teacherId` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Class` DROP COLUMN `teacher`,
    ADD COLUMN `teacherId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Class_teacherId_key` ON `Class`(`teacherId`);

-- CreateIndex
CREATE INDEX `Class_teacherId_idx` ON `Class`(`teacherId`);
