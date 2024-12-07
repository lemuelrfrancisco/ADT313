-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 14, 2024 at 09:59 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movieProjectDb`
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
(1, 38, 1, 'Robert Downey Jr.', 'https://image.tmdb.org/t/p/original/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg', 'Tony Stark / Iron Man', '2024-10-22 03:25:43', '0000-00-00 00:00:00'),
(2, 38, 1, 'Chris Evans', 'https://image.tmdb.org/t/p/original/3bOGNsHlrswhyW79uvIHH1V43JI.jp', 'Steve Rogers / Captain America', '2024-10-22 03:31:13', '0000-00-00 00:00:00');

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
(38, 1, 299536, 'Avengers: Infinity War', 'As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.', 223.298, '2018-04-25', 8.243, 'https://image.tmdb.org/t/p/original//mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg', 'https://image.tmdb.org/t/p/original//7WsyChQLEftFiDOVTGkv3hFpyyt.jpg', 0, '2024-10-19 03:24:13', '0000-00-00 00:00:00'),
(40, 1, 1184918, 'The Wild Robot', 'After a shipwreck, an intelligent robot called Roz is stranded on an uninhabited island. To survive the harsh environment, Roz bonds with the island\'s animals and cares for an orphaned baby goose.', 4473.7, '2024-09-12', 8.615, 'https://image.tmdb.org/t/p/original//417tYZ4XUyJrtyZXj7HpvWf1E8f.jpg', 'https://image.tmdb.org/t/p/original//9w0Vh9eizfBXrcomiaFWTIPdboo.jpg', 0, '2024-10-19 03:28:34', '0000-00-00 00:00:00'),
(46, 1, 532321, 'Re:ZERO -Starting Life in Another World- Memory Snow', 'Subaru and friends finally get a moment of peace, and Subaru goes on a certain secret mission that he must not let anyone find out about! However, even though Subaru is wearing a disguise, Petra and other children of the village immediately figure out who he is. Now that his mission was exposed within five seconds of it starting, what will happen with Subaru\'s \"date course\" with Emilia?', 17.969, '2018-10-06', 7.2, 'https://image.tmdb.org/t/p/original//t9ifVuOtSZBvtieF9L83pnHnOcC.jpg', 'https://image.tmdb.org/t/p/original//y7XwmyE5ue9hjk65fEWpO2hGU2B.jpg', 0, '2024-10-19 03:31:23', '0000-00-00 00:00:00'),
(52, 1, 38579, 'Marmaduke', 'When Phil and Debbie Winslow relocate from their native Kansas to the sunny climes of Orange County, their big-hearted, havoc-wreaking Great Dane gets a taste of the dog\'s life, California-style.', 20.341, '2010-06-03', 5.2, 'https://image.tmdb.org/t/p/original//cO3EwGUjy5lkDbKrAfJglxs2Acu.jpg', 'https://image.tmdb.org/t/p/original//e1hxniKMiRIpGiad0BCATn4d8uv.jpg', 0, '2024-10-19 03:34:16', '0000-00-00 00:00:00'),
(53, 1, 593959, 'TEST', 'Pororo and his friends at the pirate restaurant accidentally take a treasure map of the legendary treasure and head to the treasure island. While searching for friends scattered on the mysterious treasure island where the secrets of ancient civilization are kept, they meet a long-trapped pirate hero, Captain Silver, and solves the mystery of the treasure map with him. But they fall into danger because of the evil pirate Captain Black, who chased after them, and the monsters on the treasure island. Can Pororo and his friends come back safely in search of the treasures?', 4.225, '2019-04-25', 8, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//geWOb6bxqIsfVzmIcYaatGGWhGp.jpg', 0, '2024-10-19 03:34:37', '0000-00-00 00:00:00'),
(57, 1, 38579, 'Marmaduke', 'When Phil and Debbie Winslow relocate from their native Kansas to the sunny climes of Orange County, their big-hearted, havoc-wreaking Great Dane gets a taste of the dog\'s life, California-style.', 20.341, '2010-06-03', 5.2, 'https://image.tmdb.org/t/p/original//cO3EwGUjy5lkDbKrAfJglxs2Acu.jpg', 'https://image.tmdb.org/t/p/original//e1hxniKMiRIpGiad0BCATn4d8uv.jpg', 0, '2024-10-19 03:36:40', '0000-00-00 00:00:00'),
(85, 1, 913240, 'kaya nyo pa?', 'asdsadsa', 0.872, '1984-10-06', 7, 'https://image.tmdb.org/t/p/original/null', 'https://image.tmdb.org/t/p/original//fGyN4IDOS5Xtr3RrCDr5OtyndE0.jpg', 0, '2024-10-19 03:57:58', '0000-00-00 00:00:00'),
(86, 1, 532067, 'naur po', 'It is not strange that the Demon Lord\'s forces fear the Crimson Demons, the clan from which Megumin and Yunyun originate. Even if the Demon Lord\'s generals attack their village, the Crimson Demons can just easily brush them off with their supreme mastery of advanced and overpowered magic.  When Yunyun receives a seemingly serious letter regarding a potential disaster coming to her hometown, she immediately informs Kazuma Satou and the rest of his party. After a series of wacky misunderstandings, it turns out to be a mere prank by her fellow demon who wants to be an author. Even so, Megumin becomes worried about her family and sets out toward the Crimson Demons\' village with the gang.  There, Kazuma and the others decide to sightsee the wonders of Megumin\'s birthplace. However, they soon come to realize that the nonsense threat they received might have been more than just a joke.', 21.349, '2019-08-30', 8.1, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//fv5BgcfkpWh3V6Pb1qVlXESBOdl.jpg', 0, '2024-10-19 03:58:15', '0000-00-00 00:00:00'),
(87, 1, 8373, 'of the Fallen', 'Sam Witwicky leaves the Autobots behind for a normal life. But when his mind is filled with cryptic symbols, the Decepticons target him and he is dragged back into the Transformers\' war.', 29.152, '2009-06-19', 6.192, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//pLBb0whOzVDtJvyD4DPeQyQNOqp.jpg', 0, '2024-10-19 03:58:19', '0000-00-00 00:00:00'),
(88, 1, 862362, 'matinik si sherwin', 'A story about Boyong, the master barber, and Apolinario, Boyong\'s nephew and apprentice. They man their shabby barbershop, dreaming of hitting the big time someday. Their grandmother becomes ill, and they are in desperate need of money. They learn that gay beauticians make more money, so they disguise themselves as such and get hired in a posh beauty salon. With so many gorgeous female customers, how long can they keep up the act?', 1.263, '1997-11-22', 0, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//dQQroh0Hv54pPg25bjTuXiP1Yub.jpg', 0, '2024-10-19 03:58:39', '0000-00-00 00:00:00'),
(89, 1, 273812, 'Maybe This Time', '\"Steph Asuncion and Tonio Bugayong were once in love. Back then, she was a young girl who wanted a simple life and he was older, more ambitious than she was. Tonio was a small town guy who wants to board a ship to provide for his family’s furniture business. Sarah was a Manila girl who spends the summer in the province for community service. What might have been a sweet relationship ended sourly when Tonio left without saying goodbye. Steph was heartbroken and it taught her to dream bigger to be worthy of love. Will their paths cross again? Will they overcome the pains of the past to give love a second chance? This is a story between two people who will be reminded about the importance of being true to one’s self in order for true love to happen.\"', 4.322, '2014-05-28', 8.5, 'https://image.tmdb.org/t/p/original//adYsDJsrmIsxLP6tqu2ev9suzyP.jpg', 'https://image.tmdb.org/t/p/original//iLRNcubYiSIYPDeSX4nvm7WhH7O.jpg', 0, '2024-10-19 03:58:39', '0000-00-00 00:00:00'),
(91, 1, 11224, 'Cinderella', 'Cinderella has faith her dreams of a better life will come true. With help from her loyal mice friends and a wave of her Fairy Godmother\'s wand, Cinderella\'s rags are magically turned into a glorious gown and off she goes to the Royal Ball. But when the clock strikes midnight, the spell is broken, leaving a single glass slipper... the only key to the ultimate fairy-tale ending!', 77.46, '1950-02-22', 7.045, 'https://image.tmdb.org/t/p/original//rH0DPF7pB35jxLxKb3JRUgCrrnp.jpg', 'https://image.tmdb.org/t/p/original//4nssBcQUBadCTBjrAkX46mVEKts.jpg', 0, '2024-10-19 04:02:27', '0000-00-00 00:00:00'),
(92, 1, 532067, 'naur poO', 'It is not strange that the Demon Lord\'s forces fear the Crimson Demons, the clan from which Megumin and Yunyun originate. Even if the Demon Lord\'s generals attack their village, the Crimson Demons can just easily brush them off with their supreme mastery of advanced and overpowered magic.  When Yunyun receives a seemingly serious letter regarding a potential disaster coming to her hometown, she immediately informs Kazuma Satou and the rest of his party. After a series of wacky misunderstandings, it turns out to be a mere prank by her fellow demon who wants to be an author. Even so, Megumin becomes worried about her family and sets out toward the Crimson Demons\' village with the gang.  There, Kazuma and the others decide to sightsee the wonders of Megumin\'s birthplace. However, they soon come to realize that the nonsense threat they received might have been more than just a joke.', 21.349, '2019-08-30', 8.1, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//fv5BgcfkpWh3V6Pb1qVlXESBOdl.jpg', 0, '2024-10-19 04:10:45', '0000-00-00 00:00:00'),
(115, 1, 429617, 'form', 'Peter Parker and his friends go on a summer trip to Europe. However, they will hardly be able to rest - Peter will have to agree to help Nick Fury uncover the mystery of creatures that cause natural disasters and destruction throughout the continent.', 97.583, '2019-06-28', 7.426, 'https://image.tmdb.org/t/p/original//34jW8LvjRplM8Pv06cBFDpLlenR.jpg', 'https://image.tmdb.org/t/p/original//4q2NNj4S5dG2RLF9CpXsej7yXl.jpg', 0, '2024-10-19 04:35:49', '0000-00-00 00:00:00'),
(117, 1, 862362, 'Paano ba \'to?', 'A story about Boyong, the master barber, and Apolinario, Boyong\'s nephew and apprentice. They man their shabby barbershop, dreaming of hitting the big time someday. Their grandmother becomes ill, and they are in desperate need of money. They learn that gay beauticians make more money, so they disguise themselves as such and get hired in a posh beauty salon. With so many gorgeous female customers, how long can they keep up the act?', 1.69, '1997-11-22', 0, 'https://image.tmdb.org/t/p/original/null', 'https://image.tmdb.org/t/p/original//dQQroh0Hv54pPg25bjTuXiP1Yub.jpg', 0, '2024-10-19 04:36:16', '0000-00-00 00:00:00'),
(120, 1, 862362, 'TESTING 123', 'A story about Boyong, the master barber, and Apolinario, Boyong\'s nephew and apprentice. They man their shabby barbershop, dreaming of hitting the big time someday. Their grandmother becomes ill, and they are in desperate need of money. They learn that gay beauticians make more money, so they disguise themselves as such and get hired in a posh beauty salon. With so many gorgeous female customers, how long can they keep up the act?', 1.263, '1997-11-22', 0, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//dQQroh0Hv54pPg25bjTuXiP1Yub.jpg', 0, '2024-10-19 04:38:32', '0000-00-00 00:00:00'),
(122, 1, 916192, 'The Tunnel to Summer, eheh, the Exit of Goodbyes', 'Urashima Tunnel – Once you enter that tunnel, you can get whatever you want, but at a price. Kaoru Tohno, who seems to have an elusive personality and traumatic past, and Anzu Hanashiro, who is struggling to reconcile her ideal image and true-to-heart attitude, team up to investigate the Urashima Tunnel and get what they want. This is an unforgettable summer story of nostalgia and sprinting in a remote countryside.', 27.435, '2022-09-09', 7.7, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//5AGA6pbBKXZTI8k1c6odx30JuQR.jpg', 0, '2024-10-19 04:39:17', '0000-00-00 00:00:00'),
(126, 1, 917496, 'Beetlejuice Beetlejuice', 'After a family tragedy, three generations of the Deetz family return home to Winter River. Still haunted by Betelgeuse, Lydia\'s life is turned upside down when her teenage daughter, Astrid, accidentally opens the portal to the Afterlife.', 1501.6, '2024-09-04', 7.216, 'https://image.tmdb.org/t/p/original//xi1VSt3DtkevUmzCx2mNlCoDe74.jpg', 'https://image.tmdb.org/t/p/original//kKgQzkUCnQmeTPkyIwHly2t6ZFI.jpg', 0, '2024-10-19 04:40:41', '0000-00-00 00:00:00'),
(129, 1, 783675, 'The First Slam Dunk HANAMICHIIIIII', 'Shohoku\'s “speedster” and point guard, Ryota Miyagi, always plays with brains and lightning speed, running circles around his opponents while feigning composure. In his second year of high school, Ryota plays with the Shohoku High School basketball team along with Sakuragi, Rukawa, Akagi, and Mitsui as they take the stage at the Inter-High School National Championship. And now, they are on the brink of challenging the reigning champions, Sannoh Kogyo High School.', 64.799, '2022-12-03', 7.8, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//7i3EBXY87HdHagCoFbmjHQ8DlkG.jpg', 0, '2024-10-19 04:41:16', '0000-00-00 00:00:00'),
(130, 1, 862362, 'Matinik Na Bading, Syokeng Buking', 'asas', 1.263, '1997-11-22', 0, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//dQQroh0Hv54pPg25bjTuXiP1Yub.jpg', 0, '2024-10-19 04:41:31', '0000-00-00 00:00:00'),
(131, 1, 299534, 'Avengers: Endgame', 'After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos\' actions and restore order to the universe once and for all, no matter what consequences may be in store.', 125.874, '2019-04-24', 8.25, 'https://image.tmdb.org/t/p/original//7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg', 'https://image.tmdb.org/t/p/original//or06FN3Dka5tukK1e9sl16pB3iy.jpg', 0, '2024-10-19 04:41:51', '0000-00-00 00:00:00'),
(133, 1, 129, 'Spirited Away', 'JOCAS WAS HERE', 142.489, '2001-07-20', 8.5, 'https://image.tmdb.org/t/p/original//6oaL4DP75yABrd5EbC4H2zq5ghc.jpg', 'https://image.tmdb.org/t/p/original//39wmItIWsg5sZMyRUHLkWBcuVCM.jpg', 0, '2024-10-19 04:42:01', '0000-00-00 00:00:00'),
(135, 1, 686200, 'hanggangda', 'wala', 4.228, '2007-07-22', 4.2, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//vJiFTwPQ26I5sWibDCwjotlaWA7.jpg', 0, '2024-10-19 04:42:50', '0000-00-00 00:00:00'),
(136, 1, 299534, 'cute ni jocas', 'After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos\' actions and restore order to the universe once and for all, no matter what consequences may be in store.', 125.874, '2019-04-24', 8.25, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//or06FN3Dka5tukK1e9sl16pB3iy.jpg', 0, '2024-10-19 04:43:00', '0000-00-00 00:00:00'),
(147, 1, 47369, 'Avengers', 'No overview for this movie', 6.986, '2006-04-09', 6, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//cEI5aazuAVJ3PcWeNM8gxYiNjmq.jpg', 0, '2024-10-19 04:45:54', '0000-00-00 00:00:00'),
(148, 1, 225914, 'Spider-Man1', 'When an extortionist threatens to force a multi-suicide unless a huge ransom is paid, only Peter Parker can stop him with his new powers as Spider-Man.', 31.531, '1977-09-14', 6.141, 'https://image.tmdb.org/t/p/original//zlpZzccypkAYFZIyYLQcchl90ZC.jpg', 'https://image.tmdb.org/t/p/original//jNxRHZ2cxVkNRtxgHuCtv7GY4JP.jpg', 0, '2024-10-19 04:46:19', '0000-00-00 00:00:00'),
(150, 1, 47369, 'Avengers', 'No overview for this movie', 6.986, '2006-04-09', 6, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//cEI5aazuAVJ3PcWeNM8gxYiNjmq.jpg', 0, '2024-10-19 04:47:16', '0000-00-00 00:00:00'),
(152, 1, 47369, 'daniel', 'try try try', 6.986, '2006-04-09', 6, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//cEI5aazuAVJ3PcWeNM8gxYiNjmq.jpg', 0, '2024-10-19 04:48:38', '0000-00-00 00:00:00'),
(153, 1, 299534, 'hotdog ni thanos', 'After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos\' actions and restore order to the universe once and for all, no matter what consequences may be in store.', 125.874, '2019-04-24', 8.25, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//or06FN3Dka5tukK1e9sl16pB3iy.jpg', 0, '2024-10-19 05:00:52', '0000-00-00 00:00:00'),
(154, 1, 299534, 'tender juicy ni thanos', 'After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos\' actions and restore order to the universe once and for all, no matter what consequences may be in store.', 125.874, '2019-04-24', 8.25, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//or06FN3Dka5tukK1e9sl16pB3iy.jpg', 0, '2024-10-19 05:02:26', '0000-00-00 00:00:00'),
(155, 1, 47369, 'daniel fernando', 'try try try', 6.986, '2006-04-09', 6, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//cEI5aazuAVJ3PcWeNM8gxYiNjmq.jpg', 0, '2024-10-19 05:02:56', '0000-00-00 00:00:00'),
(156, 1, 1041898, 'magkano pamasahe bossing', 'A penniless mother, with her infant child, takes on a journey by land and sea to find her husband in Manila. But this trip won\'t be free for she has to use her body to get to her destination.', 10.421, '2022-12-09', 6.1, 'https://image.tmdb.org/t/p/original//i7pZrEkDs7LecD6KVFREniPkY6I.jpg', 'https://image.tmdb.org/t/p/original//r132GuHMQ5UhuMa3nwu6jbyJxmJ.jpg', 0, '2024-10-19 05:03:35', '0000-00-00 00:00:00'),
(157, 1, 557, 'Spider-Man', 'After being bitten by a genetically altered spider at Oscorp, nerdy but endearing high school student Peter Parker is endowed with amazing powers to become the superhero known as Spider-Man.', 96.423, '2002-05-01', 7.3, 'https://image.tmdb.org/t/p/original//2PDTWfuBWQKVC7aPAqJK5UCpz08.jpg', 'https://image.tmdb.org/t/p/original//gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg', 0, '2024-10-19 06:25:43', '0000-00-00 00:00:00'),
(158, 1, 557, 'Spider-Man', 'After being bitten by a genetically altered spider at Oscorp, nerdy but endearing high school student Peter Parker is endowed with amazing powers to become the superhero known as Spider-Man.', 96.423, '2002-05-01', 7.3, 'https://image.tmdb.org/t/p/original//2PDTWfuBWQKVC7aPAqJK5UCpz08.jpg', 'https://image.tmdb.org/t/p/original//gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg', 0, '2024-10-19 06:54:29', '0000-00-00 00:00:00'),
(159, 1, 557, 'Spider-Man', 'After being bitten by a genetically altered spider at Oscorp, nerdy but endearing high school student Peter Parker is endowed with amazing powers to become the superhero known as Spider-Man.', 96.423, '2002-05-01', 7.3, 'https://image.tmdb.org/t/p/original//2PDTWfuBWQKVC7aPAqJK5UCpz08.jpg', 'https://image.tmdb.org/t/p/original//gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg', 0, '2024-10-19 06:54:32', '0000-00-00 00:00:00'),
(160, 1, 445033, 'Spider-Man', 'Spider-man must rescue the beautiful daughter of the evil Dr. Lightning.', 8.889, '1969-01-01', 6.828, 'https://image.tmdb.org/t/p/original/null', 'https://image.tmdb.org/t/p/original//iYBfBk1i9zjN9Vybbj8UgTYzkyv.jpg', 0, '2024-10-19 06:55:05', '0000-00-00 00:00:00'),
(161, 1, 557, 'Spider-Man', 'After being bitten by a genetically altered spider at Oscorp, nerdy but endearing high school student Peter Parker is endowed with amazing powers to become the superhero known as Spider-Man.', 96.423, '2002-05-01', 7.3, 'https://image.tmdb.org/t/p/original//2PDTWfuBWQKVC7aPAqJK5UCpz08.jpg', 'https://image.tmdb.org/t/p/original//gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg', 0, '2024-10-19 06:57:42', '0000-00-00 00:00:00'),
(162, 1, 557, 'Spider-Man', 'After being bitten by a genetically altered spider at Oscorp, nerdy but endearing high school student Peter Parker is endowed with amazing powers to become the superhero known as Spider-Man.', 96.423, '2002-05-01', 7.3, 'https://image.tmdb.org/t/p/original//2PDTWfuBWQKVC7aPAqJK5UCpz08.jpg', 'https://image.tmdb.org/t/p/original//gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg', 0, '2024-10-19 06:58:02', '0000-00-00 00:00:00'),
(163, 1, 1062807, 'SPY x FAMILY CODE: White', 'While under the guise of taking his family on a weekend winter getaway, Loid\'s attempt to make progress on his current mission Operation Strix proves difficult when Anya mistakenly gets involved and triggers events that threaten world peace.', 83.372, '2023-12-22', 7.029, 'https://image.tmdb.org/t/p/original//zVDJ4cRgSpHlILSm7kGiklHQ6O7.jpg', 'https://image.tmdb.org/t/p/original//xlIQf4y9eB14iYzNN142tROIWON.jpg', 0, '2024-10-19 06:58:06', '0000-00-00 00:00:00'),
(164, 1, 533535, 'Deadpool & Wolverine', 'A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.', 2490.06, '2024-07-24', 7.7, 'https://image.tmdb.org/t/p/original//yDHYTfA3R0jFYba16jBB1ef8oIt.jpg', 'https://image.tmdb.org/t/p/original//8cdWjvZQUExUUTzyp4t6EDMubfO.jpg', 0, '2024-10-19 06:59:31', '0000-00-00 00:00:00'),
(165, 1, 293644, 'Top Cat Begins', 'Top Cat and his new feline friend hatch a scheme to steal from the fearful Mr. Big.', 9.953, '2015-10-30', 6.7, 'https://image.tmdb.org/t/p/original//ul1YQyy7KNGUPvhrDmb1W81QpY9.jpg', 'https://image.tmdb.org/t/p/original//qqgXfEgWUm3GjQ1QorETpACXeZQ.jpg', 0, '2024-10-19 07:00:07', '0000-00-00 00:00:00'),
(166, 1, 392524, 'Axis', 'On the morning he is set to star in a career changing blockbuster film, an Irish actor trying to live down his rocky past confronts a series of devastating events that threaten his sobriety, his loved ones, and ultimately his life.', 3.625, '2017-04-07', 6.1, 'https://image.tmdb.org/t/p/original//r912sA8nSE2rzs8Z1U3ehatLCIv.jpg', 'https://image.tmdb.org/t/p/original//anlxJfzP1DoiWZ31binNPosfMa7.jpg', 0, '2024-10-19 07:01:26', '0000-00-00 00:00:00'),
(167, 1, 76600, 'Avatar: The Way of Water', 'Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.', 170.969, '2022-12-14', 7.62, 'https://image.tmdb.org/t/p/original//8rpDcsfLJypbO6vREc0547VKqEv.jpg', 'https://image.tmdb.org/t/p/original//t6HIqrRAclMCA60NsSmeqe9RmNV.jpg', 0, '2024-10-19 07:02:24', '0000-00-00 00:00:00'),
(168, 1, 667538, 'Transformers: Rise of the Beasts', 'When a new threat capable of destroying the entire planet emerges, Optimus Prime and the Autobots must team up with a powerful faction known as the Maximals. With the fate of humanity hanging in the balance, humans Noah and Elena will do whatever it takes to help the Transformers as they engage in the ultimate battle to save Earth.', 198.721, '2023-06-06', 7.301, 'https://image.tmdb.org/t/p/original//2vFuG6bWGyQUzYS9d69E5l85nIz.jpg', 'https://image.tmdb.org/t/p/original//gPbM0MK8CP8A174rmUwGsADNYKD.jpg', 0, '2024-10-19 07:02:49', '0000-00-00 00:00:00'),
(169, 1, 892153, 'Tom and Jerry Cowboy Up!', 'This time, the rivals team up to help a cowgirl and her brother save their homestead from a greedy land-grabber, and they’re going to need some help! Jerry’s three precocious nephews are all ready for action, and Tom is rounding up a posse of prairie dogs. But can a ragtag band of varmints defeat a deceitful desperado determined to deceive a damsel in distress? No matter what happens with Tom and Jerry in the saddle, it’ll be a rootin’ tootin’ good time!', 23.681, '2022-01-24', 6.9, 'https://image.tmdb.org/t/p/original//q1NXVYTqSStNQsnKrCvtU6NPzEk.jpg', 'https://image.tmdb.org/t/p/original//muIaHotSaSUQr0KZCIJOYQEe7y2.jpg', 0, '2024-10-19 07:05:41', '0000-00-00 00:00:00'),
(170, 1, 315635, 'Spider-Man: Homecoming', 'Following the events of Captain America: Civil War, Peter Parker, with the help of his mentor Tony Stark, tries to balance his life as an ordinary high school student in Queens, New York City, with fighting crime as his superhero alter ego Spider-Man as a new threat, the Vulture, emerges.', 127.5, '2017-07-05', 7.3, 'https://image.tmdb.org/t/p/original//fn4n6uOYcB6Uh89nbNPoU2w80RV.jpg', 'https://image.tmdb.org/t/p/original//c24sv2weTHPsmDa7jEMN0m2P3RT.jpg', 0, '2024-10-19 07:06:26', '0000-00-00 00:00:00'),
(171, 1, 268, 'Batman', 'Batman must face his most ruthless nemesis when a deformed madman calling himself \"The Joker\" seizes control of Gotham\'s criminal underworld.', 48.739, '1989-06-21', 7.235, 'https://image.tmdb.org/t/p/original//2va32apQP97gvUxaMnL5wYt4CRB.jpg', 'https://image.tmdb.org/t/p/original//cij4dd21v2Rk2YtUQbV5kW69WB2.jpg', 0, '2024-10-19 07:07:25', '0000-00-00 00:00:00'),
(172, 1, 268, 'Batman', 'Batman must face his most ruthless nemesis when a deformed madman calling himself \"The Joker\" seizes control of Gotham\'s criminal underworld.', 48.739, '1989-06-21', 7.235, 'https://image.tmdb.org/t/p/original//2va32apQP97gvUxaMnL5wYt4CRB.jpg', 'https://image.tmdb.org/t/p/original//cij4dd21v2Rk2YtUQbV5kW69WB2.jpg', 0, '2024-10-19 07:08:22', '0000-00-00 00:00:00'),
(173, 1, 1002644, 'Spider', 'Desperate to win a man\'s affections, Roshanda James uses murder and witchcraft to make herself appear as a beautiful seductress. No man can resist the Black Widow Spider.', 4.165, '2022-05-12', 6.2, 'https://image.tmdb.org/t/p/original/null', 'https://image.tmdb.org/t/p/original//jireX9062do8ETnOxYcFcvse1fY.jpg', 0, '2024-10-19 07:09:15', '0000-00-00 00:00:00'),
(174, 1, 593959, 'TESTTEST', 'Pororo and his friends at the pirate restaurant accidentally take a treasure map of the legendary treasure and head to the treasure island. While searching for friends scattered on the mysterious treasure island where the secrets of ancient civilization are kept, they meet a long-trapped pirate hero, Captain Silver, and solves the mystery of the treasure map with him. But they fall into danger because of the evil pirate Captain Black, who chased after them, and the monsters on the treasure island. Can Pororo and his friends come back safely in search of the treasures?', 4.225, '2019-04-25', 8, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//geWOb6bxqIsfVzmIcYaatGGWhGp.jpg', 0, '2024-10-19 07:10:09', '0000-00-00 00:00:00'),
(175, 1, 593959, 'TESTTEST', 'Pororo and his friends at the pirate restaurant accidentally take a treasure map of the legendary treasure and head to the treasure island. While searching for friends scattered on the mysterious treasure island where the secrets of ancient civilization are kept, they meet a long-trapped pirate hero, Captain Silver, and solves the mystery of the treasure map with him. But they fall into danger because of the evil pirate Captain Black, who chased after them, and the monsters on the treasure island. Can Pororo and his friends come back safely in search of the treasures?', 4.225, '2019-04-25', 8, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//geWOb6bxqIsfVzmIcYaatGGWhGp.jpg', 0, '2024-10-19 07:10:24', '0000-00-00 00:00:00'),
(176, 1, 593959, 'TESTTEST', 'Pororo and his friends at the pirate restaurant accidentally take a treasure map of the legendary treasure and head to the treasure island. While searching for friends scattered on the mysterious treasure island where the secrets of ancient civilization are kept, they meet a long-trapped pirate hero, Captain Silver, and solves the mystery of the treasure map with him. But they fall into danger because of the evil pirate Captain Black, who chased after them, and the monsters on the treasure island. Can Pororo and his friends come back safely in search of the treasures?', 4.225, '2019-04-25', 8, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//geWOb6bxqIsfVzmIcYaatGGWhGp.jpg', 0, '2024-10-19 07:11:31', '0000-00-00 00:00:00'),
(177, 1, 1087822, 'Hellboy: The Crooked Man', 'Hellboy and a rookie BPRD agent get stranded in 1950s rural Appalachia. There, they discover a small community haunted by witches, led by a local devil with a troubling connection to Hellboy\'s past: the Crooked Man.', 1158.95, '2024-08-29', 4.9, 'https://image.tmdb.org/t/p/original//g1z1ZvYKcmk9EnVOTYXR6vkNjkZ.jpg', 'https://image.tmdb.org/t/p/original//iz2GabtToVB05gLTVSH7ZvFtsMM.jpg', 0, '2024-10-19 07:11:34', '0000-00-00 00:00:00'),
(178, 1, 593959, 'TESTTEST', 'Pororo and his friends at the pirate restaurant accidentally take a treasure map of the legendary treasure and head to the treasure island. While searching for friends scattered on the mysterious treasure island where the secrets of ancient civilization are kept, they meet a long-trapped pirate hero, Captain Silver, and solves the mystery of the treasure map with him. But they fall into danger because of the evil pirate Captain Black, who chased after them, and the monsters on the treasure island. Can Pororo and his friends come back safely in search of the treasures?', 4.225, '2019-04-25', 8, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//geWOb6bxqIsfVzmIcYaatGGWhGp.jpg', 0, '2024-10-19 07:11:45', '0000-00-00 00:00:00'),
(179, 1, 38579, 'Marmadukse', 'When Phil and Debbie Winslow relocate from their native Kansas to the sunny climes of Orange County, their big-hearted, havoc-wreaking Great Dane gets a taste of the dog\'s life, California-style.', 20.341, '2010-06-03', 5.2, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//e1hxniKMiRIpGiad0BCATn4d8uv.jpg', 0, '2024-10-19 07:14:05', '0000-00-00 00:00:00'),
(180, 1, 874745, 'hello', 'To Me, the One Who Loved Your', 28.583, '2022-10-07', 5.9, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//dwJ6bxgPUC2xdiI904JCZS4BEAJ.jpg', 0, '2024-10-19 07:18:31', '0000-00-00 00:00:00'),
(181, 1, 1087822, 'Hellboy: The Crooked Man', 'Hellboy and a rookie BPRD agent get stranded in 1950s rural Appalachia. There, they discover a small community haunted by witches, led by a local devil with a troubling connection to Hellboy\'s past: the Crooked Man.', 1158.95, '2024-08-29', 4.9, 'https://image.tmdb.org/t/p/original//g1z1ZvYKcmk9EnVOTYXR6vkNjkZ.jpg', 'https://image.tmdb.org/t/p/original//iz2GabtToVB05gLTVSH7ZvFtsMM.jpg', 0, '2024-10-19 07:19:27', '0000-00-00 00:00:00'),
(182, 1, 519182, 'Despicable Me 4', 'Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.', 1192.58, '2024-06-20', 7.125, 'https://image.tmdb.org/t/p/original//lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg', 'https://image.tmdb.org/t/p/original//wWba3TaojhK7NdycRhoQpsG0FaH.jpg', 0, '2024-10-19 07:23:36', '0000-00-00 00:00:00'),
(183, 1, 324857, 'Spider-Man: Into the Spider-Verse', 'Struggling to find his place in the world while juggling school and family, Brooklyn teenager Miles Morales is unexpectedly bitten by a radioactive spider and develops unfathomable powers just like the one and only Spider-Man. While wrestling with the implications of his new abilities, Miles discovers a super collider created by the madman Wilson \"Kingpin\" Fisk, causing others from across the Spider-Verse to be inadvertently transported to his dimension.', 112.763, '2018-12-06', 8.4, 'https://image.tmdb.org/t/p/original//qGQf2OHIkoh89K8XeKQzhxczf96.jpg', 'https://image.tmdb.org/t/p/original//iiZZdoQBEYBv6id8su7ImL0oCbD.jpg', 0, '2024-10-19 07:23:55', '0000-00-00 00:00:00'),
(184, 1, 268, 'Batman', 'Batman must face his most ruthless nemesis when a deformed madman calling himself \"The Joker\" seizes control of Gotham\'s criminal underworld.', 48.739, '1989-06-21', 7.235, 'https://image.tmdb.org/t/p/original//2va32apQP97gvUxaMnL5wYt4CRB.jpg', 'https://image.tmdb.org/t/p/original//cij4dd21v2Rk2YtUQbV5kW69WB2.jpg', 0, '2024-10-19 07:24:49', '0000-00-00 00:00:00'),
(185, 1, 268, 'Batman', 'Batman must face his most ruthless nemesis when a deformed madman calling himself \"The Joker\" seizes control of Gotham\'s criminal underworld.', 48.739, '1989-06-21', 7.235, 'https://image.tmdb.org/t/p/original//2va32apQP97gvUxaMnL5wYt4CRB.jpg', 'https://image.tmdb.org/t/p/original//cij4dd21v2Rk2YtUQbV5kW69WB2.jpg', 0, '2024-10-19 07:24:51', '0000-00-00 00:00:00'),
(186, 1, 211672, 'Minions', 'Minions Stuart, Kevin and Bob are recruited by Scarlet Overkill, a super-villain who, alongside her inventor husband Herb, hatches a plot to take over the world.', 30.78, '2015-06-17', 6.411, 'https://image.tmdb.org/t/p/original//c7xTZ9EA6GpH72xJC5s0x0KKR1a.jpg', 'https://image.tmdb.org/t/p/original//dr02BdCNAUPVU07aOodwPYv6HCf.jpg', 0, '2024-10-19 07:34:18', '0000-00-00 00:00:00'),
(187, 1, 225914, 'Spider-Man', 'When an extortionist threatens to force a multi-suicide unless a huge ransom is paid, only Peter Parker can stop him with his new powers as Spider-Man.', 31.531, '1977-09-14', 6.141, 'https://image.tmdb.org/t/p/original//zlpZzccypkAYFZIyYLQcchl90ZC.jpg', 'https://image.tmdb.org/t/p/original//jNxRHZ2cxVkNRtxgHuCtv7GY4JP.jpg', 0, '2024-10-19 07:37:53', '0000-00-00 00:00:00'),
(188, 1, 9613, 'Spider', 'A mentally disturbed man takes residence in a halfway house. His mind gradually slips back into the realm created by his illness, where he replays a key part of his childhood.', 9.931, '2002-11-06', 6.6, 'https://image.tmdb.org/t/p/original//zVVYFN9OjiSn43RVYrzgCOu7y6r.jpg', 'https://image.tmdb.org/t/p/original//zvm4WuYxTiGkRagRqHUey0meRQL.jpg', 0, '2024-10-19 07:38:39', '0000-00-00 00:00:00'),
(189, 1, 226979, 'Test', 'San Francisco, 1985. Two opposites attract at a modern dance company. Together, their courage and resilience are tested as they navigate a world full of risks and promise, against the backdrop of a disease no one seems to know anything about.', 8.268, '2013-06-29', 6.8, 'https://image.tmdb.org/t/p/original//xySCWwZVuU03xOsJfs1Qk8yG2DF.jpg', 'https://image.tmdb.org/t/p/original//tTWRomgIMOoIB3CJLPlVbqSawEm.jpg', 0, '2024-10-19 07:39:06', '0000-00-00 00:00:00'),
(190, 1, 211672, 'Minions', 'Minions Stuart, Kevin and Bob are recruited by Scarlet Overkill, a super-villain who, alongside her inventor husband Herb, hatches a plot to take over the world.', 30.78, '2015-06-17', 6.411, 'https://image.tmdb.org/t/p/original//c7xTZ9EA6GpH72xJC5s0x0KKR1a.jpg', 'https://image.tmdb.org/t/p/original//dr02BdCNAUPVU07aOodwPYv6HCf.jpg', 0, '2024-10-19 07:46:39', '0000-00-00 00:00:00'),
(191, 1, 1062807, 'SPY x FAMILY CODE: White', 'While under the guise of taking his family on a weekend winter getaway, Loid\'s attempt to make progress on his current mission Operation Strix proves difficult when Anya mistakenly gets involved and triggers events that threaten world peace.', 93.715, '2023-12-22', 7.029, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//xlIQf4y9eB14iYzNN142tROIWON.jpg', 0, '2024-10-19 07:49:56', '0000-00-00 00:00:00'),
(192, 1, 1062807, 'PARU PPARO', 'While under the guise of taking his family on a weekend winter getaway, Loid\'s attempt to make progress on his current mission Operation Strix proves difficult when Anya mistakenly gets involved and triggers events that threaten world peace.', 93.715, '2023-12-22', 7.029, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//xlIQf4y9eB14iYzNN142tROIWON.jpg', 0, '2024-10-19 07:50:53', '0000-00-00 00:00:00'),
(193, 1, 1184918, 'The Wild Robot123', 'After a shipwreck, an intelligent robot called Roz is stranded on an uninhabited island. To survive the harsh environment, Roz bonds with the island\'s animals and cares for an orphaned baby goose.', 4473.7, '2024-09-12', 8.615, 'https://image.tmdb.org/t/p/original/undefined', 'https://image.tmdb.org/t/p/original/https://image.tmdb.org/t/p/original//9w0Vh9eizfBXrcomiaFWTIPdboo.jpg', 0, '2024-10-19 07:51:06', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `userId`, `movieId`, `url`, `description`, `dateCreated`, `dateUpdated`) VALUES
(1, 1, 38, 'uploads/photos/poster1728019066.jpg', 'test', '2024-10-04 05:17:46', '0000-00-00 00:00:00'),
(2, 1, 38, 'https://image.tmdb.org/t/p/original/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg', 'Test Description', '2024-10-22 04:56:09', '0000-00-00 00:00:00');

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
(1, 'test2@mail.com', 'd8578edf8458ce06fbc5bb76a58c5ca4', 'Lem', '', 'Francisco', '09351107560', 'admin');

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
(1, 1, 38, 'https://www.youtube.com/embed/PARfU2Vi694', 'Avengers vs Ebony Maw & Cull Obsidian | Avengers Infinity War (2018) IMAX Movie Clip HD 4K', 'Youtube', 'PARfU2Vi694', 'Clip', 0, '2024-10-22 05:13:14', '0000-00-00 00:00:00'),
(2, 1, 38, 'https://www.youtube.com/embed/49xWJJvpjzI', 'Thor Arrives In Wakanda Scene - Avengers Infinity War (2018) Movie CLIP 4K ULTRA HD', 'YouTube', '49xWJJvpjzI', 'Clip', 0, '2024-10-22 05:15:45', '0000-00-00 00:00:00');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=194;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
