-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2024 at 06:26 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movieprojectdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `casts`
--

CREATE TABLE `casts` (
  `id` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `url` varchar(255) NOT NULL,
  `characterName` varchar(120) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `casts`
--

INSERT INTO `casts` (`id`, `movieId`, `userId`, `name`, `url`, `characterName`, `dateCreated`, `dateUpdated`) VALUES
(1, 38, 1, 'Coco Martin', 'https://th.bing.com/th/id/OIP.hQ3D3CjOUyjgTYUdrZEVWwHaFz?rs=1&pid=ImgDetMain', 'Ricardo Dalisay', '2024-10-21 19:25:43', '0000-00-00 00:00:00'),
(10, 558144, 1, 'Ryan Reynolds', 'https://th.bing.com/th/id/OIP.V2hJtUnaUzmOR4t-zSm9jwHaLH?rs=1&pid=ImgDetMain', 'Deadpool', '2024-11-29 07:12:58', '0000-00-00 00:00:00'),
(12, 38, 1, 'maris racal', 'https://contents.pep.ph/images2/images2/2021/04/23/166242044-166094688692906-1629566106030314001-n-1619186733.jpg', 'touch myself', '2024-12-04 15:08:31', '0000-00-00 00:00:00'),
(13, 38, 1, 'Jim Carrey', 'https://image.tmdb.org/t/p/w500/zk6VDRIdIuioCK8feZNXnojuL8J.jpg', 'Bruce Nolan', '2024-12-04 18:13:57', '0000-00-00 00:00:00'),
(14, 438148, 1, 'Steve Carell', 'https://image.tmdb.org/t/p/w500/1LQDqpcDQTtQb90o9vagbuCHueb.jpg', 'Gru (voice)', '2024-12-04 18:23:28', '0000-00-00 00:00:00'),
(15, 438148, 1, 'Pierre Coffin', 'https://image.tmdb.org/t/p/w500/eAA9uWRqHlm1LT3nZfXb7UuPfVb.jpg', 'Kevin / Stuart / Bob / Minions (voice)', '2024-12-04 18:26:38', '0000-00-00 00:00:00'),
(17, 38, 1, 'Kate Winslet', 'https://image.tmdb.org/t/p/w500/zIiU5mOcinbkpHWCxuDigucsyZC.jpg', 'Clementine Kruczynski', '2024-12-05 15:17:27', '0000-00-00 00:00:00'),
(19, 38, 1, 'Paulie Litt', 'https://image.tmdb.org/t/p/w500/eALQouFgLeczJabJaLdH1R4M3hl.jpg', 'Young Bully', '2024-12-05 15:36:15', '0000-00-00 00:00:00'),
(20, 38, 1, 'Kirsten Dunst', 'https://image.tmdb.org/t/p/w500/5dI5s8Oq2Ook5PFzTWMW6DCXVjm.jpg', 'Mary', '2024-12-05 15:40:30', '0000-00-00 00:00:00'),
(21, 558144, 1, 'Stan Lee', 'https://image.tmdb.org/t/p/w500/kKeyWoFtTqOPsbmwylNHmuB3En9.jpg', 'Stan Lee (uncredited)', '2024-12-05 16:44:41', '0000-00-00 00:00:00'),
(22, 299534, 1, 'Robert Downey Jr.', 'https://image.tmdb.org/t/p/w500/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg', 'Tony Stark / Iron Man', '2024-12-05 16:45:58', '0000-00-00 00:00:00'),
(23, 299534, 1, 'Chris Evansss', 'https://image.tmdb.org/t/p/w500/3bOGNsHlrswhyW79uvIHH1V43JI.jpg', 'Steve Rogers / Captain America', '2024-12-05 16:46:01', '0000-00-00 00:00:00'),
(24, 299534, 1, 'Mark Ruffalo', 'https://image.tmdb.org/t/p/w500/5GilHMOt5PAQh6rlUKZzGmaKEI7.jpg', 'Bruce Banner / Hulk', '2024-12-05 16:46:05', '0000-00-00 00:00:00'),
(25, 299534, 1, 'Chris Hemsworth', 'https://image.tmdb.org/t/p/w500/piQGdoIQOF3C1EI5cbYZLAW1gfj.jpg', 'Thor', '2024-12-05 16:46:11', '0000-00-00 00:00:00'),
(26, 299534, 1, 'Tilda Swinton', 'https://image.tmdb.org/t/p/w500/gWbX3a7V2MgRMRzekfITNcb27xV.jpg', 'The Ancient One', '2024-12-05 17:14:43', '0000-00-00 00:00:00'),
(27, 38, 1, 'Mark Ruffalo', 'https://image.tmdb.org/t/p/w500/5GilHMOt5PAQh6rlUKZzGmaKEI7.jpg', 'Stan', '2024-12-06 02:22:06', '0000-00-00 00:00:00'),
(28, 347183, 1, 'Ayumu Murase', 'https://image.tmdb.org/t/p/w500/3aGM6KpcCIEKOXP9510tzaKc8uw.jpg', 'Shoyo Hinata (voice)', '2024-12-06 14:43:34', '0000-00-00 00:00:00'),
(29, 347183, 1, 'Kaito Ishikawa', 'https://image.tmdb.org/t/p/w500/fzjIkotjUHHs3wgftM9tqdsG8ph.jpg', 'Tobio Kageyama (voice)', '2024-12-06 14:43:37', '0000-00-00 00:00:00'),
(30, 347183, 1, 'Koki Uchiyama', 'https://image.tmdb.org/t/p/w500/sllSm3iZZWVLTBrDZQRtWrZUfEj.jpg', 'Kei Tsukishima (voice)', '2024-12-06 14:43:40', '0000-00-00 00:00:00'),
(31, 347183, 1, 'Yuichi Nakamura', 'https://image.tmdb.org/t/p/w500/wb8behVKjBHX9XXrEydvNINCYwH.jpg', 'Tetsuro Kuroo (voice)', '2024-12-06 14:44:25', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `tmdbId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `overview` text NOT NULL,
  `popularity` float NOT NULL,
  `releaseDate` date NOT NULL,
  `voteAverage` float NOT NULL,
  `backdropPath` varchar(255) NOT NULL,
  `posterPath` varchar(255) NOT NULL,
  `isFeatured` tinyint(1) NOT NULL DEFAULT 0,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`id`, `userId`, `tmdbId`, `title`, `overview`, `popularity`, `releaseDate`, `voteAverage`, `backdropPath`, `posterPath`, `isFeatured`, `dateCreated`, `dateUpdated`) VALUES
(1, 1, 38, 'Bruce Almighty ', '\"Bruce Nolan toils as a \"human interest\" television reporter in Buffalo, NY, but despite his high ratings and the love of his beautiful girlfriend, Bruce remains unfulfilled. At the end of the worst day in his life, he angrily ridicules God - and the Almighty responds, endowing Bruce with all of His divine powers.', 57.52, '2003-05-23', 6.715, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//3XJKBKh9Km89EoUEitVTSnrlAkZ.jpg', 0, '2024-09-26 09:53:29', '0000-00-00 00:00:00'),
(7, 1, 558144, 'Deadpool: No Good Deed', 'Deadpool sees an opportunity to save the day, but it doesn\'t go entirely as planned.', 28.586, '2017-03-03', 7.1, 'https://image.tmdb.org/t/p/original//sUELHitVw5U0tOJg0x34wY7eTuh.jpg', 'https://image.tmdb.org/t/p/original//wlKU9yB0Q8nfPMakBcSBT0JGS7.jpg', 0, '2024-10-26 02:38:09', '0000-00-00 00:00:00'),
(8, 1, 299534, 'Avengers: Endgame', 'After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos\' actions and restore order to the universe once and for all, no matter what consequences may be in store.', 214.694, '2019-04-24', 8.25, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//or06FN3Dka5tukK1e9sl16pB3iy.jpg', 0, '2024-10-26 02:43:36', '0000-00-00 00:00:00'),
(10, 1, 99861, 'Avengers: Age of Ultron', 'When Tony Stark tries to jumpstart a dormant peacekeeping program, things go awry and Earth’s Mightiest Heroes are put to the ultimate test as the fate of the planet hangs in the balance. As the villainous Ultron emerges, it is up to The Avengers to stop him from enacting his terrible plans, and soon uneasy alliances and unexpected action pave the way for an epic and unique global adventure.', 103.969, '2015-04-22', 7.3, 'https://image.tmdb.org/t/p/original//xnqust9Li4oxfhXD5kcPi3UC8i4.jpg', 'https://image.tmdb.org/t/p/original//4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg', 0, '2024-10-26 06:39:31', '0000-00-00 00:00:00'),
(11, 1, 315635, 'Spider-Man: Homecoming', 'Following the events of Captain America: Civil War, Peter Parker, with the help of his mentor Tony Stark, tries to balance his life as an ordinary high school student in Queens, New York City, with fighting crime as his superhero alter ego Spider-Man as a new threat, the Vulture, emerges.', 104.335, '2017-07-05', 7.335, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//c24sv2weTHPsmDa7jEMN0m2P3RT.jpg', 0, '2024-11-23 12:25:22', '0000-00-00 00:00:00'),
(16, 1, 438148, 'Minions: The Rise of Gru', 'A fanboy of a supervillain supergroup known as the Vicious 6, Gru hatches a plan to become evil enough to join them, with the backup of his followers, the Minions.', 72.344, '2022-06-29', 7.3, 'https://image.tmdb.org/t/p/original//uMSxXLfH7v30gRNBqsQaSP3yqX5.jpg', 'https://image.tmdb.org/t/p/original//wKiOkZTN9lUUUNZLmtnwubZYONg.jpg', 0, '2024-12-06 10:07:34', '0000-00-00 00:00:00'),
(17, 1, 347183, 'Haikyuu', 'Shouyou Hinata, after losing to Kitagawa Daiichi Junior High\'s setter Tobio Kageyama in his first official volleyball match, transfers to Karasuno High, intent on finally having a proper volleyball team and getting his revenge on Kageyama. Upon arrival at Karasuno, however, Hinata finds out Kageyama has also gone to Karasuno. Initially at odds with each other, the two form an oddball combination and fight together with the other members of the volleyball club. Karasuno reunites with a former rival school, Nekoma High, in a practice match and reignites their school rivalry.', 21.18, '2015-07-03', 8.6, 'https://image.tmdb.org/t/p/original//qRg9JDZDZJg2n1zXkYWJFnAmtAy.jpg', 'https://image.tmdb.org/t/p/original//5HlpuETjDOob8yzddD1MF7QwZwV.jpg', 0, '2024-12-06 10:08:02', '0000-00-00 00:00:00'),
(18, 1, 1075794, 'Leo', 'Jaded 74-year-old lizard Leo has been stuck in the same Florida classroom for decades with his terrarium-mate turtle. When he learns he only has one year left to live, he plans to escape to experience life on the outside but instead gets caught up in the problems of his anxious students — including an impossibly mean substitute teacher.', 71.608, '2023-11-17', 7.474, 'https://image.tmdb.org/t/p/original//auXrHU6O17n9Tz11SHReoorjrU6.jpg', 'https://image.tmdb.org/t/p/original//pD6sL4vntUOXHmuvJPPZAgvyfd9.jpg', 0, '2024-12-06 10:08:46', '0000-00-00 00:00:00'),
(19, 1, 1139829, 'Orion and the Dark', 'A boy with an active imagination faces his fears on an unforgettable journey through the night with his new friend: a giant, smiling creature named Dark.', 111.625, '2024-02-01', 6.587, 'https://image.tmdb.org/t/p/original//zLj0peaxy5y2SlC6wNIQ4V0pfqg.jpg', 'https://image.tmdb.org/t/p/original//k6iHs4daxm0RQqFQsE8oE5wWJjj.jpg', 0, '2024-12-06 10:09:19', '0000-00-00 00:00:00'),
(20, 1, 900667, 'ONE PIECE FILM RED', 'Uta — the most beloved singer in the world. Her voice, which she sings with while concealing her true identity, has been described as “otherworldly.” She will appear in public for the first time at a live concert. As the venue fills with all kinds of Uta fans — excited pirates, the Navy watching closely, and the Straw Hats led by Luffy who simply came to enjoy her sonorous performance — the voice that the whole world has been waiting for is about to resound.', 71.82, '2022-08-06', 7.201, 'https://image.tmdb.org/t/p/original//s974GBBFZ1I4SlZHFu2XIffk1dv.jpg', 'https://image.tmdb.org/t/p/original//ogDXuVkO92GcETZfSofXXemw7gb.jpg', 0, '2024-12-06 10:11:02', '0000-00-00 00:00:00'),
(21, 1, 568012, 'ONE PIECE STAMPEDE', 'The world\'s boldest buccaneers set sail for the great Pirate Festival, where the Straw Hats join a mad-dash race to find Gol D. Roger\'s treasure. There\'s just one little problem: An old member of Roger\'s crew has a sinister score to settle.', 16.365, '2019-01-03', 7.8, 'https://image.tmdb.org/t/p/original//iGnCzXEx0cFlUbpyAMeHwHWhPhx.jpg', 'https://image.tmdb.org/t/p/original//n1dvTmQmDmaSRucpvRCB5IdQecV.jpg', 0, '2024-12-06 10:11:36', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `userId`, `movieId`, `url`, `description`, `dateCreated`, `dateUpdated`) VALUES
(2, 1, 38, 'https://image.tmdb.org/t/p/w500//r5YJIeyLI7wjQRWG2dk7qmQciB6.jpg', 'Imported from TMDB', '2024-12-05 14:17:46', '0000-00-00 00:00:00'),
(3, 1, 38, 'https://th.bing.com/th/id/OIP.4LR66HpsgAag-cfffT3JHAHaEK?rs=1&pid=ImgDetMain', 'Bruce Almightyyy', '2024-12-05 14:21:35', '0000-00-00 00:00:00'),
(4, 1, 38, 'https://image.tmdb.org/t/p/w500//llyfug8S5O3ha3pfZpdKKmOqg4t.jpg', 'Imported from TMDB', '2024-12-05 16:34:04', '0000-00-00 00:00:00'),
(5, 1, 38, 'https://image.tmdb.org/t/p/w500//rM67wZAB2fcVfquSGwVBcnfYJ0U.jpg', 'Imported from TMDB', '2024-12-05 16:34:11', '0000-00-00 00:00:00'),
(6, 1, 299534, 'https://image.tmdb.org/t/p/w500//7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg', 'Imported from TMDB', '2024-12-05 16:47:31', '0000-00-00 00:00:00'),
(7, 1, 299534, 'https://image.tmdb.org/t/p/w500//orjiB3oUIsyz60hoEqkiGpy5CeO.jpg', 'Imported from TMDB', '2024-12-05 16:47:38', '0000-00-00 00:00:00'),
(8, 1, 299534, 'https://image.tmdb.org/t/p/w500//dVSMKPEaiwujXE7kQkvixPLieHR.jpg', 'Imported from TMDB', '2024-12-05 16:47:50', '0000-00-00 00:00:00'),
(9, 1, 299534, 'https://image.tmdb.org/t/p/w500//9wXPKruA6bWYk2co5ix6fH59Qr8.jpg', 'Imported from TMDB', '2024-12-05 16:48:05', '0000-00-00 00:00:00'),
(10, 1, 347183, 'https://image.tmdb.org/t/p/w500//8MLOvATfslHSk0Da66IMQ4yNI2I.jpg', 'Imported from TMDB', '2024-12-06 14:49:04', '0000-00-00 00:00:00'),
(11, 1, 347183, 'https://image.tmdb.org/t/p/w500//xn2G9K3JV1ypBQyFGGnCByOdukz.jpg', 'Imported from TMDB', '2024-12-06 14:49:12', '0000-00-00 00:00:00'),
(12, 1, 1139829, 'https://image.tmdb.org/t/p/w500//79jYHNUuUN8bvG9BOmRkjlWW07O.jpg', 'Imported from TMDB', '2024-12-06 23:05:04', '0000-00-00 00:00:00'),
(13, 1, 1139829, 'https://image.tmdb.org/t/p/w500//cXR82PfJQCshpvbLynqWegqYyqf.jpg', 'Imported from TMDB', '2024-12-06 23:05:12', '0000-00-00 00:00:00'),
(14, 1, 1139829, 'https://image.tmdb.org/t/p/w500//qsluMTRnweBW0SCXxjKMigXUPtT.jpg', 'Orion and the Dark', '2024-12-06 23:05:32', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(128) NOT NULL,
  `middleName` varchar(128) NOT NULL,
  `lastName` varchar(128) NOT NULL,
  `contactNo` varchar(15) NOT NULL,
  `role` enum('admin','user') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstName`, `middleName`, `lastName`, `contactNo`, `role`) VALUES
(1, 'test@mail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'string', 'string', 'string', 'string', 'admin'),
(2, 'ace@mail.com', '360e2ece07507675dced80ba867d6dcd', 'Ace', 'Oreas', 'Matamis', '09320216549', 'admin'),
(7, 'tin@mail.com', '2cb1b780138bc273459232edda0e4b96', 'christine', 'panes', 'lazaro', '09362546258', 'admin'),
(8, 'elai@gmail.com', '202cb962ac59075b964b07152d234b70', 'elaiza', 'yong', 'pugosa', '09632154256', 'admin'),
(9, 'jed@mail.com', '250cf8b51c773f3f8dc8b4be867a9a02', 'jed', 'jed', 'matamis', '09321164528', 'admin'),
(11, 'user@mail.com', '1a1dc91c907325c69271ddf0c944bc72', 'Ace', 'Oreas', 'Matamis', '0909909099', 'user'),
(12, 'admin@mail.com', '21232f297a57a5a743894a0e4a801fc3', 'user', 'user', 'user', '7894654', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `site` varchar(255) NOT NULL,
  `videoKey` varchar(255) NOT NULL,
  `videoType` varchar(255) NOT NULL,
  `official` tinyint(1) NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `userId`, `movieId`, `url`, `name`, `site`, `videoKey`, `videoType`, `official`, `dateCreated`, `dateUpdated`) VALUES
(3, 1, 38, 'https://www.youtube.com/watch?v=FX5CYFCqmPk', 'Herchuriiii', 'youtube', 'FX5CYFCqmPk', 'clip', 1, '2024-12-03 10:07:07', '0000-00-00 00:00:00'),
(4, 1, 38, 'https://www.youtube.com/watch?v=QTFK8UnxfY4', 'Singalo', 'youtube', 'QTFK8UnxfY4', 'clip', 1, '2024-12-05 04:12:43', '0000-00-00 00:00:00'),
(7, 1, 38, 'https://www.youtube.com/watch?v=0XBxoKumlqQ', 'Bruce Almighty Trailer', 'YouTube', '0XBxoKumlqQ', 'Trailer', 1, '2024-12-05 13:08:36', '0000-00-00 00:00:00'),
(8, 1, 38, 'https://www.youtube.com/watch?v=4lzPzAkNIjA', 'Bruce gets his powers', 'youtube', '4lzPzAkNIjA', 'clip', 0, '2024-12-05 16:13:02', '0000-00-00 00:00:00'),
(9, 1, 558144, 'https://www.youtube.com/watch?v=Z5ezsReZcxU', 'No Good Deed', 'YouTube', 'Z5ezsReZcxU', 'Clip', 0, '2024-12-05 16:45:34', '0000-00-00 00:00:00'),
(11, 1, 299534, 'https://www.youtube.com/watch?v=w-lUE5egBqs', 'Digital Edition Ad', 'YouTube', 'w-lUE5egBqs', 'Featurette', 0, '2024-12-05 16:46:52', '0000-00-00 00:00:00'),
(12, 1, 299534, 'https://www.youtube.com/watch?v=9tKr3m6r9NI', '“Hulk Out”', 'YouTube', '9tKr3m6r9NI', 'Clip', 0, '2024-12-05 16:46:56', '0000-00-00 00:00:00'),
(19, 1, 38, 'https://www.youtube.com/watch?v=51NIQ0xx4aA', 'Bruce Almighty: Bruce controls Evan HD CLIP', 'youtube', '51NIQ0xx4aA', 'clip', 0, '2024-12-06 02:38:38', '0000-00-00 00:00:00'),
(26, 1, 38, 'https://www.youtube.com/watch?v=QLDIuNNAsHw', 'REGALANTE', 'youtube', 'QLDIuNNAsHw', 'clip', 1, '2024-12-06 08:26:19', '0000-00-00 00:00:00'),
(27, 1, 38, 'https://www.youtube.com/watch?v=jQoNILVFFvs', 'Avengers: Infinity War (2018) - \"Dangers Of Strangers\" | Movie Clip', 'YouTube', 'jQoNILVFFvs', 'Clip', 0, '2024-12-06 08:29:00', '0000-00-00 00:00:00'),
(28, 1, 347183, 'https://www.youtube.com/watch?v=Q0gkKsFTCSU', 'Haikyuu!! Movie: \"Owari to Hajimari\" Trailer', 'YouTube', 'Q0gkKsFTCSU', 'Trailer', 0, '2024-12-06 14:48:26', '0000-00-00 00:00:00'),
(29, 1, 347183, 'https://www.youtube.com/watch?v=6X8kZCzF3zI', 'Official Trailer [Subtitled]', 'YouTube', '6X8kZCzF3zI', 'Trailer', 0, '2024-12-06 14:48:39', '0000-00-00 00:00:00'),
(30, 1, 1139829, 'https://www.youtube.com/watch?v=3yFmXUCcaZI', 'Orion\'s Worst Nightmare', 'YouTube', '3yFmXUCcaZI', 'Clip', 0, '2024-12-06 23:04:30', '0000-00-00 00:00:00'),
(31, 1, 1139829, 'https://www.youtube.com/watch?v=gT7Tei58TaQ', 'Dark could learn a thing or two from Light', 'YouTube', 'gT7Tei58TaQ', 'Clip', 0, '2024-12-06 23:04:34', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `casts`
--
ALTER TABLE `casts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `casts`
--
ALTER TABLE `casts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
