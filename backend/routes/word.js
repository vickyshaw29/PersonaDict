const express=require('express')
const router=express.Router()
const {getWords,postWords}=require('../controllers/wordcontroller')
router.get('/word',getWords)  /* getting all the words */
router.post('/word',postWords) /*adding words to get the values */




module.exports=router