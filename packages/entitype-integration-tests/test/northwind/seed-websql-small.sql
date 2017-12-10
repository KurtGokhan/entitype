
DROP TABLE IF EXISTS [Categories];
CREATE TABLE [Categories]
(      [CategoryID] INTEGER PRIMARY KEY AUTOINCREMENT,
       [CategoryName] TEXT,
       [Description] TEXT,
       [Picture] BLOB
);

INSERT INTO Categories VALUES(null,'Beverages','Soft drinks, coffees, teas, beers, and ales',null);
INSERT INTO Categories VALUES(null,'Condiments','Sweet and savory sauces, relishes, spreads, and seasonings',null);
INSERT INTO Categories VALUES(null,'Confections','Desserts, candies, and sweet breads',null);
INSERT INTO Categories VALUES(null,'Dairy Products','Cheeses',null);
INSERT INTO Categories VALUES(null,'Grains/Cereals','Breads, crackers, pasta, and cereal',null);
INSERT INTO Categories VALUES(null,'Meat/Poultry','Prepared meats',null);
INSERT INTO Categories VALUES(null,'Produce','Dried fruit and bean curd',null);
INSERT INTO Categories VALUES(null,'Seafood','Seaweed and fish',null);


DROP TABLE IF EXISTS [CustomerDemographics];
CREATE TABLE [CustomerDemographics](
   [CustomerTypeID]TEXT NOT NULL,
   [CustomerDesc]TEXT,
    PRIMARY KEY ("CustomerTypeID")
);

DROP TABLE IF EXISTS [CustomerCustomerDemo];
CREATE TABLE [CustomerCustomerDemo](
   [CustomerID]TEXT NOT NULL,
   [CustomerTypeID]TEXT NOT NULL,
   PRIMARY KEY ("CustomerID","CustomerTypeID"),
   FOREIGN KEY ([CustomerID]) REFERENCES [Customers] ([CustomerID])
		ON DELETE NO ACTION ON UPDATE NO ACTION,
	FOREIGN KEY ([CustomerTypeID]) REFERENCES [CustomerDemographics] ([CustomerTypeID])
		ON DELETE NO ACTION ON UPDATE NO ACTION
);


DROP TABLE IF EXISTS [Customers];
CREATE TABLE [Customers]
(      [CustomerID] TEXT,
       [CompanyName] TEXT,
       [ContactName] TEXT,
       [ContactTitle] TEXT,
       [Address] TEXT,
       [City] TEXT,
       [Region] TEXT,
       [PostalCode] TEXT,
       [Country] TEXT,
       [Phone] TEXT,
       [Fax] TEXT,
       PRIMARY KEY ("CustomerID")
);
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('ALFKI', 'Alfreds Futterkiste', 'Maria Anders', 'Sales Representative', 'Obere Str. 57', 'Berlin', NULL, '12209', 'Germany', '030-0074321', '030-0076545');
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('ANATR', 'Ana Trujillo Emparedados y helados', 'Ana Trujillo', 'Owner', 'Avda. de la Constituci�n 2222', 'M�xico D.F.', NULL, '05021', 'Mexico', '(5) 555-4729', '(5) 555-3745');
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('ANTON', 'Antonio Moreno Taquer�a', 'Antonio Moreno', 'Owner', 'Mataderos  2312', 'M�xico D.F.', NULL, '05023', 'Mexico', '(5) 555-3932', NULL);
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('AROUT', 'Around the Horn', 'Thomas Hardy', 'Sales Representative', '120 Hanover Sq.', 'London', NULL, 'WA1 1DP', 'UK', '(171) 555-7788', '(171) 555-6750');
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('BERGS', 'Berglunds snabbk�p', 'Christina Berglund', 'Order Administrator', 'Berguvsv�gen  8', 'Lule�', NULL, 'S-958 22', 'Sweden', '0921-12 34 65', '0921-12 34 67');
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('BLAUS', 'Blauer See Delikatessen', 'Hanna Moos', 'Sales Representative', 'Forsterstr. 57', 'Mannheim', NULL, '68306', 'Germany', '0621-08460', '0621-08924');
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('BLONP', 'Blondesddsl p�re et fils', 'Fr�d�rique Citeaux', 'Marketing Manager', '24, place Kl�ber', 'Strasbourg', NULL, '67000', 'France', '88.60.15.31', '88.60.15.32');
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('BOLID', 'B�lido Comidas preparadas', 'Mart�n Sommer', 'Owner', 'C/ Araquil, 67', 'Madrid', NULL, '28023', 'Spain', '(91) 555 22 82', '(91) 555 91 99');
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('BONAP', 'Bon app''', 'Laurence Lebihan', 'Owner', '12, rue des Bouchers', 'Marseille', NULL, '13008', 'France', '91.24.45.40', '91.24.45.41');
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('BOTTM', 'Bottom-Dollar Markets', 'Elizabeth Lincoln', 'Accounting Manager', '23 Tsawassen Blvd.', 'Tsawassen', 'BC', 'T2F 8M4', 'Canada', '(604) 555-4729', '(604) 555-3745');
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('BSBEV', 'B''s Beverages', 'Victoria Ashworth', 'Sales Representative', 'Fauntleroy Circus', 'London', NULL, 'EC2 5NT', 'UK', '(171) 555-1212', NULL);
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('CACTU', 'Cactus Comidas para llevar', 'Patricio Simpson', 'Sales Agent', 'Cerrito 333', 'Buenos Aires', NULL, '1010', 'Argentina', '(1) 135-5555', '(1) 135-4892');
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('CENTC', 'Centro comercial Moctezuma', 'Francisco Chang', 'Marketing Manager', 'Sierras de Granada 9993', 'M�xico D.F.', NULL, '05022', 'Mexico', '(5) 555-3392', '(5) 555-7293');
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('CHOPS', 'Chop-suey Chinese', 'Yang Wang', 'Owner', 'Hauptstr. 29', 'Bern', NULL, '3012', 'Switzerland', '0452-076545', NULL);
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('COMMI', 'Com�rcio Mineiro', 'Pedro Afonso', 'Sales Associate', 'Av. dos Lus�adas, 23', 'Sao Paulo', 'SP', '05432-043', 'Brazil', '(11) 555-7647', NULL);
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('CONSH', 'Consolidated Holdings', 'Elizabeth Brown', 'Sales Representative', 'Berkeley Gardens 12  Brewery', 'London', NULL, 'WX1 6LT', 'UK', '(171) 555-2282', '(171) 555-9199');
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('DRACD', 'Drachenblut Delikatessen', 'Sven Ottlieb', 'Order Administrator', 'Walserweg 21', 'Aachen', NULL, '52066', 'Germany', '0241-039123', '0241-059428');
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('DUMON', 'Du monde entier', 'Janine Labrune', 'Owner', '67, rue des Cinquante Otages', 'Nantes', NULL, '44000', 'France', '40.67.88.88', '40.67.89.89');
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('EASTC', 'Eastern Connection', 'Ann Devon', 'Sales Agent', '35 King George', 'London', NULL, 'WX3 6FW', 'UK', '(171) 555-0297', '(171) 555-3373');
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('ERNSH', 'Ernst Handel', 'Roland Mendel', 'Sales Manager', 'Kirchgasse 6', 'Graz', NULL, '8010', 'Austria', '7675-3425', '7675-3426');
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('FAMIA', 'Familia Arquibaldo', 'Aria Cruz', 'Marketing Assistant', 'Rua Or�s, 92', 'Sao Paulo', 'SP', '05442-030', 'Brazil', '(11) 555-9857', NULL);
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('FISSA', 'FISSA Fabrica Inter. Salchichas S.A.', 'Diego Roel', 'Accounting Manager', 'C/ Moralzarzal, 86', 'Madrid', NULL, '28034', 'Spain', '(91) 555 94 44', '(91) 555 55 93');
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('FOLIG', 'Folies gourmandes', 'Martine Ranc�', 'Assistant Sales Agent', '184, chauss�e de Tournai', 'Lille', NULL, '59000', 'France', '20.16.10.16', '20.16.10.17');
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('FOLKO', 'Folk och f� HB', 'Maria Larsson', 'Owner', '�kergatan 24', 'Br�cke', NULL, 'S-844 67', 'Sweden', '0695-34 67 21', NULL);
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('FRANK', 'Frankenversand', 'Peter Franken', 'Marketing Manager', 'Berliner Platz 43', 'M�nchen', NULL, '80805', 'Germany', '089-0877310', '089-0877451');
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('FRANR', 'France restauration', 'Carine Schmitt', 'Marketing Manager', '54, rue Royale', 'Nantes', NULL, '44000', 'France', '40.32.21.21', '40.32.21.20');
INSERT INTO Customers (CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax)
VALUES('FRANS', 'Franchi S.p.A.', 'Paolo Accorti', 'Sales Representative', 'Via Monte Bianco 34', 'Torino', NULL, '10100', 'Italy', '011-4988260', '011-4988261');


