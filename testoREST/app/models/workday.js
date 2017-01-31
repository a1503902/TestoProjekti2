var mongoose = require('mongoose')
var Schema = mongoose.Schema

var WorkdaySchema = new Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    employee: String,
    start_time: Number,
    car: String,
    route: String,
    start_km: Number,
    deliveries: {
        postnord: {
            delivery: Number,
            pickup: Number,
            unknown: Number,
            nt: Number
        },
        bring: {
            delivery: Number,
            pickup: Number,
            dhl_return: Number,
            nt: Number
        },
        innight: {
            packages: Number,
            stops: Number
        }
    },
    stop_time: Number,
    stop_km: Number,
    adt_info: String,
    complete: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Workday', WorkdaySchema)
