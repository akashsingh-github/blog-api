const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Writters = require('../Model/writer');
const Blogs = require('../Model/blog')


const JWT_SECRET = "kakhshj!@#%$#&*hgfgf9895634#$";

router.post('/sign-in', async (req, res) => {
    const {username, password} = req.body;
    const getuser = await Writters.findOne({username}).lean();

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

router.post('/add-blog', async (req, res) => {
    const {title, content, isApproved, writer} = req.body;

    try{
        const newBlog = await Blogs.create({
            title,
            content,
            isApproved,
            writer
        })
        res.json({status: 'ok', data: newBlog})
    }catch(err){
        throw err;
    }
})

router.get('/my-blogs/:writer', async (req, res) => {
    const {writer} = req.params;
    const getBlogs = await Blogs.find({'writer': writer}).lean()
    if(!getBlogs){
        res.json({status: 'ok', msg: "No blog post yet"})
    }
    else{
        res.json({status: 'ok', data: getBlogs})
    }
})
router.get('/my-blogs/:writer/:blog_id', async (req, res) => {
    const {writer, blog_id} = req.params;
    const getBlogs = await Blogs.find({'writer': writer, '_id': blog_id}).lean()
    if(!getBlogs){
        res.json({status: 'ok', msg: "No blog post yet"})
    }
    else{
        res.json({status: 'ok', data: getBlogs})
    }
})



module.exports = router