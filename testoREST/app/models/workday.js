var mongoose = require('mongoose')
var Schema = mongoose.Schema

var WorkdaySchema = new Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    employeeId: String,
    employee: String,
    start_time: String,
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
    stop_time: String,
    breaks: Number,
    stop_km: Number,
    adt_info: String,
    complete: {
        type: Boolean,
        default: false
    },
    efficiency: Number
})

module.exports = mongoose.model('Workday', WorkdaySchema)
