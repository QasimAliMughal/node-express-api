const express = require('express');

const router = express.Router();
const PostModel = require('../models/postmodel')

router.get('/', async (request, response) => {
    try {

        const allPosts = await PostModel.find();
        response.send(allPosts);

    } catch (error) {
        response.json({message: error});
    }
});


router.post('/', async (request, response) => {
    try {

        const currentPost = new PostModel({title: request.body.title, description: request.body.description});
        const savedPost = await currentPost.save();
        response.json(savedPost);


    } catch (error) {
        response.json({message: error});
    }
});


router.get('/:id', async (request, response) => {


    try {

        const foundPost = await PostModel.findById(request.params.id);
        response.json(foundPost);


    } catch (error) {
        response.json({message: error});
    }


});


router.delete('/:id', async (request, response) => {

    try {
        // For multiple deletion i think
        // const deletedPost = await PostModel.remove({_id: request.params.id});
        const deletedPost = await PostModel.findByIdAndRemove(request.params.id);
        response.json(deletedPost);


    } catch (error) {
        response.json({message: error});
    }


});


router.patch('/:id', async (request, response) => {
    try { // If this does not work use update
        const updatedPost = await PostModel.updateOne({
            _id: request.params.id
        }, {
            $set: {
                title: request.body.title
            }
        });

        response.json(updatedPost);

    } catch (error) {
        response.json({message: error});
    }
});
module.exports = router;
