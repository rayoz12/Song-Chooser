-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: SongChooser
-- Source Schemata: SongChooser
-- Created: Wed Jan 17 21:27:13 2018
-- Workbench Version: 6.3.10
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema SongChooser
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `SongChooser` ;
CREATE SCHEMA IF NOT EXISTS `SongChooser` ;

-- ----------------------------------------------------------------------------
-- Table SongChooser.Song
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `SongChooser`.`Song` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `song_name` VARCHAR(256) NULL,
  `path` VARCHAR(512) NULL,
  `tags` VARCHAR(512) NULL,
  PRIMARY KEY (`id`));

-- ----------------------------------------------------------------------------
-- Table SongChooser.Template
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `SongChooser`.`Template` (
  `id` BIGINT NOT NULL,
  `name` VARCHAR(50) NULL);

-- ----------------------------------------------------------------------------
-- Table SongChooser.TemplateDetail
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `SongChooser`.`TemplateDetail` (
  `id` BIGINT NOT NULL,
  `template_id` BIGINT NOT NULL,
  `song_id` BIGINT NULL,
  `order_index` BIGINT NULL,
  `template_song_name` VARCHAR(256) NULL);
SET FOREIGN_KEY_CHECKS = 1;
