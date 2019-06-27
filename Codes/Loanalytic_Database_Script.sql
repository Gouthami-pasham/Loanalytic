-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: loananalytic
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
  KEY `FB_User_id_idx` (`User_id`),
  KEY `FK_EMLOYEE_ID_idx` (`Employee_id`),
  KEY `FK_LOAN_ID_idx` (`Loan_id`),
  KEY `FK_CREDIT_ID_idx` (`credit_id`),
  KEY `FK_DOCUMENT_ID_idx` (`Document_id`),
  CONSTRAINT `FK_CREDIT_ID` FOREIGN KEY (`credit_id`) REFERENCES `tb_credit_score` (`Credit_id`),
  CONSTRAINT `FK_DOCUMENT_ID` FOREIGN KEY (`Document_id`) REFERENCES `tb_document` (`DOCUMENT_ID`),
  CONSTRAINT `FK_EMLOYEE_ID` FOREIGN KEY (`Employee_id`) REFERENCES `tb_admin` (`Employee_ID`),
  CONSTRAINT `FK_LOAN_ID` FOREIGN KEY (`Loan_id`) REFERENCES `tb_loan_type` (`Loan_id`),
  CONSTRAINT `FK_User_id` FOREIGN KEY (`User_id`) REFERENCES `tb_user` (`User_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `tb_user`
--

DROP TABLE IF EXISTS `tb_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_user` (
  `User_id` int(11) NOT NULL,
  `FirstName` varchar(45) DEFAULT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `Mobile` int(11) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `Age` int(3) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `SSN` int(9) DEFAULT NULL,
  `Employee_id` varchar(45) NOT NULL,
  `Employeestatus` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`User_id`,`Employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-26 17:08:16
