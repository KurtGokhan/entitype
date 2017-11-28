CREATE TABLE `test`.`test` (
  `id` INT NOT NULL,
  `a` BINARY NULL,
  `b` BLOB NULL,
  `c` VARBINARY(45) NULL,
  `d` ENUM('a', 'b', 'c') NULL,
  `e` SET('a', 'b', 'c') NULL,
  `f` BIT(8) NULL,
  `g` TINYINT NULL,
  `h` JSON NULL,
  `i` DECIMAL NULL,
  `j` TEXT(500) NULL,
  `k` TINYTEXT NULL,
  `l` TINYBLOB NULL,
  `m` DATE NULL,
  `n` DATETIME(6) NULL,
  `o` TIME(6) NULL,
  `p` TIMESTAMP(6) NULL,
  `q` YEAR NULL,
  `r` BIGINT NULL,
  `s` REAL NULL,
  `t` BIT(1) NULL,
  PRIMARY KEY (`id`));



INSERT INTO `test`.`test`
  (`id`, `a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`, `l`, `m`, `n`, `o`, `p`, `q`, `r`, `s`, `t`)
  VALUES
  ('1', ?, ?, ?, '2', '5', '2', '2', '{"a": 5}', '242', '\'merhaba\'', '\'asdfasdfasd\'', ?, CURDATE(), CURDATE(), '16:54', CURDATE(), 2014, '2342342', '23523523', 1);
