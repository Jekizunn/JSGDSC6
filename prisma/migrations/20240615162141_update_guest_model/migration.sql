/*
  Warnings:

  - Added the required column `email` to the `Guest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Guest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Guest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `guest` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;
