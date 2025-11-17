-- CreateTable
CREATE TABLE `DealDocument` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deal_id` INTEGER NOT NULL,
    `file_name` VARCHAR(191) NOT NULL,
    `file_path` VARCHAR(191) NOT NULL,
    `mime_type` VARCHAR(191) NULL,
    `uploaded_by` INTEGER NULL,
    `uploaded_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `whatsapp_sent` BOOLEAN NOT NULL DEFAULT false,
    `email_sent` BOOLEAN NOT NULL DEFAULT false,
    `notification_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DealDocument` ADD CONSTRAINT `DealDocument_deal_id_fkey` FOREIGN KEY (`deal_id`) REFERENCES `Deal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DealDocument` ADD CONSTRAINT `DealDocument_uploaded_by_fkey` FOREIGN KEY (`uploaded_by`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