DROP TABLE IF EXISTS [Employees];

CREATE TABLE [Employees]
(      [EmployeeID] INTEGER PRIMARY KEY AUTOINCREMENT,
       [LastName] TEXT,
       [FirstName] TEXT,
       [Title] TEXT,
       [TitleOfCourtesy] TEXT,
       [BirthDate] DATE,
       [HireDate] DATE,
       [Address] TEXT,
       [City] TEXT,
       [Region] TEXT,
       [PostalCode] TEXT,
       [Country] TEXT,
       [HomePhone] TEXT,
       [Extension] TEXT,
       [Photo] BLOB,
       [Notes] TEXT,
       [ReportsTo] INTEGER,
       [PhotoPath] TEXT,
	   FOREIGN KEY ([EmployeeID]) REFERENCES [Employees] ([EmployeeID])
		ON DELETE NO ACTION ON UPDATE NO ACTION
);

INSERT INTO Employees VALUES(null,'Davolio','Nancy','Sales Representative','Ms.','1948-12-08','1992-05-01','507 - 20th Ave. E.Apt. 2A','Seattle','WA','98122','USA','(206) 555-9857','5467',null,'Education includes a BA in psychology from Colorado State University in 1970.  She also completed "The Art of the Cold Call."  Nancy is a member of Toastmasters International.',2
,'http://accweb/emmployees/davolio.bmp');
INSERT INTO Employees VALUES(null,'Fuller','Andrew','Vice President, Sales','Dr.','1952-02-19','1992-08-14','908 W. Capital Way','Tacoma','WA','98401','USA','(206) 555-9482','3457',null,'Andrew received his BTS commercial in 1974 and a Ph.D. in international marketing from the University of Dallas in 1981.  He is fluent in French and Italian and reads German.  He joined the company as a sales representative, was promoted to sales manager in January 1992 and to vice president of sales in March 1993.  Andrew is a member of the Sales Management Roundtable, the Seattle Chamber of Commerce, and the Pacific Rim Importers Association.',NULL
,'http://accweb/emmployees/fuller.bmp');
INSERT INTO Employees VALUES(null,'Leverling','Janet','Sales Representative','Ms.','1963-08-30','1992-04-01','722 Moss Bay Blvd.','Kirkland','WA','98033','USA','(206) 555-3412','3355',null,'Janet has a BS degree in chemistry from Boston College (1984).  She has also completed a certificate program in food retailing management.  Janet was hired as a sales associate in 1991 and promoted to sales representative in February 1992.',2
,'http://accweb/emmployees/leverling.bmp');
INSERT INTO Employees VALUES(null,'Peacock','Margaret','Sales Representative','Mrs.','1937-09-19','1993-05-03','4110 Old Redmond Rd.','Redmond','WA','98052','USA','(206) 555-8122','5176',null,'Margaret holds a BA in English literature from Concordia College (1958) and an MA from the American Institute of Culinary Arts (1966).  She was assigned to the London office temporarily from July through November 1992.',2
,'http://accweb/emmployees/peacock.bmp');
INSERT INTO Employees VALUES(null,'Buchanan','Steven','Sales Manager','Mr.','1955-03-04','1993-10-17','14 Garrett Hill','London',NULL,'SW1 8JR','UK','(71) 555-4848','3453',null,'Steven Buchanan graduated from St. Andrews University, Scotland, with a BSC degree in 1976.  Upon joining the company as a sales representative in 1992, he spent 6 months in an orientation program at the Seattle office and then returned to his permanent post in London.  He was promoted to sales manager in March 1993.  Mr. Buchanan has completed the courses "Successful Telemarketing" and "International Sales Management."  He is fluent in French.',2
,'http://accweb/emmployees/buchanan.bmp');
INSERT INTO Employees VALUES(null,'Suyama','Michael','Sales Representative','Mr.','1963-07-02','1993-10-17','Coventry House
Miner Rd.','London',NULL,'EC2 7JR','UK','(71) 555-7773','428',null,'Michael is a graduate of Sussex University (MA, economics, 1983) and the University of California at Los Angeles (MBA, marketing, 1986).  He has also taken the courses "Multi-Cultural Selling" and "Time Management for the Sales Professional."  He is fluent in Japanese and can read and write French, Portuguese, and Spanish.',5
,'http://accweb/emmployees/davolio.bmp');
INSERT INTO Employees VALUES(null,'King','Robert','Sales Representative','Mr.','1960-05-29','1994-01-02','Edgeham Hollow
Winchester Way','London',NULL,'RG1 9SP','UK','(71) 555-5598','465',null,'Robert King served in the Peace Corps and traveled extensively before completing his degree in English at the University of Michigan in 1992, the year he joined the company.  After completing a course entitled "Selling in Europe," he was transferred to the London office in March 1993.',5
,'http://accweb/emmployees/davolio.bmp');
INSERT INTO Employees VALUES(null,'Callahan','Laura','Inside Sales Coordinator','Ms.','1958-01-09','1994-03-05','4726 - 11th Ave. N.E.','Seattle','WA','98105','USA','(206) 555-1189','2344',null,'Laura received a BA in psychology from the University of Washington.  She has also completed a course in business French.  She reads and writes French.',2
,'http://accweb/emmployees/davolio.bmp');
INSERT INTO Employees VALUES(null,'Dodsworth','Anne','Sales Representative','Ms.','1966-01-27','1994-11-15','7 Houndstooth Rd.','London',NULL,'WG2 7LT','UK','(71) 555-4444','452',null,'Anne has a BA degree in English from St. Lawrence College.  She is fluent in French and German.',5
,'http://accweb/emmployees/davolio.bmp');




