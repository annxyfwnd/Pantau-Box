-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 07, 2023 at 10:54 AM
-- Server version: 5.6.26
-- PHP Version: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pantau-box`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_ktp`
--

CREATE TABLE IF NOT EXISTS `data_ktp` (
  `nik` varchar(16) COLLATE utf8_unicode_ci NOT NULL,
  `nama` varchar(265) COLLATE utf8_unicode_ci NOT NULL,
  `tempat_lahir` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `tgl_lahir` date NOT NULL,
  `alamat` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `rt` int(3) NOT NULL,
  `rw` int(3) NOT NULL,
  `kelurahan` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `kecamatan` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `no_telp` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `jenis_kelamin` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `status` varchar(13) COLLATE utf8_unicode_ci NOT NULL,
  `agama` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `pekerjaan` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `kewarganegaraan` varchar(3) COLLATE utf8_unicode_ci NOT NULL,
  `waktu_berlaku` varchar(12) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `data_ktp`
--

INSERT INTO `data_ktp` (`nik`, `nama`, `tempat_lahir`, `tgl_lahir`, `alamat`, `rt`, `rw`, `kelurahan`, `kecamatan`, `no_telp`, `jenis_kelamin`, `status`, `agama`, `pekerjaan`, `kewarganegaraan`, `waktu_berlaku`) VALUES
('3171018306191242', 'Joko Santoso', 'Jakarta', '0000-00-00', 'Jl. Asem No. 15', 8, 2, 'Cempaka Baru', 'Kemayoran', '+6285123456789', 'Laki-laki', 'Menikah', 'Islam', 'Pegawai Negeri Sipil', 'WNI', 'Seumur Hidup'),
('3172047509508736', 'Kartika Dewi', 'Jakarta', '0000-00-00', 'Jl. Kenari No. 5', 2, 9, 'Senen', 'Senen', '+6285234567890', 'Perempuan', 'Menikah', 'Kristen', 'Wiraswasta', 'WNI', 'Seumur Hidup'),
('3173018903892176', 'Budi Santoso', 'Jakarta', '0000-00-00', 'Jl. Puri Raya No. 8', 2, 8, 'Kelapa Gading', 'Kelapa Gading Timur', '+6285376543210', 'Laki-laki', 'Belum Menikah', 'Hindu', 'Mahasiswa', 'WNI', 'Seumur Hidup'),
('3173126307914125', 'Anita Sari', 'Jakarta', '0000-00-00', 'Jl. Kemuning No. 12', 1, 6, 'Cempaka Putih', 'Cempaka Putih Barat', '+6285898765432', 'Perempuan', 'Menikah', 'Kristen', 'Wiraswasta', 'WNI', 'Seumur Hidup'),
('3174047915527892', 'Citra Dewi', 'Jakarta', '0000-00-00', 'Jl. Melati No. 15', 3, 1, 'Sunter Agung', 'Tanjung Priok', '+6285234567890', 'Perempuan', 'Menikah', 'Kristen', 'Wiraswasta', 'WNI', 'Seumur Hidup'),
('3174140763842753', 'Dedi Pratama', 'Jakarta', '0000-00-00', 'Jl. Anggrek No. 10', 7, 3, 'Tebet Barat', 'Tebet', '+6285123456789', 'Laki-laki', 'Belum Menikah', 'Islam', 'Mahasiswa', 'WNI', 'Seumur Hidup'),
('3175029461829347', 'Eka Suryani', 'Jakarta', '0000-00-00', 'Jl. Raya Serpong No. 7', 1, 1, 'Gambir', 'Kebon Kelapa', '+6285234567890', 'Perempuan', 'Menikah', 'Kristen', 'Wiraswasta', 'WNI', 'Seumur Hidup'),
('3176127482910629', 'Firman Santoso', 'Jakarta', '0000-00-00', 'Jl. Seruni No. 20', 2, 5, 'Kalideres', 'Kalideres', '+6285123456789', 'Laki-laki', 'Belum Menikah', 'Islam', 'Mahasiswa', 'WNI', 'Seumur Hidup'),
('3177050364952082', 'Gita Rahayu', 'Jakarta', '0000-00-00', 'Jl. Pulo Indah No. 9', 5, 4, 'Koja', 'Koja Selatan', '+6285234567890', 'Perempuan', 'Belum Menikah', 'Kristen', 'Wiraswasta', 'WNI', 'Seumur Hidup'),
('3178092003971042', 'Hadi Prasetyo', 'Jakarta', '0000-00-00', 'Jl. Kedoya Raya No. 5', 3, 6, 'Kebayoran Lama', 'Pesanggrahan', '+6285123456789', 'Laki-laki', 'Menikah', 'Islam', 'Pegawai Swasta', 'WNI', 'Seumur Hidup'),
('3179015572098452', 'Indah Wulandari', 'Jakarta', '0000-00-00', 'Jl. Cendrawasih No. 12', 7, 7, 'Buaran', 'Klender', '+6285234567890', 'Perempuan', 'Belum Menikah', 'Kristen', 'Wiraswasta', 'WNI', 'Seumur Hidup'),
('3317309280592050', 'Agus Suprianto', 'Jakarta', '0000-00-00', 'Jl. Manggis No. 25', 5, 2, 'Pondok Pinang', 'Kebayoran Lama', '+6285712345678', 'Laki-laki', 'Menikah', 'Islam', 'Pegawai Swasta', 'WNI', 'Seumur Hidup');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data_ktp`
--
ALTER TABLE `data_ktp`
  ADD PRIMARY KEY (`nik`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
