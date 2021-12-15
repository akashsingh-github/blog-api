const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admins = require('../Model/admin');
const Writters = require('../Model/writer');


const JWT_SECRET = "kakhshj!@#%$#&*hjfjhaj659uhdsuuhsdjkehdhu";

router.post('/register', async (req, res) => {
    const {name, username, password: plaintext} = req.body;
    if(!username || typeof username != 'string'){
        return res.json({status: 'error', error: 'Invalid username'})
    }
    if(!plaintext || typeof plaintext != 'string'){
        return res.json({status: 'error', error: 'Invalid password'})
    }
    if(plaintext.length < 6){
        return res.json({status: 'error', error: 'Password should greater than 6 character'})
    }
    const password = await bcrypt.hash(plaintext, 10);
    try{
        const newUser = await Admins.create({
            name,
            username,
            password
        })
        console.log("New user created successfully!!!", newUser);
        res.send("Got it")
    }catch(err){
        if(err.code === 11000){
            // duplicate key error
            return res.json({status: 'error', error: 'Username already exists!!'})
        }
        throw err;
    }
    console.log(req.body)

})

router.post('/sign-in', async (req, res) => {
    const {username, password} = req.body;
    const getuser = await Admins.findOne({username}).lean();

    if(!getuser){
        return res.json({status: 'error', error: "user not found!!"});
    }
    if(await bcrypt.compare(password, getuser.password)){
        // successfull combination of username and password
        const token = jwt.sign(
            {
                id: getuser._id,
                username: getuser.username
            },
            JWT_SECRET
        )
        return res.json({status: 'ok', data: token})
    }
    res.json({status: 'error', error: 'Invalid username/password!!'})
})

router.post('/add-writter', async (req, res) => {
    const {username, password: plaintext} = req.body;
    if(!username || typeof username != 'string'){
        return res.json({status: 'error', error: 'Invalid username'})
    }
    if(!plaintext || typeof plaintext != 'string'){
        return res.json({status: 'error', error: 'Invalid password'})
    }
    if(plaintext.length < 6){
        return res.json({status: 'error', error: 'Password should greater than 6 character'})
    }
    const password = await bcrypt.hash(plaintext, 10);
    try{
        const newWritter = await Writters.create({
            username,
            password
        })
        console.log("New user created successfully!!!", newWritter);
        res.json({status: 'ok', data: newWritter})
    }catch(err){
        if(err.code === 11000){
            // duplicate key error
            return res.json({status: 'error', error: 'Username already exists!!'})
        }
        throw err;
    }
    console.log(req.body)

})

module.exports = router;