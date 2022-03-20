/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Class` MODIFY `groupLeader` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Student` MODIFY `email` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Student_email_key` ON `Student`(`email`);
