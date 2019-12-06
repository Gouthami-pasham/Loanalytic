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
  `Application_id` bigint(25) NOT NULL,
  `User_id` varchar(45) DEFAULT NULL,
  `FirstName` varchar(45) DEFAULT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `Gender` varchar(6) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `Mobile` varchar(10) DEFAULT NULL,
  `SSN` int(9) DEFAULT NULL,
  `LoanAmount` varchar(45) DEFAULT NULL,
  `LoanTerm` varchar(45) DEFAULT NULL,
  `Income` varchar(45) DEFAULT NULL,
  `InterestType` varchar(45) DEFAULT NULL,
  `PropertyTax` varchar(45) DEFAULT NULL,
  `DownPayment` varchar(45) DEFAULT NULL,
  `ApplicationDate` date DEFAULT NULL,
  `Status` varchar(20) DEFAULT NULL,
  `CreditScore` varchar(4) DEFAULT NULL,
  `Premium` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Application_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_applications`
--

LOCK TABLES `tb_applications` WRITE;
/*!40000 ALTER TABLE `tb_applications` DISABLE KEYS */;
INSERT INTO `tb_applications` VALUES (201910111541,'gouthamip811@gmail.com','Preetham','Potu','female','gangadharadusumalli1993@gmail.com','6605280325',999999999,'123456','25','56000','Quarterly','20000','300000','2019-10-11','Approved','668',NULL),(2019101114427,'gouthamip811@gmail.com','Naveen','Kumar','male','naveenadusumalli@gmail.com','6605280325',999999999,'98765','15','10000','Quarterly','3000','20000','2019-10-11','In Progress','',NULL),(2019112211518,'gangadharadusumalli1993@gmail.com','Naveen','Adusumalli','male','gangadharadusumalli1993@gmail.com','6605280325',999999999,'20000','20 years','90000','Halfyearly','20000','300000','2019-11-22','In Progress','545','575'),(2019116103757,'gouthamip811@gmail.com','Qin','Zhen','male','gangadharadusumalli1993@gmail.com','6605280325',999999999,'20000','10 years','80000','Quarterly','2000','20000','2019-11-06','Approved','843',NULL),(20191010211019,'gangadharadusumalli1993@gmail.com','Gangadhar','Adusumalli','female','gangadharadusumalli1993@gmail.com','6605280325',999999999,'123456','25','12345','Halfyearly','3422','20000','2019-10-10','Approved','',NULL),(20191010232431,'gangadharadusumalli1993@gmail.com','Vamshi','Gangapatnam','male','vamshi@gmail.com','6605280325',999999999,'98765','30','56000','Yearly','3000','20000','2019-10-10','Approved','',NULL),(20191020212541,NULL,'Gangadhar Adusumalli','Adusumalli','female','gangadharadusumalli1993@gmail.com','6605280325',999999999,'98765','10 years','56000','Halfyearly','3000','300000','2019-10-20','Rejected','598',NULL),(20191020212652,NULL,'Gangadhar Adusumalli','Adusumalli','female','gangadharadusumalli1993@gmail.com','6605280325',999999999,'98765','10 years','56000','Halfyearly','3000','300000','2019-10-20','Approved','598',NULL),(20191020212910,NULL,'Gangadhar Adusumalli','Adusumalli','female','gangadharadusumalli1993@gmail.com','6605280325',999999999,'98765','10 years','56000','Halfyearly','3000','300000','2019-10-20','Rejected','598',NULL),(20191020213527,NULL,'Gangadhar Adusumalli','Potu','female','gangadharadusumalli1993@gmail.com','6605280325',999999999,'98765','20 years','12345','Quarterly','20000','300000','2019-10-20','Rejected','696',NULL),(20191020213751,NULL,'Gangadhar Adusumalli','Potu','male','gangadharadusumalli1993@gmail.com','6605280325',999999999,'98765','10 years','12345','Quarterly','3000','300000','2019-10-20','Approved','594',NULL);
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
  `Document_id` int(11) NOT NULL AUTO_INCREMENT,
  `Application_id` bigint(25) NOT NULL,
  `DocumentType` varchar(20) NOT NULL,
  `DocumentName` varchar(45) NOT NULL,
  `DocumentPath` varchar(300) NOT NULL,
  PRIMARY KEY (`Document_id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_document`
--

LOCK TABLES `tb_document` WRITE;
/*!40000 ALTER TABLE `tb_document` DISABLE KEYS */;
INSERT INTO `tb_document` VALUES (64,20191020214750,'Address Proof','screen3.png','images/upload_images/20191020214750_screen3.png'),(65,20191020214750,'SSN Proof','Screenshot (99).png','images/upload_images/20191020214750_Screenshot (99).png'),(66,20191020214750,'Income Proof','Screenshot (101).png','images/upload_images/20191020214750_Screenshot (101).png'),(67,2019116103757,'Address Proof','Screenshot (97).png','images/upload_images/2019116103757_Screenshot (97).png'),(68,2019116103757,'SSN Proof','Screenshot (101).png','images/upload_images/2019116103757_Screenshot (101).png'),(69,2019116103757,'Income Proof','basics.png','images/upload_images/2019116103757_basics.png'),(70,20191118165545,'Address Proof','Screenshot (234).png','images/upload_images/20191118165545_Screenshot (234).png'),(71,20191118165545,'SSN Proof','Screenshot (99).png','images/upload_images/20191118165545_Screenshot (99).png'),(72,20191118165545,'Income Proof','Screenshot (100).png','images/upload_images/20191118165545_Screenshot (100).png'),(73,20191119213825,'Address Proof','screen3.png','images/upload_images/20191119213825_screen3.png'),(74,20191119213825,'SSN Proof','Screenshot (101).png','images/upload_images/20191119213825_Screenshot (101).png'),(75,20191119213825,'Income Proof','Screenshot (97).png','images/upload_images/20191119213825_Screenshot (97).png'),(76,201911209198,'Address Proof','Screenshot (97).png','images/upload_images/201911209198_Screenshot (97).png'),(77,201911209198,'SSN Proof','Screenshot (101).png','images/upload_images/201911209198_Screenshot (101).png'),(78,201911209198,'Income Proof','Screenshot (99).png','images/upload_images/201911209198_Screenshot (99).png'),(79,20191122102715,'Address Proof','Screenshot (233).png','images/upload_images/20191122102715_Screenshot (233).png'),(80,20191122102715,'SSN Proof','Screenshot (234).png','images/upload_images/20191122102715_Screenshot (234).png'),(81,20191122102715,'Income Proof','Screenshot (235).png','images/upload_images/20191122102715_Screenshot (235).png'),(82,20191122104222,'Address Proof','Screenshot (99).png','images/upload_images/20191122104222_Screenshot (99).png'),(83,20191122104222,'SSN Proof','Screenshot (98).png','images/upload_images/20191122104222_Screenshot (98).png'),(84,20191122104222,'Income Proof','screen1.png','images/upload_images/20191122104222_screen1.png'),(85,20191122114752,'Address Proof','screen3.png','images/upload_images/20191122114752_screen3.png'),(86,20191122114752,'SSN Proof','Screenshot (100).png','images/upload_images/20191122114752_Screenshot (100).png'),(87,20191122114752,'Income Proof','Screenshot (99).png','images/upload_images/20191122114752_Screenshot (99).png'),(88,2019112211518,'Address Proof','Screenshot (99).png','images/upload_images/2019112211518_Screenshot (99).png'),(89,2019112211518,'SSN Proof','Screenshot (101).png','images/upload_images/2019112211518_Screenshot (101).png'),(90,2019112211518,'Income Proof','Screenshot (99).png','images/upload_images/2019112211518_Screenshot (99).png');
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
  `Gender` varchar(6) DEFAULT NULL,
  `Mobile` varchar(10) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `Age` int(3) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `SSN` int(9) DEFAULT NULL,
  `Employeestatus` varchar(45) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `newpassword` varchar(100) DEFAULT NULL,
  `isActivated` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`User_id`)
) ENGINE=InnoDB AUTO_INCREMENT=123601 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user`
--

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
INSERT INTO `tb_user` VALUES (123583,'Gouthami','Pasham','Female','9876543219','gouthamip811@gmail.com',NULL,'1992-07-11',123456788,'UnEmployed','U2FsdGVkX1/hYZbKEQR4l46B21Gn0u5zcqDJA2BR4BI=','test','Y'),(123584,'Admin','Loanalytic','Male',NULL,'supp.loanalytic2019@gmail.com',NULL,NULL,NULL,NULL,'U2FsdGVkX1+D4yMC+R/buRcuN7uKzNy8f/DVotvWw4w=',NULL,NULL),(123600,'Gangadhar','Adusumalli','Male','6605280325','gangadharadusumalli1993@gmail.com',NULL,'1990-12-02',888888888,'Employed','U2FsdGVkX1/scLxD/3NiBx6HTk2H1byfTIkb+8O8vBc=','','Y');
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

-- Dump completed on 2019-12-06 14:53:30