DROP TABLE IF EXISTS [EmployeeTerritories];
CREATE TABLE [EmployeeTerritories](
   [EmployeeID]INTEGER NOT NULL,
   [TerritoryID]TEXT NOT NULL,
    PRIMARY KEY ("EmployeeID","TerritoryID"),
	FOREIGN KEY ([EmployeeID]) REFERENCES [Employees] ([EmployeeID])
		ON DELETE NO ACTION ON UPDATE NO ACTION,
	FOREIGN KEY ([TerritoryID]) REFERENCES [Territories] ([TerritoryID])
		ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(1, '06897');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(1, '19713');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(2, '01581');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(2, '01730');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(2, '01833');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(2, '02116');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(2, '02139');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(2, '02184');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(2, '40222');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(3, '30346');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(3, '31406');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(3, '32859');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(3, '33607');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(4, '20852');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(4, '27403');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(4, '27511');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(5, '02903');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(5, '07960');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(5, '08837');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(5, '10019');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(5, '10038');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(5, '11747');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(5, '14450');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(6, '85014');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(6, '85251');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(6, '98004');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(6, '98052');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(6, '98104');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(7, '60179');
INSERT INTO EmployeeTerritories (EmployeeID, TerritoryID)
VALUES(7, '60601');


DROP TABLE IF EXISTS[Order Details];
CREATE TABLE [Order Details](
   [OrderID]INTEGER NOT NULL,
   [ProductID]INTEGER NOT NULL,
   [UnitPrice]NUMERIC NOT NULL DEFAULT 0,
   [Quantity]INTEGER NOT NULL DEFAULT 1,
   [Discount]REAL NOT NULL DEFAULT 0,
    PRIMARY KEY ("OrderID","ProductID"),
    CHECK ([Discount]>=(0) AND [Discount]<=(1)),
    CHECK ([Quantity]>(0)),
    CHECK ([UnitPrice]>=(0)),
	FOREIGN KEY ([OrderID]) REFERENCES [Orders] ([OrderID])
		ON DELETE NO ACTION ON UPDATE NO ACTION,
	FOREIGN KEY ([ProductID]) REFERENCES [Products] ([ProductID])
		ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10248, 11, 14, 12, 0.0);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10248, 42, 9.8, 10, 0.0);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10248, 72, 34.8, 5, 0.0);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10249, 14, 18.6, 9, 0.0);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10249, 51, 42.4, 40, 0.0);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10250, 41, 7.7, 10, 0.0);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10250, 51, 42.4, 35, 0.15);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10250, 65, 16.8, 15, 0.15);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10251, 22, 16.8, 6, 0.05);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10251, 57, 15.6, 15, 0.05);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10251, 65, 16.8, 20, 0.0);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10252, 20, 64.8, 40, 0.05);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10252, 33, 2, 25, 0.05);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10252, 60, 27.2, 40, 0.0);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10253, 31, 10, 20, 0.0);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10253, 39, 14.4, 42, 0.0);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10253, 49, 16, 40, 0.0);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10254, 24, 3.6, 15, 0.15);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10254, 55, 19.2, 21, 0.15);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10254, 74, 8, 21, 0.0);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10255, 2, 15.2, 20, 0.0);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10255, 16, 13.9, 35, 0.0);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10255, 36, 15.2, 25, 0.0);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10255, 59, 44, 30, 0.0);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10256, 53, 26.2, 15, 0.0);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10256, 77, 10.4, 12, 0.0);
INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
VALUES(10257, 27, 35.1, 25, 0.0);


DROP TABLE IF EXISTS [Orders];
CREATE TABLE [Orders](
   [OrderID]INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
   [CustomerID]TEXT,
   [EmployeeID]INTEGER,
   [OrderDate]DATETIME,
   [RequiredDate]DATETIME,
   [ShippedDate]DATETIME,
   [ShipVia]INTEGER,
   [Freight]NUMERIC DEFAULT 0,
   [ShipName]TEXT,
   [ShipAddress]TEXT,
   [ShipCity]TEXT,
   [ShipRegion]TEXT,
   [ShipPostalCode]TEXT,
   [ShipCountry]TEXT,
   FOREIGN KEY ([EmployeeID]) REFERENCES [Employees] ([EmployeeID])
		ON DELETE NO ACTION ON UPDATE NO ACTION,
	FOREIGN KEY ([CustomerID]) REFERENCES [Customers] ([CustomerID])
		ON DELETE NO ACTION ON UPDATE NO ACTION,
	FOREIGN KEY ([ShipVia]) REFERENCES [Shippers] ([ShipperID])
		ON DELETE NO ACTION ON UPDATE NO ACTION
);




