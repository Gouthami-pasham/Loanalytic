var db = require('../db');

var regsitration = {
    getUserdetails: function(callback)
    {
        return db.query('SELECT * from tb_user', callback);
    },

    getUserById: function(req,callback)
    {
        return db.query('SELECT * from tb_user where email='+"'"+req.email+"'", callback);
    },

    createUser: function (req, callback) {
        return db.query('Insert into tb_user(FirstName,LastName,Gender,Mobile,Email,Age,DateOfBirth,SSN,Employeestatus,password,newpassword,isActivated) values(?,?,?,?,?,?,?,?,?,?,?,?)',[req.firstName,req.lastName,req.gender,req.phone,req.email,null,req.dateofbirth,req.ssn,req.employeestatus,req.password,"",req.isactivated], callback);
    },

    updateUserById:function(req,callback){
        return db.query('update tb_user set password='+"'"+req.password+"'"+' where email='+"'"+req.email+"'",callback);
    },

    activateUserById:function(email,callback){
        return db.query('update tb_user set isActivated="Y" where email='+"'"+email+"'",callback);
    },

    updateUser:function(req,callback){
        return db.query('update tb_user set FirstName='+"'"+req.FirstName+"'"+', LastName='+"'"+req.LastName+"'"+',Gender='+"'"+req.Gender+"'"+',  Mobile='+"'"+req.Mobile+"'"+', SSN='+"'"+req.SSN+"'"+', Email='+"'"+req.Email+"'"+',DateOfBirth='+"'"+req.DateOfBirth+"'"+', Employeestatus='+"'"+req.Employeestatus+"'"+', password='+"'"+req.password+"'"+' where User_id='+"'"+req.User_id+"'",callback);
    }
}

module.exports = regsitration;