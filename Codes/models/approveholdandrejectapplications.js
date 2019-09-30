var db = require('../db');

var appstatus = {

    getApplicationstatus: function(req,callback)
    {
        return db.query('SELECT * from tb_applications where Application_id='+"'"+req.Application_id+"'"+'where Loan_Status='+"'"+req.Loan_Status+"'", callback);
    }

    
}

module.exports = appstatus;





