/*
  Warnings:

  - You are about to drop the column `classId` on the `Teacher` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Teacher_classId_idx` ON `Teacher`;

-- AlterTable
ALTER TABLE `Teacher` DROP COLUMN `classId`;
