USE `test`;
DROP TABLE IF EXISTS `childmodel`;
CREATE TABLE `childmodel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

LOCK TABLES `childmodel` WRITE;
INSERT INTO `childmodel` VALUES (1,'Child Model 1',1),(2,'Child Model 3',3),(3,'Child Model 4',NULL);
UNLOCK TABLES;



DROP TABLE IF EXISTS `model`;
CREATE TABLE `model` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;



LOCK TABLES `model` WRITE;
INSERT INTO `model` VALUES (1,'Model 1'),(2,'Model 2'),(3,'Model 3');
UNLOCK TABLES;
