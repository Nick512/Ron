const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ScDSchema = new Schema({
	
	userID: {
		type: String,
		required: true,
	},
	invalidTests: {
		type: Number,
		default: 0,
	},
	validTests: {
		type: Number,
		default: 0,
	},
	qualityTests: {
		type: Number,
		default: 0,
	},
	excellentTests: {
		type: Number,
		default: 0,
	},
})

module.exports = ScD = mongoose.model("ScD", ScDSchema)
