const express = require('express');
const router = express.Router();

const Blogs = require('../Model/blog');

router.get('/approved', async (req, res) => {
    const approvedBlogs = await Blogs.find({'isApproved': true}).lean();
    if(!approvedBlogs){
        res.json({status: 'ok', msg: "Nothing to show"})
    }
    else{
        res.json({status: 'ok', data: approvedBlogs})
    }
})
router.get('/non-approved', async (req, res) => {
    const notApprovedBlogs = await Blogs.find({'isApproved': false}).lean();
    if(!notApprovedBlogs){
        res.json({status: 'ok', msg: "No approval reamining"})
    }
    else{
        res.json({status: 'ok', data: notApprovedBlogs})
    }
})
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const blog = await Blogs.findOne({'_id': id}).lean()
    console.log(id)
    if(!blog){
        res.json({status: 'ok', msg: "No blog found"})
    }
    else{
        res.json({status: 'ok', data: blog})
    }
})
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {isApproved} = req.body; 
    const filter = { '_id': id}
    const update = {'isApproved': isApproved}
    // const blog = await Blogs.findOne({'_id': id}).lean()
    
    let updatedBlog = await Blogs.findOneAndUpdate(filter, update)
    res.json({status: 'ok', msg: 'should be updated', data: updatedBlog})
    
})
module.exports = router;