INSERT INTO Orders  Values ('10248','VINET',5,'1996-07-04 00:00:00.000','1996-08-01 00:00:00.000','1996-07-16 00:00:00.000',3,32.38,'Vins et alcools Chevalier','59 rue de l-Abbaye','Reims',NULL,'51100','France');
INSERT INTO Orders  Values ('10249','TOMSP',6,'1996-07-05 00:00:00.000','1996-08-16 00:00:00.000','1996-07-10 00:00:00.000',1,11.61,'Toms Spezialit�ten','Luisenstr. 48','M�nster',NULL,'44087','Germany');
INSERT INTO Orders  Values ('10250','HANAR',4,'1996-07-08 00:00:00.000','1996-08-05 00:00:00.000','1996-07-12 00:00:00.000',2,65.83,'Hanari Carnes','Rua do Pa�o, 67','Rio de Janeiro','RJ','05454-876','Brazil');
INSERT INTO Orders  Values ('10251','VICTE',3,'1996-07-08 00:00:00.000','1996-08-05 00:00:00.000','1996-07-15 00:00:00.000',1,41.34,'Victuailles en stock','2, rue du Commerce','Lyon',NULL,'69004','France');
INSERT INTO Orders  Values ('10252','SUPRD',4,'1996-07-09 00:00:00.000','1996-08-06 00:00:00.000','1996-07-11 00:00:00.000',2,51.3,'Supr�mes d�lices','Boulevard Tirou, 255','Charleroi',NULL,'B-6000','Belgium');
INSERT INTO Orders  Values ('10253','HANAR',3,'1996-07-10 00:00:00.000','1996-07-24 00:00:00.000','1996-07-16 00:00:00.000',2,58.17,'Hanari Carnes','Rua do Pa�o, 67','Rio de Janeiro','RJ','05454-876','Brazil');
INSERT INTO Orders  Values ('10254','CHOPS',5,'1996-07-11 00:00:00.000','1996-08-08 00:00:00.000','1996-07-23 00:00:00.000',2,22.98,'Chop-suey Chinese','Hauptstr. 31','Bern',NULL,'3012','Switzerland');
INSERT INTO Orders  Values ('10255','RICSU',9,'1996-07-12 00:00:00.000','1996-08-09 00:00:00.000','1996-07-15 00:00:00.000',3,148.33,'Richter Supermarkt','Starenweg 5','Gen�ve',NULL,'1204','Switzerland');
INSERT INTO Orders  Values ('10256','WELLI',3,'1996-07-15 00:00:00.000','1996-08-12 00:00:00.000','1996-07-17 00:00:00.000',2,13.97,'Wellington Importadora','Rua do Mercado, 12','Resende','SP','08737-363','Brazil');
INSERT INTO Orders  Values ('10257','HILAA',4,'1996-07-16 00:00:00.000','1996-08-13 00:00:00.000','1996-07-22 00:00:00.000',3,81.91,'HILARION-Abastos','Carrera 22 con Ave. Carlos Soublette #8-35','San Crist�bal','T�chira','5022','Venezuela');
INSERT INTO Orders  Values ('10258','ERNSH',1,'1996-07-17 00:00:00.000','1996-08-14 00:00:00.000','1996-07-23 00:00:00.000',1,140.51,'Ernst Handel','Kirchgasse 6','Graz',NULL,'8010','Austria');
INSERT INTO Orders  Values ('10259','CENTC',4,'1996-07-18 00:00:00.000','1996-08-15 00:00:00.000','1996-07-25 00:00:00.000',3,3.25,'Centro comercial Moctezuma','Sierras de Granada 9993','M�xico D.F.',NULL,'5022','Mexico');
INSERT INTO Orders  Values ('10260','OTTIK',4,'1996-07-19 00:00:00.000','1996-08-16 00:00:00.000','1996-07-29 00:00:00.000',1,55.09,'Ottilies K�seladen','Mehrheimerstr. 369','K�ln',NULL,'50739','Germany');
INSERT INTO Orders  Values ('10261','QUEDE',4,'1996-07-19 00:00:00.000','1996-08-16 00:00:00.000','1996-07-30 00:00:00.000',2,3.05,'Que Del�cia','Rua da Panificadora, 12','Rio de Janeiro','RJ','02389-673','Brazil');
INSERT INTO Orders  Values ('10262','RATTC',8,'1996-07-22 00:00:00.000','1996-08-19 00:00:00.000','1996-07-25 00:00:00.000',3,48.29,'Rattlesnake Canyon Grocery','2817 Milton Dr.','Albuquerque','NM','87110','USA');
INSERT INTO Orders  Values ('10263','ERNSH',9,'1996-07-23 00:00:00.000','1996-08-20 00:00:00.000','1996-07-31 00:00:00.000',3,146.06,'Ernst Handel','Kirchgasse 6','Graz',NULL,'8010','Austria');
INSERT INTO Orders  Values ('10264','FOLKO',6,'1996-07-24 00:00:00.000','1996-08-21 00:00:00.000','1996-08-23 00:00:00.000',3,3.67,'Folk och f� HB','�kergatan 24','Br�cke',NULL,'S-844 67','Sweden');
INSERT INTO Orders  Values ('10265','BLONP',2,'1996-07-25 00:00:00.000','1996-08-22 00:00:00.000','1996-08-12 00:00:00.000',1,55.28,'Blondel p�re et fils','24, place Kl�ber','Strasbourg',NULL,'67000','France');
INSERT INTO Orders  Values ('10266','WARTH',3,'1996-07-26 00:00:00.000','1996-09-06 00:00:00.000','1996-07-31 00:00:00.000',3,25.73,'Wartian Herkku','Torikatu 38','Oulu',NULL,'90110','Finland');
INSERT INTO Orders  Values ('10267','FRANK',4,'1996-07-29 00:00:00.000','1996-08-26 00:00:00.000','1996-08-06 00:00:00.000',1,208.58,'Frankenversand','Berliner Platz 43','M�nchen',NULL,'80805','Germany');
INSERT INTO Orders  Values ('10268','GROSR',8,'1996-07-30 00:00:00.000','1996-08-27 00:00:00.000','1996-08-02 00:00:00.000',3,66.29,'GROSELLA-Restaurante','5� Ave. Los Palos Grandes','Caracas','DF','1081','Venezuela');
INSERT INTO Orders  Values ('10269','WHITC',5,'1996-07-31 00:00:00.000','1996-08-14 00:00:00.000','1996-08-09 00:00:00.000',1,4.56,'White Clover Markets','1029 - 12th Ave. S.','Seattle','WA','98124','USA');
INSERT INTO Orders  Values ('10270','WARTH',1,'1996-08-01 00:00:00.000','1996-08-29 00:00:00.000','1996-08-02 00:00:00.000',1,136.54,'Wartian Herkku','Torikatu 38','Oulu',NULL,'90110','Finland');
INSERT INTO Orders  Values ('10271','SPLIR',6,'1996-08-01 00:00:00.000','1996-08-29 00:00:00.000','1996-08-30 00:00:00.000',2,4.54,'Split Rail Beer & Ale','P.O. Box 555','Lander','WY','82520','USA');
INSERT INTO Orders  Values ('10272','RATTC',6,'1996-08-02 00:00:00.000','1996-08-30 00:00:00.000','1996-08-06 00:00:00.000',2,98.03,'Rattlesnake Canyon Grocery','2817 Milton Dr.','Albuquerque','NM','87110','USA');
INSERT INTO Orders  Values ('10273','QUICK',3,'1996-08-05 00:00:00.000','1996-09-02 00:00:00.000','1996-08-12 00:00:00.000',3,76.07,'QUICK-Stop','Taucherstra�e 10','Cunewalde',NULL,'1307','Germany');
INSERT INTO Orders  Values ('10274','VINET',6,'1996-08-06 00:00:00.000','1996-09-03 00:00:00.000','1996-08-16 00:00:00.000',1,6.01,'Vins et alcools Chevalier','59 rue de l-Abbaye','Reims',NULL,'51100','France');
INSERT INTO Orders  Values ('10275','MAGAA',1,'1996-08-07 00:00:00.000','1996-09-04 00:00:00.000','1996-08-09 00:00:00.000',1,26.93,'Magazzini Alimentari Riuniti','Via Ludovico il Moro 22','Bergamo',NULL,'24100','Italy');
INSERT INTO Orders  Values ('10276','TORTU',8,'1996-08-08 00:00:00.000','1996-08-22 00:00:00.000','1996-08-14 00:00:00.000',3,13.84,'Tortuga Restaurante','Avda. Azteca 123','M�xico D.F.',NULL,'5033','Mexico');
INSERT INTO Orders  Values ('10277','MORGK',2,'1996-08-09 00:00:00.000','1996-09-06 00:00:00.000','1996-08-13 00:00:00.000',3,125.77,'Morgenstern Gesundkost','Heerstr. 22','Leipzig',NULL,'4179','Germany');
INSERT INTO Orders  Values ('10278','BERGS',8,'1996-08-12 00:00:00.000','1996-09-09 00:00:00.000','1996-08-16 00:00:00.000',2,92.69,'Berglunds snabbk�p','Berguvsv�gen �8','Lule�',NULL,'S-958 22','Sweden');
INSERT INTO Orders  Values ('10279','LEHMS',8,'1996-08-13 00:00:00.000','1996-09-10 00:00:00.000','1996-08-16 00:00:00.000',2,25.83,'Lehmanns Marktstand','Magazinweg 7','Frankfurt a.M.',NULL,'60528','Germany');
INSERT INTO Orders  Values ('10280','BERGS',2,'1996-08-14 00:00:00.000','1996-09-11 00:00:00.000','1996-09-12 00:00:00.000',1,8.98,'Berglunds snabbk�p','Berguvsv�gen �8','Lule�',NULL,'S-958 22','Sweden');
INSERT INTO Orders  Values ('10281','ROMEY',4,'1996-08-14 00:00:00.000','1996-08-28 00:00:00.000','1996-08-21 00:00:00.000',1,2.94,'Romero y tomillo','Gran V�a, 1','Madrid',NULL,'28001','Spain');
INSERT INTO Orders  Values ('10282','ROMEY',4,'1996-08-15 00:00:00.000','1996-09-12 00:00:00.000','1996-08-21 00:00:00.000',1,12.69,'Romero y tomillo','Gran V�a, 1','Madrid',NULL,'28001','Spain');
INSERT INTO Orders  Values ('10283','LILAS',3,'1996-08-16 00:00:00.000','1996-09-13 00:00:00.000','1996-08-23 00:00:00.000',3,84.81,'LILA-Supermercado','Carrera 52 con Ave. Bol�var #65-98 Llano Largo','Barquisimeto','Lara','3508','Venezuela');
INSERT INTO Orders  Values ('10284','LEHMS',4,'1996-08-19 00:00:00.000','1996-09-16 00:00:00.000','1996-08-27 00:00:00.000',1,76.56,'Lehmanns Marktstand','Magazinweg 7','Frankfurt a.M.',NULL,'60528','Germany');
INSERT INTO Orders  Values ('10285','QUICK',1,'1996-08-20 00:00:00.000','1996-09-17 00:00:00.000','1996-08-26 00:00:00.000',2,76.83,'QUICK-Stop','Taucherstra�e 10','Cunewalde',NULL,'1307','Germany');
INSERT INTO Orders  Values ('10286','QUICK',8,'1996-08-21 00:00:00.000','1996-09-18 00:00:00.000','1996-08-30 00:00:00.000',3,229.24,'QUICK-Stop','Taucherstra�e 10','Cunewalde',NULL,'1307','Germany');
INSERT INTO Orders  Values ('10287','RICAR',8,'1996-08-22 00:00:00.000','1996-09-19 00:00:00.000','1996-08-28 00:00:00.000',3,12.76,'Ricardo Adocicados','Av. Copacabana, 267','Rio de Janeiro','RJ','02389-890','Brazil');
INSERT INTO Orders  Values ('10288','REGGC',4,'1996-08-23 00:00:00.000','1996-09-20 00:00:00.000','1996-09-03 00:00:00.000',1,7.45,'Reggiani Caseifici','Strada Provinciale 124','Reggio Emilia',NULL,'42100','Italy');
INSERT INTO Orders  Values ('10289','BSBEV',7,'1996-08-26 00:00:00.000','1996-09-23 00:00:00.000','1996-08-28 00:00:00.000',3,22.77,'B-s Beverages','Fauntleroy Circus','London',NULL,'EC2 5NT','UK');
INSERT INTO Orders  Values ('10290','COMMI',8,'1996-08-27 00:00:00.000','1996-09-24 00:00:00.000','1996-09-03 00:00:00.000',1,79.7,'Com�rcio Mineiro','Av. dos Lus�adas, 23','Sao Paulo','SP','05432-043','Brazil');
INSERT INTO Orders  Values ('10291','QUEDE',6,'1996-08-27 00:00:00.000','1996-09-24 00:00:00.000','1996-09-04 00:00:00.000',2,6.4,'Que Del�cia','Rua da Panificadora, 12','Rio de Janeiro','RJ','02389-673','Brazil');
INSERT INTO Orders  Values ('10292','TRADH',1,'1996-08-28 00:00:00.000','1996-09-25 00:00:00.000','1996-09-02 00:00:00.000',2,1.35,'Tradi�ao Hipermercados','Av. In�s de Castro, 414','Sao Paulo','SP','05634-030','Brazil');
INSERT INTO Orders  Values ('10293','TORTU',1,'1996-08-29 00:00:00.000','1996-09-26 00:00:00.000','1996-09-11 00:00:00.000',3,21.18,'Tortuga Restaurante','Avda. Azteca 123','M�xico D.F.',NULL,'5033','Mexico');
INSERT INTO Orders  Values ('10294','RATTC',4,'1996-08-30 00:00:00.000','1996-09-27 00:00:00.000','1996-09-05 00:00:00.000',2,147.26,'Rattlesnake Canyon Grocery','2817 Milton Dr.','Albuquerque','NM','87110','USA');
INSERT INTO Orders  Values ('10295','VINET',2,'1996-09-02 00:00:00.000','1996-09-30 00:00:00.000','1996-09-10 00:00:00.000',2,1.15,'Vins et alcools Chevalier','59 rue de l-Abbaye','Reims',NULL,'51100','France');
INSERT INTO Orders  Values ('10296','LILAS',6,'1996-09-03 00:00:00.000','1996-10-01 00:00:00.000','1996-09-11 00:00:00.000',1,0.12,'LILA-Supermercado','Carrera 52 con Ave. Bol�var #65-98 Llano Largo','Barquisimeto','Lara','3508','Venezuela');
INSERT INTO Orders  Values ('10297','BLONP',5,'1996-09-04 00:00:00.000','1996-10-16 00:00:00.000','1996-09-10 00:00:00.000',2,5.74,'Blondel p�re et fils','24, place Kl�ber','Strasbourg',NULL,'67000','France');
INSERT INTO Orders  Values ('10298','HUNGO',6,'1996-09-05 00:00:00.000','1996-10-03 00:00:00.000','1996-09-11 00:00:00.000',2,168.22,'Hungry Owl All-Night Grocers','8 Johnstown Road','Cork','Co. Cork',NULL,'Ireland');
INSERT INTO Orders  Values ('10299','RICAR',4,'1996-09-06 00:00:00.000','1996-10-04 00:00:00.000','1996-09-13 00:00:00.000',2,29.76,'Ricardo Adocicados','Av. Copacabana, 267','Rio de Janeiro','RJ','02389-890','Brazil');
INSERT INTO Orders  Values ('10300','MAGAA',2,'1996-09-09 00:00:00.000','1996-10-07 00:00:00.000','1996-09-18 00:00:00.000',2,17.68,'Magazzini Alimentari Riuniti','Via Ludovico il Moro 22','Bergamo',NULL,'24100','Italy');
INSERT INTO Orders  Values ('10301','WANDK',8,'1996-09-09 00:00:00.000','1996-10-07 00:00:00.000','1996-09-17 00:00:00.000',2,45.08,'Die Wandernde Kuh','Adenauerallee 900','Stuttgart',NULL,'70563','Germany');
INSERT INTO Orders  Values ('10302','SUPRD',4,'1996-09-10 00:00:00.000','1996-10-08 00:00:00.000','1996-10-09 00:00:00.000',2,6.27,'Supr�mes d�lices','Boulevard Tirou, 255','Charleroi',NULL,'B-6000','Belgium');
INSERT INTO Orders  Values ('10303','GODOS',7,'1996-09-11 00:00:00.000','1996-10-09 00:00:00.000','1996-09-18 00:00:00.000',2,107.83,'Godos Cocina T�pica','C/ Romero, 33','Sevilla',NULL,'41101','Spain');
INSERT INTO Orders  Values ('10304','TORTU',1,'1996-09-12 00:00:00.000','1996-10-10 00:00:00.000','1996-09-17 00:00:00.000',2,63.79,'Tortuga Restaurante','Avda. Azteca 123','M�xico D.F.',NULL,'5033','Mexico');
INSERT INTO Orders  Values ('10305','OLDWO',8,'1996-09-13 00:00:00.000','1996-10-11 00:00:00.000','1996-10-09 00:00:00.000',3,257.62,'Old World Delicatessen','2743 Bering St.','Anchorage','AK','99508','USA');
INSERT INTO Orders  Values ('10306','ROMEY',1,'1996-09-16 00:00:00.000','1996-10-14 00:00:00.000','1996-09-23 00:00:00.000',3,7.56,'Romero y tomillo','Gran V�a, 1','Madrid',NULL,'28001','Spain');
INSERT INTO Orders  Values ('10307','LONEP',2,'1996-09-17 00:00:00.000','1996-10-15 00:00:00.000','1996-09-25 00:00:00.000',2,0.56,'Lonesome Pine Restaurant','89 Chiaroscuro Rd.','Portland','OR','97219','USA');
INSERT INTO Orders  Values ('10308','ANATR',7,'1996-09-18 00:00:00.000','1996-10-16 00:00:00.000','1996-09-24 00:00:00.000',3,1.61,'Ana Trujillo Emparedados y helados','Avda. de la Constituci�n 2222','M�xico D.F.',NULL,'5021','Mexico');
INSERT INTO Orders  Values ('10309','HUNGO',3,'1996-09-19 00:00:00.000','1996-10-17 00:00:00.000','1996-10-23 00:00:00.000',1,47.3,'Hungry Owl All-Night Grocers','8 Johnstown Road','Cork','Co. Cork',NULL,'Ireland');
INSERT INTO Orders  Values ('10310','THEBI',8,'1996-09-20 00:00:00.000','1996-10-18 00:00:00.000','1996-09-27 00:00:00.000',2,17.52,'The Big Cheese','89 Jefferson Way Suite 2','Portland','OR','97201','USA');
INSERT INTO Orders  Values ('10311','DUMON',1,'1996-09-20 00:00:00.000','1996-10-04 00:00:00.000','1996-09-26 00:00:00.000',3,24.69,'Du monde entier','67, rue des Cinquante Otages','Nantes',NULL,'44000','France');
INSERT INTO Orders  Values ('10312','WANDK',2,'1996-09-23 00:00:00.000','1996-10-21 00:00:00.000','1996-10-03 00:00:00.000',2,40.26,'Die Wandernde Kuh','Adenauerallee 900','Stuttgart',NULL,'70563','Germany');
INSERT INTO Orders  Values ('10313','QUICK',2,'1996-09-24 00:00:00.000','1996-10-22 00:00:00.000','1996-10-04 00:00:00.000',2,1.96,'QUICK-Stop','Taucherstra�e 10','Cunewalde',NULL,'1307','Germany');
INSERT INTO Orders  Values ('10314','RATTC',1,'1996-09-25 00:00:00.000','1996-10-23 00:00:00.000','1996-10-04 00:00:00.000',2,74.16,'Rattlesnake Canyon Grocery','2817 Milton Dr.','Albuquerque','NM','87110','USA');


