/*
  Warnings:

  - You are about to drop the column `groupLeader` on the `Class` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Class` DROP COLUMN `groupLeader`,
    ADD COLUMN `teacher` VARCHAR(191) NULL;
