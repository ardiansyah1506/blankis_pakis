-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 10, 2025 at 02:49 PM
-- Server version: 10.6.17-MariaDB-cll-lve
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ziiidevm_blankis`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `province` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `shipping_cost` int(11) NOT NULL DEFAULT 0,
  `payment_proof` varchar(255) DEFAULT NULL,
  `total_price` int(11) NOT NULL,
  `order_date` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `province`, `city`, `address`, `shipping_cost`, `payment_proof`, `total_price`, `order_date`) VALUES
(13, 11, 'Jawa Tengah', 'Kota Pekalongan', 'Jl. Krapyak Kidul', 15000, NULL, 398000, '2025-01-09 06:21:22'),
(14, 7, 'Jambi', 'Kab. Bungo', 'Semarang', 15000, 'https://drive.google.com/uc?id=16Ve6WskTeQK0BOtfBxT5ntYbOMcZSIe9', 100000, '2025-01-09 06:40:41'),
(15, 11, 'Jawa Tengah', 'Kota Pekalongan', 'Jl. Krapyak Kidul', 15000, NULL, 398000, '2025-01-09 06:41:38'),
(16, 7, 'Sumatera Selatan', 'Kab. Penukal Abab Lematang Ilir', 'Semarang', 15000, 'https://drive.google.com/uc?id=1ZbzSTXlxfIt0KkFSaHrbAYqV2vVdgSlb', 200000, '2025-01-09 06:50:54'),
(17, 11, 'Aceh', 'Kota Langsa', 'nabsmdmd', 15000, NULL, 391000, '2025-01-09 13:15:29'),
(18, 19, 'Riau', 'Kota Dumai', 'Jepara', 15000, 'https://drive.google.com/uc?id=1rrPsxSRxsWOD4m2DXJpCvI_9cO4lYVZL', 444, '2025-01-09 15:36:50'),
(19, 19, 'Jambi', 'Kota Sungai Penuh', 'jepara', 15000, 'https://drive.google.com/uc?id=1YSQx50oPwFJdZlyLp4LWZetXlIrQb4uB', 321, '2025-01-09 15:56:38'),
(20, 19, 'Sumatera Selatan', 'Kab. Ogan Ilir ', 'test', 15000, 'https://drive.google.com/uc?id=1mYzEN91RQnoa9h0dgyaXjW-5nhI2d1io', 321, '2025-01-10 06:55:08');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `detail_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`detail_id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(16, 13, 47, 1, 199000),
(17, 13, 49, 1, 199000),
(18, 14, 52, 1, 100000),
(19, 15, 47, 1, 199000),
(20, 15, 49, 1, 199000),
(21, 16, 53, 1, 100000),
(22, 16, 52, 1, 100000),
(23, 17, 47, 1, 199000),
(24, 17, 51, 1, 192000),
(25, 18, 55, 1, 123),
(26, 18, 54, 1, 321),
(27, 19, 54, 1, 321),
(28, 20, 54, 1, 321);

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

CREATE TABLE `produk` (
  `produk_id` int(11) NOT NULL,
  `nama_produk` varchar(200) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `kategori` int(11) NOT NULL,
  `harga` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `produk`
--

INSERT INTO `produk` (`produk_id`, `nama_produk`, `deskripsi`, `image`, `kategori`, `harga`) VALUES
(52, 'keyboard 1', 'keyboard ', 'https://drive.google.com/uc?id=1jUyL1uLPl6f1Rn123SsaMOT6Pa4Y5BcA', 1, 100000),
(53, 'produk 4 ', 'produk ', 'https://drive.google.com/uc?id=111qzkR1ms_T62GEDS2DFsrAuN4M1mpCq', 1, 100000),
(54, 'Nike Air Jordan', 'Sepatu bagus ', 'https://drive.google.com/uc?id=1LiC1-OgT1kDK491v6wj1H9svnn168Q1T', 5, 321),
(55, 'Nike 2', 'Sepatu sangat bagus ', 'https://drive.google.com/uc?id=11JKo8bK1Where2WOaVuPjfnDw6KNONAW', 5, 123),
(57, 'test', 'test', 'https://drive.google.com/uc?id=1mFBMKPvGU6BQN1L2xPe_3DeqWlvemvAW', 5, 123);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL,
  `kategori` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `role`, `kategori`) VALUES
(6, 'fauzi', 'fzi@gmail.com', '$2a$10$uXWnFMojtg5FhxEoQegqZOW/G9igdZ3yR5TI4Fw3ziQCzVw2.EZ6e', 'admin', 1),
(7, 'fziardi', 'fziardi@gmail.com', '$2a$10$GGjQlhJAj6okXhDIKaDT9eKhYRVXzK/vItVX1NsM1k7Dx4K2vovw.', 'user', 1),
(8, 'nabilamin', 'nabilamin@gmail.com', '$2a$10$yzM0mZqwlA1eI7C6Ooq8OuoAlVjagAm9tu.vsHtYYKs1LRgJpLyja', 'admin', 4),
(10, 'nabila', 'nabilaizzatil03@gmail.com', '$2a$10$2x15MIcCr5GfMbzSR3jfGez2xtlGOQhOSGGjEkGjko3zczJBbdIVu', 'admin', 0),
(11, 'nabila', 'nabilaizzatil@gmail.com', '$2a$10$lDLPQ28IDIVIwgxcxgbXee39WzKv/q1P0gAk1Su16YTIJw4QdhAdW', 'user', 5),
(12, 'ardi', 'ardi@gmail.com', '$2a$10$PJkWruD1B4O/qupndVacg.X4bZnvgR79PQmP4ymc2dN55m/BevFmK', 'user', 5),
(13, 'zii', 'zii12@gmail.com', '$2a$10$HNsxjWDsQ2XHvh2/hzHreeAatr/okHgoGlo/N0OpSMExoZc3xHOQG', 'user', 1),
(14, 'fauzi1', 'fauzi@gmail.com', '$2a$10$NfG8dBp07eO91MibKTF7fuKPxKBvmxt7219ge6TVvjGxMvUDo3Wqi', 'user', 1),
(17, 'test', 'ard@gmail.com', '$2a$10$1f8rT1Obj34OzIW/1isIROnlcGlTlR81TyOzeOwKO8iFXYY2tRdL2', 'user', 5),
(18, 'admin', 'admin@gmail.com', '$2a$10$PXkw3Sr84NNsoHzFj21Uc.E84pwG9awQG47ljSEGCU3svd31rYnfW', 'admin', 5),
(19, 'user', 'user@gmail.com', '$2a$10$iNEKT5F2fSusupA0ic/Dle7oRf2XJ3z3/Jsk6bBJptBhXh61ltJxC', 'user', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`detail_id`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`produk_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `produk`
--
ALTER TABLE `produk`
  MODIFY `produk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
