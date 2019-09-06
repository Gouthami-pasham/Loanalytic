-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: loanalytic
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_admin`
--

DROP TABLE IF EXISTS `tb_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_admin` (
  `Employee_ID` int(20) NOT NULL,
  `FirstName` varchar(45) NOT NULL,
  `LastName` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `Designation` varchar(45) NOT NULL,
  PRIMARY KEY (`Employee_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_admin`
--

LOCK TABLES `tb_admin` WRITE;
/*!40000 ALTER TABLE `tb_admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_applications`
--

DROP TABLE IF EXISTS `tb_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_applications` (
  `Application_id` int(11) NOT NULL,
  `User_id` int(11) DEFAULT NULL,
  `Employee_id` int(11) DEFAULT NULL,
  `Loan_id` int(11) DEFAULT NULL,
  `credit_id` int(11) DEFAULT NULL,
  `Document_id` int(11) DEFAULT NULL,
  `Verification_Status` varchar(45) DEFAULT NULL,
  `Loan_Status` varchar(45) DEFAULT NULL,
  `Payment_Type` varchar(45) DEFAULT NULL,
  `Previous_Bankrupcy` varchar(45) DEFAULT NULL,
  `Application_Date` datetime DEFAULT NULL,
  `Start_Date` datetime DEFAULT NULL,
  `End_Date` datetime DEFAULT NULL,
  `Previous_Application_id` int(11) DEFAULT NULL,
  `Price` decimal(10,0) DEFAULT NULL,
  `SSN` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Application_id`),
  KEY `FK_EMLOYEE_ID_idx` (`Employee_id`),
  KEY `FK_LOAN_ID_idx` (`Loan_id`),
  KEY `FK_CREDIT_ID_idx` (`credit_id`),
  KEY `FK_DOCUMENT_ID_idx` (`Document_id`),
  KEY `FK_USER_ID_idx` (`User_id`),
  CONSTRAINT `FK_CREDIT_ID` FOREIGN KEY (`credit_id`) REFERENCES `tb_credit_score` (`Credit_id`),
  CONSTRAINT `FK_DOCUMENT_ID` FOREIGN KEY (`Document_id`) REFERENCES `tb_document` (`DOCUMENT_ID`),
  CONSTRAINT `FK_EMLOYEE_ID` FOREIGN KEY (`Employee_id`) REFERENCES `tb_admin` (`Employee_ID`),
  CONSTRAINT `FK_LOAN_ID` FOREIGN KEY (`Loan_id`) REFERENCES `tb_loan_type` (`Loan_id`),
  CONSTRAINT `FK_USER_ID` FOREIGN KEY (`User_id`) REFERENCES `tb_user` (`User_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_applications`
--

LOCK TABLES `tb_applications` WRITE;
/*!40000 ALTER TABLE `tb_applications` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_credit_score`
--

DROP TABLE IF EXISTS `tb_credit_score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_credit_score` (
  `Credit_id` int(11) NOT NULL,
  `Credit_Score` varchar(45) NOT NULL,
  `Range` varchar(45) NOT NULL,
  PRIMARY KEY (`Credit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_credit_score`
--

LOCK TABLES `tb_credit_score` WRITE;
/*!40000 ALTER TABLE `tb_credit_score` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_credit_score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_document`
--

DROP TABLE IF EXISTS `tb_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_document` (
  `DOCUMENT_ID` int(11) NOT NULL,
  `APPLICATION_ID` int(11) NOT NULL,
  `DOCUMENT_NAME` varchar(45) NOT NULL,
  `Document` varchar(45) NOT NULL,
  PRIMARY KEY (`DOCUMENT_ID`),
  KEY `FK_APPLICATION_ID_idx` (`APPLICATION_ID`),
  CONSTRAINT `FK_APPLICATION_ID` FOREIGN KEY (`APPLICATION_ID`) REFERENCES `tb_applications` (`Application_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_document`
--

LOCK TABLES `tb_document` WRITE;
/*!40000 ALTER TABLE `tb_document` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_loan_type`
--

DROP TABLE IF EXISTS `tb_loan_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_loan_type` (
  `Loan_id` int(11) NOT NULL,
  `Type` varchar(45) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Description` varchar(45) NOT NULL,
  `Interest_Rate` decimal(10,0) NOT NULL,
  `Interest_Type` varchar(45) NOT NULL,
  `Tenure` decimal(10,0) NOT NULL,
  PRIMARY KEY (`Loan_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_loan_type`
--

LOCK TABLES `tb_loan_type` WRITE;
/*!40000 ALTER TABLE `tb_loan_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_loan_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user`
--

DROP TABLE IF EXISTS `tb_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_user` (
  `User_id` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(45) DEFAULT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `Mobile` varchar(10) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `Age` int(3) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `SSN` int(9) DEFAULT NULL,
  `Employeestatus` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `newpassword` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`User_id`)
) ENGINE=InnoDB AUTO_INCREMENT=123587 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user`
--

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
INSERT INTO `tb_user` VALUES (123574,'Gangadhar','Adusumalli','6605280325','naveenadusumalli@gmail.com',NULL,'2019-07-05',999999999,'Employed','Test0.','test'),(123575,'Taraak','Ravi','6605280325','pedditarakaraviteja@gmail.com',NULL,'2019-07-05',999999999,'Employed','Test0.','test'),(123576,'Qin','Zhen','6605280325','zqin@nwmissouri.edu',NULL,'2019-07-11',999999999,'Employed','Test0.','test'),(123581,'Preetham','Potu','6608530457','preetham.reddy16@gmail.com',NULL,'2019-07-11',999999999,'UnEmployed','Welcome123@','test'),(123582,'Sai','Nalivela','6605280325','sainalivela@gmail.com',NULL,'2019-07-11',999999999,'Employed','Test0.','test'),(123583,'Gouthami','Pasham','2032158224','gouthamip811@gmail.com',NULL,'2019-07-11',999999999,'Employed','Test0.','test'),(123586,'Jerry','Qin','6605280325','gangadharadusumalli1993@gmail.com',NULL,'1992-07-27',999999999,'Employed','Welcome123$','test');
/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-06 10:12:06
