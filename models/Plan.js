const mongoose = require('mongoose');
const Scheme = mongoose.Schema;
mongoose.Promise = global.Promise;

const PlanScheme = new Scheme({
	planId: String,
	planName: String,
	planPrice: Number
})

module.exports = mongoose.model("Plan", PlanScheme);