 -- CREATE DATABASE chat;

USE chat;


/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'rooms'
-- 
-- ---

DROP TABLE IF EXISTS `rooms`;
    
CREATE TABLE `rooms` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'users'
-- 
-- ---

DROP TABLE IF EXISTS `users`;
    
CREATE TABLE `users` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `username` VARCHAR(20) NULL DEFAULT NULL,
  `room_ID` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'messages'
-- 
-- ---

DROP TABLE IF EXISTS `messages`;
    
CREATE TABLE `messages` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `content` MEDIUMTEXT NULL DEFAULT NULL,
  `createdAt` DATETIME NULL DEFAULT NULL,
  `user_ID` TINYINT NULL DEFAULT NULL,
  `room_ID` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'watching'
-- aka followers
-- ---

DROP TABLE IF EXISTS `watching`;
    
CREATE TABLE `watching` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `watcher_ID` TINYINT NULL DEFAULT NULL,
  `watched_ID` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) COMMENT 'aka followers';

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `users` ADD FOREIGN KEY (room_ID) REFERENCES `rooms` (`id`);
ALTER TABLE `messages` ADD FOREIGN KEY (user_ID) REFERENCES `users` (`id`);
ALTER TABLE `messages` ADD FOREIGN KEY (room_ID) REFERENCES `rooms` (`id`);
ALTER TABLE `watching` ADD FOREIGN KEY (watcher_ID) REFERENCES `users` (`id`);
ALTER TABLE `watching` ADD FOREIGN KEY (watched_ID) REFERENCES `users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `watching` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `rooms` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `users` (`id`,`username`,`room_ID`) VALUES
-- ('','','');
-- INSERT INTO `messages` (`id`,`content`,`createdAt`,`user_ID`,`room_ID`) VALUES
-- ('','','','','');
-- INSERT INTO `watching` (`id`,`watcher_ID`,`watched_ID`) VALUES
-- ('','','');

