-- CreateTable
CREATE TABLE `account` (
    `id` VARCHAR(36) NOT NULL,
    `accountId` TEXT NOT NULL,
    `providerId` TEXT NOT NULL,
    `userId` VARCHAR(36) NOT NULL,
    `accessToken` TEXT NULL,
    `refreshToken` TEXT NULL,
    `idToken` TEXT NULL,
    `accessTokenExpiresAt` TIMESTAMP(3) NULL,
    `refreshTokenExpiresAt` TIMESTAMP(3) NULL,
    `scope` TEXT NULL,
    `password` TEXT NULL,
    `createdAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP(3) NOT NULL,
    INDEX `account_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
);

-- CreateTable
CREATE TABLE `session` (
    `id` VARCHAR(36) NOT NULL,
    `expiresAt` TIMESTAMP(3) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP(3) NOT NULL,
    `ipAddress` TEXT NULL,
    `userAgent` TEXT NULL,
    `userId` VARCHAR(36) NOT NULL,
    UNIQUE INDEX `token`(`token`),
    INDEX `session_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
);

-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `emailVerified` BOOLEAN NOT NULL,
    `image` TEXT NULL,
    `createdAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
);

-- CreateTable
CREATE TABLE `verification` (
    `id` VARCHAR(36) NOT NULL,
    `identifier` VARCHAR(255) NOT NULL,
    `value` TEXT NOT NULL,
    `expiresAt` TIMESTAMP(3) NOT NULL,
    `createdAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    INDEX `verification_identifier_idx`(`identifier`),
    PRIMARY KEY (`id`)
);

-- AddForeignKey
ALTER TABLE
    `account`
ADD
    CONSTRAINT `account_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE
    `session`
ADD
    CONSTRAINT `session_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;