var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EmployeeSchema   = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String
});

module.exports = mongoose.model('Employee', EmployeeSchema);