DROP TABLE IF EXISTS [Products];
CREATE TABLE [Products](
   [ProductID]INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
   [ProductName]TEXT NOT NULL,
   [SupplierID]INTEGER,
   [CategoryID]INTEGER,
   [QuantityPerUnit]TEXT,
   [UnitPrice]NUMERIC DEFAULT 0,
   [UnitsInStock]INTEGER DEFAULT 0,
   [UnitsOnOrder]INTEGER DEFAULT 0,
   [ReorderLevel]INTEGER DEFAULT 0,
   [Discontinued]TEXT NOT NULL DEFAULT '0',
    CHECK ([UnitPrice]>=(0)),
    CHECK ([ReorderLevel]>=(0)),
    CHECK ([UnitsInStock]>=(0)),
    CHECK ([UnitsOnOrder]>=(0)),
	FOREIGN KEY ([ProductID]) REFERENCES [Categories] ([CategoryID])
		ON DELETE NO ACTION ON UPDATE NO ACTION,
	FOREIGN KEY ([SupplierID]) REFERENCES [Suppliers] ([SupplierID])
		ON DELETE NO ACTION ON UPDATE NO ACTION
);



INSERT INTO Products (ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)
VALUES(1, 'Chai', 1, 1, '10 boxes x 20 bags', 18, 39, 0, 10, 0);
INSERT INTO Products (ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)
VALUES(2, 'Chang', 1, 1, '24 - 12 oz bottles', 19, 17, 40, 25, 0);
INSERT INTO Products (ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)
VALUES(3, 'Aniseed Syrup', 1, 2, '12 - 550 ml bottles', 10, 13, 70, 25, 0);
INSERT INTO Products (ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)
VALUES(4, 'Chef Anton''s Cajun Seasoning', 2, 2, '48 - 6 oz jars', 22, 53, 0, 0, 0);
INSERT INTO Products (ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)
VALUES(5, 'Chef Anton''s Gumbo Mix', 2, 2, '36 boxes', 21.35, 0, 0, 0, 1);
INSERT INTO Products (ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)
VALUES(6, 'Grandma''s Boysenberry Spread', 3, 2, '12 - 8 oz jars', 25, 120, 0, 25, 0);
INSERT INTO Products (ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)
VALUES(7, 'Uncle Bob''s Organic Dried Pears', 3, 7, '12 - 1 lb pkgs.', 30, 15, 0, 10, 0);
INSERT INTO Products (ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)
VALUES(8, 'Northwoods Cranberry Sauce', 3, 2, '12 - 12 oz jars', 40, 6, 0, 0, 0);
INSERT INTO Products (ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)
VALUES(9, 'Mishi Kobe Niku', 4, 6, '18 - 500 g pkgs.', 97, 29, 0, 0, 1);
INSERT INTO Products (ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)
VALUES(10, 'Ikura', 4, 8, '12 - 200 ml jars', 31, 31, 0, 0, 0);
INSERT INTO Products (ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)
VALUES(11, 'Queso Cabrales', 5, 4, '1 kg pkg.', 21, 22, 30, 30, 0);
INSERT INTO Products (ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)
VALUES(12, 'Queso Manchego La Pastora', 5, 4, '10 - 500 g pkgs.', 38, 86, 0, 0, 0);
INSERT INTO Products (ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)
VALUES(13, 'Konbu', 6, 8, '2 kg box', 6, 24, 0, 5, 0);
INSERT INTO Products (ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)
VALUES(14, 'Tofu', 6, 7, '40 - 100 g pkgs.', 23.25, 35, 0, 0, 0);
INSERT INTO Products (ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)
VALUES(15, 'Genen Shouyu', 6, 2, '24 - 250 ml bottles', 15.5, 39, 0, 5, 0);
INSERT INTO Products (ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)
VALUES(16, 'Pavlova', 7, 3, '32 - 500 g boxes', 17.45, 29, 0, 10, 0);
INSERT INTO Products (ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)
VALUES(17, 'Alice Mutton', 7, 6, '20 - 1 kg tins', 39, 0, 0, 0, 1);
INSERT INTO Products (ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)
VALUES(18, 'Carnarvon Tigers', 7, 8, '16 kg pkg.', 62.5, 42, 0, 0, 0);
INSERT INTO Products (ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)
VALUES(19, 'Teatime Chocolate Biscuits', 8, 3, '10 boxes x 12 pieces', 9.2, 25, 0, 5, 0);
INSERT INTO Products (ProductID, ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued)
VALUES(20, 'Sir Rodney''s Marmalade', 8, 3, '30 gift boxes', 81, 40, 0, 0, 0);


