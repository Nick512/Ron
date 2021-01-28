const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ScDSchema = new Schema({
	
	userID: {
		type: String,
		required: true,
	},
	points: {
		type: Number,
		default: 0
	},
	grades: { 
		type: Array,
		default: []
	}
})

module.exports = ScD = mongoose.model("ScD", ScDSchema)
