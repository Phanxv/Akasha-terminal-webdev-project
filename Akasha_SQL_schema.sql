-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: akasha
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `postId` int NOT NULL AUTO_INCREMENT,
  `postTitle` varchar(255) NOT NULL,
  `postContent` varchar(1023) NOT NULL,
  `postAttachment` varchar(255) DEFAULT (NULL),
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`postId`),
  KEY `userId` (`userId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=10012 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (10003,'Project MKUltra conducted by CIA ','Project MKUltra was an illegal human experimentation program designed and undertaken by the U.S. Central Intelligence Agency (CIA) and intended to develop procedures and identify drugs that could be used during interrogations to weaken people and force confessions through brainwashing and psychological torture.','95mkultra-1708780792270.pdf',1018),(10004,'My Lai massacre','My Lai massacre was a war crime committed by United States Army personnel on 16 March 1968, involving the mass murder of unarmed civilians in South Vietnam during The Vietnam war','MyLaiAnAmericanTragedy-1708781282838.pdf',1015),(10005,'Image Preprocessing for LPR','Python source code for image preprocessing for LPR','LPR-1708781647110.py',1021),(10007,'Chlorine gas recipe','Chlorine can be manufactured by the electrolysis of a sodium chloride solution (brine), which is known as the Chloralkali process. The production of chlorine results in the co-products caustic soda (sodium hydroxide, NaOH) and hydrogen gas (H2). These two products, as well as chlorine itself, are highly reactive. Chlorine can also be produced by the electrolysis of a solution of potassium chloride, in which case the co-products are hydrogen and caustic potash (potassium hydroxide). There are three industrial methods for the extraction of chlorine by electrolysis of chloride solutions',NULL,1021),(10008,'The Anarchists Cook book','A book full of funny and silly recipe.','anarchists-cook-book-1708843796659.pdf',1021),(10009,'Project Artichoke (Blue Bird) by The CIA','Initially known as Project Bluebird, Project Artichoke was operated by the CIA Office of Scientific Intelligence.The primary goal of Project Artichoke was to determine whether a person could be involuntarily made to perform an act of attempted assassination. The project also studied the effects of hypnosis, forced addiction to morphine, and other chemicals, including LSD, to produce amnesia and other vulnerable states in subjects.','CIA-Artichoke-1708851213001.pdf',1021),(10010,'Project HAARP','The High-frequency Active Auroral Research Program (HAARP) is a University of Alaska Fairbanks program which researches the ionosphere – the highest, ionized part of Earths atmosphere.',NULL,1021),(10011,'test','test','IP-1709276013481.py',1021);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userName` (`userName`)
) ENGINE=InnoDB AUTO_INCREMENT=1023 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1014,'testuser001','123456789'),(1015,'KanyeWest007','niggainparis'),(1018,'JeffreyEps','loremipsum'),(1019,'Furue','imgonnakms'),(1020,'testuser002','alphabravo'),(1021,'Phanxv101','123456789'),(1022,'test12345','12345678');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-09 14:38:23
