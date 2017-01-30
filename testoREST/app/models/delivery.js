var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DeliverySchema   = new Schema({
    name: String,
    delivery: Number,
    pickup: Number,
    unknown: Number
});

<<<<<<< HEAD
module.exports = mongoose.model('Delivery', DeliverySchema);
=======
module.exports = mongoose.model('Delivery', DeliverySchema);
>>>>>>> dfcc3a8761ef704f925bdf4ac0bd6bb8eaede28f
