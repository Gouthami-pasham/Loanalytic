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
        return db.query("SELECT * from tb_applications where Status ='In Progress' ORDER BY ApplicationDate desc", callback);
    },
    
    getTotalDocuments: function(reqData,callback)
    {
        return db.query("SELECT * from tb_document where Application_id IN ("+reqData.ids+")", callback);
    },

    getApplicationRecords: function(req,callback)
    {
        return db.query('SELECT * from tb_applications where User_id ='+"'"+req.email+"' ORDER BY ApplicationDate desc", callback);
    },
    getApprovedRecords: function(callback)
    {
        return db.query("SELECT * from tb_applications where Status='Approved' ORDER BY ApplicationDate desc", callback);
    },
    getRejectedRecords: function(callback)
    {
        return db.query("SELECT * from tb_applications where Status='Rejected' ORDER BY ApplicationDate desc", callback);
    },

    saveApplication: function (req, callback) {
        return db.query('Insert into tb_applications(Application_id,User_id,FirstName,LastName,Gender,Email,Mobile,SSN,LoanAmount,LoanTerm,Income,InterestType,PropertyTax,DownPayment,ApplicationDate,Status,CreditScore,Premium) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[req.applicationId,req.User_id,req.firstName,req.lastName,req.gender,req.email,req.phone,req.ssn,req.loanAmount,req.loanTerm,req.income,req.interestType,req.propertyTax,req.downPayment,req.applicationDate,req.status,req.creditScore,req.premium], callback);
    },
    

    updateStatus:function(req,callback){
        return db.query('update tb_applications set Status='+"'"+req.status+"'"+' where Application_id='+"'"+req.applicationId+"'",callback);
    },

    uploadDocument:function(req,callback){
        return db.query('Insert into tb_document(Application_Id,DocumentType,DocumentName,DocumentPath) values(?,?,?,?)',[req.application_id,req.documentType,req.img_name,req.filePath],callback);
    }

}

module.exports = loanApplication;