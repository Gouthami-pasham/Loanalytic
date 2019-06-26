var db = require('../db');

var regsitration = {
    getUserdetails: function(callback)
    {
        return db.query('SELECT * from tb_user', callback);
    },
    createUser: function (Matiere, callback) {
        return db.query('Insert into tb_user(User_id, FirstName,LastName,Mobile,Email,Age,DateOfBirth,SSN,Employee_id,Employeestatus) values(?,?,?,?,?,?,?,?)', callback);
    }
}

module.exports = regsitration;