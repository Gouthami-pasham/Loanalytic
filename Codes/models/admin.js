var db = require('../db');

var adminlog = {
    getadmindetails: function(callback)
    {
        return db.query('SELECT * from tb_admin', callback);
    },
    createUser: function (req, callback) {
        return db.query('Insert into tb_admin(Employee_ID, FirstName,LastName,Email,Designation) values(?,?,?,?,?,?,?,?,?,?)',[123456,"Tarak",'Peddi',"6608530466",'pedditarakaraviteja25,',"self"], callback);
    }
}

module.exports = adminlog;