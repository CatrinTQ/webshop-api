-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Värd: localhost
-- Tid vid skapande: 25 apr 2025 kl 11:02
-- Serverversion: 10.4.28-MariaDB
-- PHP-version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `webshop`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Rullskridskor'),
(2, 'Hjul'),
(3, 'Plates'),
(4, 'Toe stops');

-- --------------------------------------------------------

--
-- Tabellstruktur `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(30) NOT NULL,
  `description` varchar(200) NOT NULL,
  `stock` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `stock`, `price`, `image`, `created_at`) VALUES
(1, 'Bont', 'Bont inline speed skate boots use high-end materials of carbon fiber and fiberglass hand-laid around memory foam to ensure a very lightweight and strong base.', 2, 3000, 'produkt.jpg', '2025-04-17 09:31:23'),
(2, 'Chaya Karma', 'A really good rollerskate!', 2, 3000, '', '2025-04-17 09:31:23'),
(5, 'Chaya Cherry Bomb Toe Stop', 'Chaya brings you the Cherry Bomb, a standard sized, non-marking stopper available in different colors.', 10, 250, '', '2025-04-17 09:55:30'),
(6, 'Moxi Brake Petals Toe Stops', 'As an outdoor brand, Moxi makes a colourful array of aesthetically pleasing products to encourage skaters to personalize their skates to express their unique lifestyle.', 8, 300, '', '2025-04-17 09:55:30'),
(11, 'Rollerbones Bowl Bombers', 'These wheels are hard and most satisfying to use for roller skating at the skatepark on concrete OR wood.', 2, 1500, '', '2025-04-17 10:05:35'),
(12, 'CIB X Reckless Park Wheels', 'Reckless CIB Wheels are the very first wheel designed specifically for aggressive roller skating.', 1, 1000, '', '2025-04-17 10:05:35'),
(13, 'Suregrip Avanti Magnesium', 'The Avanti Magnesium Plate includes a newly designed precision adjustable pivot truck that can withstand the intensity while giving you balance and durability.', 1, 3000, '', '2025-04-17 10:08:57'),
(14, 'Sunlite Plate', 'The Sunlite plate gives you the best of both worlds; the lightweight agility you love about nylon plates plus long-lasting durability!', 3, 1000, '', '2025-04-17 10:08:57'),
(16, 'Ny vara', 'A really good rollerskate!', 2, 1000, 'bild', '2025-04-25 08:23:36');

-- --------------------------------------------------------

--
-- Tabellstruktur `products_categories`
--

CREATE TABLE `products_categories` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `products_categories`
--

INSERT INTO `products_categories` (`id`, `product_id`, `category_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 5, 4),
(4, 6, 4),
(5, 11, 2),
(6, 12, 2),
(7, 13, 3),
(8, 14, 3),
(9, 16, 1);

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `products_categories`
--
ALTER TABLE `products_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_products_categories_products` (`product_id`),
  ADD KEY `fk_products_categories_categories` (`category_id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT för tabell `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT för tabell `products_categories`
--
ALTER TABLE `products_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restriktioner för dumpade tabeller
--

--
-- Restriktioner för tabell `products_categories`
--
ALTER TABLE `products_categories`
  ADD CONSTRAINT `fk_products_categories_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_products_categories_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
