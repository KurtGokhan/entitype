USE `test`;
DROP TABLE IF EXISTS `ChildModel`;
CREATE TABLE `childmodel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

LOCK TABLES `ChildModel` WRITE;
INSERT INTO `ChildModel` VALUES (1,'Child Model 1',1),(2,'Child Model 3',3),(3,'Child Model 4',NULL);
UNLOCK TABLES;



DROP TABLE IF EXISTS `Model`;
CREATE TABLE `Model` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;



LOCK TABLES `Model` WRITE;
INSERT INTO `Model` VALUES (1,'Model 1'),(2,'Model 2'),(3,'Model 3');
UNLOCK TABLES;
