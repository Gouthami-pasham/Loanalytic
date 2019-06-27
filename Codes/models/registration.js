var db = require('../db');

var regsitration = {
    getUserdetails: function(callback)
    {
        return db.query('SELECT * from tb_user', callback);
    },
    createUser: function (req, callback) {
        return db.query('Insert into tb_user(User_id, FirstName,LastName,Mobile,Email,Age,DateOfBirth,SSN,Employee_id,Employeestatus) values(?,?,?,?,?,?,?,?,?,?)',[12356,"Gangadhar",'Adusumalli',"6605280325",'gangadharadusumalli1993',25,'1993-09-11',732110715,"xyz","self"], callback);
    }
}

module.exports = regsitration;