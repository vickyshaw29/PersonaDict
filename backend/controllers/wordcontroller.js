const fetch = require('node-fetch')
const Word = require('../models/word')
exports.getWords = async (req, res) => {
    try {
        const { search } = req.query
        if (!search) {
            var wordsArray = await Word.find()
        } else {
                wordsArray = await Word.find({
                text: { $regex: `${search}`, $options: "i" },
            }) //getting all the words from the database
        }
        res.json(wordsArray) //serving the words
    } catch (error) {
        console.log(error)
    }
}
exports.postWords = async (req, res) => {
    try {
        const { word } = req.headers
        const match = await Word.findOne({ text: word })
        if (!match) {
            const sorceLang = 'en-gb'
            const data = await fetch(`${process.env.OXFORD_URL}/${sorceLang}/${word}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    app_id: `${process.env.APP_ID}`,
                    app_key: `${process.env.APP_KEY}`
                }
            })
            const response = await (data.json())
            // res.json(response)
            const id = response.results.map(a => a.lexicalEntries.map(b => b.lexicalCategory.id))
            const def = response.results.map(a => a.lexicalEntries.map(b => b.entries.map(c => c.senses.map(d => d.definitions))))
            // res.json(def[0][1])  
            const newWord = new Word({
                text: word,
                lexicalCategory: id,
                definitions: def
            })
            newWord.save()
            res.json({ msg: "you have successfully added your word" })
        }
        else {
            res.json({ msg: "the word already exists ! plz check" })
        }

    } catch (error) {
        res.json({error:"error found"})
    }
}