DROP TABLE IF EXISTS [Regions];
CREATE TABLE [Regions](
   [RegionID]INTEGER NOT NULL PRIMARY KEY,
   [RegionDescription]TEXT NOT NULL
);
INSERT INTO Regions (RegionID, RegionDescription)
VALUES(1, 'Eastern                                           ');
INSERT INTO Regions (RegionID, RegionDescription)
VALUES(2, 'Westerns                                           ');
INSERT INTO Regions (RegionID, RegionDescription)
VALUES(3, 'Northern                                          ');
INSERT INTO Regions (RegionID, RegionDescription)
VALUES(4, 'Southern                                          ');


DROP TABLE IF EXISTS[Shippers];
CREATE TABLE [Shippers](
   [ShipperID]INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
   [CompanyName]TEXT NOT NULL,
   [Phone]TEXT
);
INSERT INTO Shippers (ShipperID, CompanyName, Phone)
VALUES(1, 'Speedy Express', '(503) 555-9831');
INSERT INTO Shippers (ShipperID, CompanyName, Phone)
VALUES(2, 'United Package', '(503) 555-3199');
INSERT INTO Shippers (ShipperID, CompanyName, Phone)
VALUES(3, 'Federal Shipping', '(503) 555-9931');


DROP TABLE IF EXISTS [Suppliers];
CREATE TABLE [Suppliers](
   [SupplierID]INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
   [CompanyName]TEXT NOT NULL,
   [ContactName]TEXT,
   [ContactTitle]TEXT,
   [Address]TEXT,
   [City]TEXT,
   [Region]TEXT,
   [PostalCode]TEXT,
   [Country]TEXT,
   [Phone]TEXT,
   [Fax]TEXT,
   [HomePage]TEXT
);
INSERT INTO Suppliers VALUES(1,'Exotic Liquids','Charlotte Cooper','Purchasing Manager','49 Gilbert St.','London',NULL,'EC1 4SD','UK','(171) 555-2222',NULL,NULL);
INSERT INTO Suppliers VALUES(2,'New Orleans Cajun Delights','Shelley Burke','Order Administrator','P.O. Box 78934','New Orleans','LA','70117','USA','(100) 555-4822',NULL,'#CAJUN.HTM#');
INSERT INTO Suppliers VALUES(3,'Grandma Kelly''s Homestead','Regina Murphy','Sales Representative','707 Oxford Rd.','Ann Arbor','MI','48104','USA','(313) 555-5735','(313) 555-3349',NULL);
INSERT INTO Suppliers VALUES(4,'Tokyo Traders','Yoshi Nagase','Marketing Manager','9-8 Sekimai
Musashino-shi','Tokyo',NULL,'100','Japan','(03) 3555-5011',NULL,NULL);
INSERT INTO Suppliers VALUES(5,'Cooperativa de Quesos ''Las Cabras''','Antonio del Valle Saavedra ','Export Administrator','Calle del Rosal 4','Oviedo','Asturias','33007','Spain','(98) 598 76 54',NULL,NULL);
INSERT INTO Suppliers VALUES(6,'Mayumi''s','Mayumi Ohno','Marketing Representative','92 Setsuko
Chuo-ku','Osaka',NULL,'545','Japan','(06) 431-7877',NULL,'Mayumi''s (on the World Wide Web)#http://www.microsoft.com/accessdev/sampleapps/mayumi.htm#');
INSERT INTO Suppliers VALUES(7,'Pavlova, Ltd.','Ian Devling','Marketing Manager','74 Rose St.
Moonie Ponds','Melbourne','Victoria','3058','Australia','(03) 444-2343','(03) 444-6588',NULL);
INSERT INTO Suppliers VALUES(8,'Specialty Biscuits, Ltd.','Peter Wilson','Sales Representative','29 King''s Way','Manchester',NULL,'M14 GSD','UK','(161) 555-4448',NULL,NULL);
INSERT INTO Suppliers VALUES(9,'PB Kn�ckebr�d AB','Lars Peterson','Sales Agent','Kaloadagatan 13','G�teborg',NULL,'S-345 67','Sweden ','031-987 65 43','031-987 65 91',NULL);
INSERT INTO Suppliers VALUES(10,'Refrescos Americanas LTDA','Carlos Diaz','Marketing Manager','Av. das Americanas 12.890','S�o Paulo',NULL,'5442','Brazil','(11) 555 4640',NULL,NULL);
INSERT INTO Suppliers VALUES(11,'Heli S��waren GmbH & Co. KG','Petra Winkler','Sales Manager','Tiergartenstra�e 5','Berlin',NULL,'10785','Germany','(010) 9984510',NULL,NULL);
INSERT INTO Suppliers VALUES(12,'Plutzer Lebensmittelgro�m�rkte AG','Martin Bein','International Marketing Mgr.','Bogenallee 51','Frankfurt',NULL,'60439','Germany','(069) 992755',NULL,'Plutzer (on the World Wide Web)#http://www.microsoft.com/accessdev/sampleapps/plutzer.htm#');
INSERT INTO Suppliers VALUES(13,'Nord-Ost-Fisch Handelsgesellschaft mbH','Sven Petersen','Coordinator Foreign Markets','Frahmredder 112a','Cuxhaven',NULL,'27478','Germany','(04721) 8713','(04721) 8714',NULL);
INSERT INTO Suppliers VALUES(14,'Formaggi Fortini s.r.l.','Elio Rossi','Sales Representative','Viale Dante, 75','Ravenna',NULL,'48100','Italy','(0544) 60323','(0544) 60603','#FORMAGGI.HTM#');
INSERT INTO Suppliers VALUES(15,'Norske Meierier','Beate Vileid','Marketing Manager','Hatlevegen 5','Sandvika',NULL,'1320','Norway','(0)2-953010',NULL,NULL);
INSERT INTO Suppliers VALUES(16,'Bigfoot Breweries','Cheryl Saylor','Regional Account Rep.','3400 - 8th Avenue
Suite 210','Bend','OR','97101','USA','(503) 555-9931',NULL,NULL);
INSERT INTO Suppliers VALUES(17,'Svensk Sj�f�da AB','Michael Bj�rn','Sales Representative','Brovallav�gen 231','Stockholm',NULL,'S-123 45','Sweden','08-123 45 67',NULL,NULL);
INSERT INTO Suppliers VALUES(18,'Aux joyeux eccl�siastiques','Guyl�ne Nodier','Sales Manager','203, Rue des Francs-Bourgeois','Paris',NULL,'75004','France','(1) 03.83.00.68','(1) 03.83.00.62',NULL);
INSERT INTO Suppliers VALUES(19,'New England Seafood Cannery','Robb Merchant','Wholesale Account Agent','Order Processing Dept.
2100 Paul Revere Blvd.','Boston','MA','02134','USA','(617) 555-3267','(617) 555-3389',NULL);
INSERT INTO Suppliers VALUES(20,'Leka Trading','Chandra Leka','Owner','471 Serangoon Loop, Suite #402','Singapore',NULL,'0512','Singapore','555-8787',NULL,NULL);
INSERT INTO Suppliers VALUES(21,'Lyngbysild','Niels Petersen','Sales Manager','Lyngbysild
Fiskebakken 10','Lyngby',NULL,'2800','Denmark','43844108','43844115',NULL);
INSERT INTO Suppliers VALUES(22,'Zaanse Snoepfabriek','Dirk Luchte','Accounting Manager','Verkoop
Rijnweg 22','Zaandam',NULL,'9999 ZZ','Netherlands','(12345) 1212','(12345) 1210',NULL);
INSERT INTO Suppliers VALUES(23,'Karkki Oy','Anne Heikkonen','Product Manager','Valtakatu 12','Lappeenranta',NULL,'53120','Finland','(953) 10956',NULL,NULL);
INSERT INTO Suppliers VALUES(24,'G''day, Mate','Wendy Mackenzie','Sales Representative','170 Prince Edward Parade
Hunter''s Hill','Sydney','NSW','2042','Australia','(02) 555-5914','(02) 555-4873','G''day Mate (on the World Wide Web)#http://www.microsoft.com/accessdev/sampleapps/gdaymate.htm#');
INSERT INTO Suppliers VALUES(25,'Ma Maison','Jean-Guy Lauzon','Marketing Manager','2960 Rue St. Laurent','Montr�al','Qu�bec','H1J 1C3','Canada','(514) 555-9022',NULL,NULL);
INSERT INTO Suppliers VALUES(26,'Pasta Buttini s.r.l.','Giovanni Giudici','Order Administrator','Via dei Gelsomini, 153','Salerno',NULL,'84100','Italy','(089) 6547665','(089) 6547667',NULL);
INSERT INTO Suppliers VALUES(27,'Escargots Nouveaux','Marie Delamare','Sales Manager','22, rue H. Voiron','Montceau',NULL,'71300','France','85.57.00.07',NULL,NULL);
INSERT INTO Suppliers VALUES(28,'Gai p�turage','Eliane Noz','Sales Representative','Bat. B
3, rue des Alpes','Annecy',NULL,'74000','France','38.76.98.06','38.76.98.58',NULL);
INSERT INTO Suppliers VALUES(29,'For�ts d''�rables','Chantal Goulet','Accounting Manager','148 rue Chasseur','Ste-Hyacinthe','Qu�bec','J2S 7S8','Canada','(514) 555-2955','(514) 555-2921',NULL);


DROP TABLE IF EXISTS[Territories];
CREATE TABLE [Territories](
   [TerritoryID]TEXT NOT NULL,
   [TerritoryDescription]TEXT NOT NULL,
   [RegionID]INTEGER NOT NULL,
    PRIMARY KEY ("TerritoryID"),
	FOREIGN KEY ([RegionID]) REFERENCES [Regions] ([RegionID])
		ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO Territories (TerritoryID, TerritoryDescription, RegionID)
VALUES('01581', 'Westboro                                          ', 1);
INSERT INTO Territories (TerritoryID, TerritoryDescription, RegionID)
VALUES('01730', 'Bedford                                           ', 1);
INSERT INTO Territories (TerritoryID, TerritoryDescription, RegionID)
VALUES('01833', 'Georgetow                                         ', 1);
INSERT INTO Territories (TerritoryID, TerritoryDescription, RegionID)
VALUES('02116', 'Boston                                            ', 1);
INSERT INTO Territories (TerritoryID, TerritoryDescription, RegionID)
VALUES('02139', 'Cambridge                                         ', 1);
INSERT INTO Territories (TerritoryID, TerritoryDescription, RegionID)
VALUES('02184', 'Braintree                                         ', 1);
INSERT INTO Territories (TerritoryID, TerritoryDescription, RegionID)
VALUES('02903', 'Providence                                        ', 1);
INSERT INTO Territories (TerritoryID, TerritoryDescription, RegionID)
VALUES('03049', 'Hollis                                            ', 3);
INSERT INTO Territories (TerritoryID, TerritoryDescription, RegionID)
VALUES('03801', 'Portsmouth                                        ', 3);
INSERT INTO Territories (TerritoryID, TerritoryDescription, RegionID)
VALUES('06897', 'Wilton                                            ', 1);
INSERT INTO Territories (TerritoryID, TerritoryDescription, RegionID)
VALUES('07960', 'Morristown                                        ', 1);
INSERT INTO Territories (TerritoryID, TerritoryDescription, RegionID)
VALUES('08837', 'Edison                                            ', 1);
INSERT INTO Territories (TerritoryID, TerritoryDescription, RegionID)
VALUES('10019', 'New York                                          ', 1);
INSERT INTO Territories (TerritoryID, TerritoryDescription, RegionID)
VALUES('10038', 'New York                                          ', 1);
INSERT INTO Territories (TerritoryID, TerritoryDescription, RegionID)
VALUES('11747', 'Mellvile                                          ', 1)
