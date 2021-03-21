const mongoose = require("mongoose")

const wordSchema = new mongoose.Schema({
	text: String,
	lexicalCategory: [],
	definitions: [],
	language: String,
})

const Word = mongoose.model("Word", wordSchema)

module.exports = Word