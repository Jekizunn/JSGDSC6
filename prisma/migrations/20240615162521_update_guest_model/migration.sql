/*
  Warnings:

  - You are about to drop the column `address` on the `guest` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `guest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `guest` DROP COLUMN `address`,
    DROP COLUMN `phone_number`;
