var db = require('../db');

var loanApplication = {
    getUserdetails: function(callback)
    {
        return db.query('SELECT * from tb_user', callback);
    },

    getUserById: function(req,callback)
    {
        return db.query('SELECT * from tb_user where email='+"'"+req.email+"'", callback);
    },

    getTotalRecords: function(callback)
    {
        return db.query("SELECT * from tb_applications where Status='In Progress'", callback);
    },

    getApprovedRecords: function(callback)
    {
        return db.query("SELECT * from tb_applications where Status='Approved'", callback);
    },

    saveApplication: function (req, callback) {
        return db.query('Insert into tb_applications(Application_id,User_id,FirstName,LastName,Gender,Email,Mobile,SSN,LoanAmount,LoanTerm,Income,InterestType,PropertyTax,DownPayment,ApplicationDate,Status,CreditScore) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[req.applicationId,req.User_id,req.firstName,req.lastName,req.gender,req.email,req.phone,req.ssn,req.loanAmount,req.loanTerm,req.income,req.interestType,req.propertyTax,req.downPayment,req.applicationDate,req.status,req.creditScore], callback);
    },
    

    updateStatus:function(req,callback){
        return db.query('update tb_applications set Status='+"'"+req.status+"'"+' where Application_id='+"'"+req.applicationId+"'",callback);
    },

    uploadDocument:function(req,callback){
        return db.query('Insert into tb_document(Application_Id,DocumentName,Document) values(?,?,?)',[20191009231,"Naveen",req],callback);
    }

}

module.exports = loanApplication;