var db = require('../db');

var regsitration = {
    getUserdetails: function(callback)
    {
        return db.query('SELECT * from tb_user', callback);
    },

    getUserById: function(req,callback)
    {
        return db.query('SELECT * from tb_user where email='+"'"+req.mail+"'", callback);
    },

    createUser: function (req, callback) {
        return db.query('Insert into tb_user(FirstName,LastName,Mobile,Email,Age,DateOfBirth,SSN,Employeestatus,password,newpassword) values(?,?,?,?,?,?,?,?,?,?)',[req.firstName,req.lastName,req.phone,req.email,null,req.dateofbirth,req.ssn,req.employeestatus,req.password,"test"], callback);
    },

    updateUser:function(req,callback){
        return db.query('update tb_user set newpassword='+req.newpassword+' where  email='+email+')',callback);
    }
}

module.exports = regsitration;