var db = require('../db');

var app = {

    getApplicationdetails: function(req,callback)
    {
        return db.query('SELECT * from tb_applications where Application_id='+"'"+req.Application_id+"'", callback);
    }


}

module.exports = app; 