-- Relations
-- Un client peut commander plusieurs menus. Un menu peut être commandé par plusieurs clients.
-- Un client peut passer plusieurs commandes. Une commande est passée par un et un client.
-- Une commande est constitué d'un ou plusieurs menus. Un menu peut faire partie d'une ou plusieurs commandes.
-- On représentera les relations à l'aide de la méthode MERISE.

SET
  time_zone = "+00:00";

DROP TABLE IF EXISTS `Customer_Menu`;
DROP TABLE IF EXISTS `Order_Menu`;
DROP TABLE IF EXISTS `Order`;
DROP TABLE IF EXISTS `Customer`;
DROP TABLE IF EXISTS `Menu`;

CREATE TABLE
    `Customer` (
        `customer_id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        `customer_name` VARCHAR(255) NOT NULL,
        `customer_email` VARCHAR(255) NOT NULL UNIQUE KEY,
        `customer_password` VARCHAR(512) NOT NULL
    );

CREATE TABLE
    `Menu` (
        `menu_id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        `menu_title` VARCHAR(255) NOT NULL,
        `menu_description` VARCHAR(255) NOT NULL,
        `menu_image` VARCHAR(255) NOT NULL
    );

CREATE TABLE
    `Order` (
        `order_id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        `customer_id` INT NOT NULL,
        `created_at` DATETIME NOT NULL,
        CONSTRAINT FK_Order_customer_id FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`) ON DELETE CASCADE
    );

-- Tables de jointure
CREATE TABLE
    `Customer_Menu` (
        `customer_menu_id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        `customer_id` INT NOT NULL,
        `menu_id` INT NOT NULL,
        CONSTRAINT FK_Customer_Menu_customer_id FOREIGN KEY (`customer_id`) REFERENCES `Customer` (`customer_id`) ON DELETE CASCADE,
        CONSTRAINT FK_Customer_Menu_menu_id FOREIGN KEY (`menu_id`) REFERENCES `Menu` (`menu_id`) ON DELETE CASCADE
    );

CREATE TABLE
    `Order_Menu` (
        `order_menu_id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        `order_id` INT NOT NULL,
        `menu_id` INT NOT NULL,
        CONSTRAINT FK_Order_Menu_order_id FOREIGN KEY (`order_id`) REFERENCES `Order` (`order_id`) ON DELETE CASCADE,
        CONSTRAINT FK_Order_Menu_menu_id FOREIGN KEY (`menu_id`) REFERENCES `Menu` (`menu_id`) ON DELETE CASCADE
    );