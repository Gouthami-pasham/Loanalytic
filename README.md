# Loanalytic
# Description :
The purpose of Loanalytic-Web is to make the life of the borrower easy by simply registering to an online portal and get a loan approval. The application deals with 3 kinds of loans: Mortgage, Personal and Education loan. The user can quickly choose the kind of loan he wants and the amount he wants to borrow. Loan request would be validated by the application automatically as soon as the user answers few questions based on the kind of loan. The feasibility of loan approval would be displayed immediately. If the criteria is not met the user would be notified immediately else a background check is performed by the admin and a manual notification is sent by the admin. The application gives an opportunity to the admin to verify the user by validating the documents he has uploaded and doing some criminal/background check.  Above all, we hope to provide a comfortable user experience along with the best pricing available.


## Team Members:
<table style="width:100%;border: 1px solid black;">
<tr>
<th>Team Members Names</th>	
<th>Roles</th>
<th>Email Address</th>
<th>Phone Numbers</th>
  </tr>
  <tr>
  <td>Gangadhar Adusumalli</td>
  <td>Senior Architect</td>
  <td>S533704@nwmissouri.edu</td>
  <td>+16605280325</td>
  </tr>
  <tr>
  <td>Vamsee Krishna Gangapatnam</td>
  <td>Project Manager</td>
  <td>S533908@nwmissouri.edu</td>
  <td>+16605281049</td>
  </tr>
  <tr>
  <td>Keerthi Sree Kukunoor</td>
  <td>Software Engineer</td>
  <td>S533570@nwmissouri.edu</td>
  <td>+12159617144</td>
  </tr>
  <tr>
  <td>Gouthami Pasham</td>
  <td>Team Lead</td>
  <td>S533491@nwmissouri.edu</td>
  <td>+12032158224</td>
  </tr>
  <tr>
  <td>Taraka Raviteja Peddi</td>
  <td>Software Trainee</td>
  <td>S533904@nwmissouri.edu</td>
  <td>+16608530466</td>
  </tr>
  <tr>
  <td>Himabindu Poshala</td>
  <td>Software Engineer</td>
  <td>S533727@nwmissouri.edu</td>
  <td>+14694121091</td>
  </tr>
  <tr>
  <td>Meghana Putta </td>
  <td>Software Engineer</td>
  <td>S533909@nwmissouri.edu</td>
  <td>+14243979577</td>
  </tr>

  </table>


# Loanalytic ER Diagram :
The major features of Loanalytic database system as shown in the below diagram.

![](https://github.com/Gouthami-pasham/Loanalytic/blob/master/Initial%20Draft%20of%20Design%20ER%20Diagram.jpeg)

The above figure gives a complete description of all the entities used in the application. The description of each entity and the relation between them is specified below:
## User:
The user entity has all the attributes to store the information related to the user. It stores the information provided by the user during the registration phase.
## Admin:
The admin entity stores the details related to the employees working for the application. The attributes include the employee id, first name, last name, email and designation. 
## Document:
Document entity stores the required documents uploaded by the user and later the admin can view these documents.
## Applications:
Application table has all the information related to the application. 
##Loan Type:
Loan type is a master table, it has all the in information related to loans. Admin can introduce new loans into the system through the interface.
## Credit Score:
Credit score is a master entity, it stores the basic information of Credit score and the range associated with it.





