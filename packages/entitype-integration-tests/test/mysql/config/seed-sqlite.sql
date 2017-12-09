DROP TABLE IF EXISTS `ChildModel`;
CREATE TABLE `ChildModel` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `ChildModel` VALUES (1,'Child Model 1',1),(2,'Child Model 3',3),(3,'Child Model 4',NULL);

DROP TABLE IF EXISTS `Model`;
CREATE TABLE `Model` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `Model` VALUES (1,'Model 1'),(2,'Model 2'),(3,'Model 3')
