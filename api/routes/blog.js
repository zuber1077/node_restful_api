const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Blog = require('../models/blog');

router.get('/', (req, res, next) => {
  Blog.find({}).exec()
  .then(docs => {
    console.log(docs);
    // if (docs.length >= 0) {
      res.status(200).json(docs);
    // } else {
    //   res.status(404).json({
    //     message: 'No entries found'
    //   })
    // }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
})

router.post('/', (req, res, next) => {
  const blog = new Blog({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    body: req.body.body
  });
  blog.save().then(result => {
    console.log(result)
    res.status(201).json({
      message: 'POST /blog',
      createdBlog: blog
    })
  }).catch(error => {
    console.log(err);
    res.status(500).json({
      error: error
    });
  })
})

router.get('/:singleBlog', (req, res, next) => {
  const id = req.params.singleBlog;
  Blog.findById(id).exec()
  .then(doc => { 
    console.log(doc)
    if (doc) {
      res.status(200).json(doc); 
    } else {
      res.status(404).json({message: 'No valid entry found for provided ID'})
    }
  })
  .catch(err => {
    res.status(500).json({error: err})
  });
})

router.patch('/:singleBlog', (req, res, next) => {
  const id = req.params.singleBlog;

  const updateOps = {};
  for(const ops of req.body) {
    updateOps[ops.propTitle] = ops.value;
  }

  Blog.update({_id: id}, { $set: updateOps }).exec()
  .then(result => {
    console.log(result);
    res.status(200).json(result)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  });
})

router.delete('/:singleBlog', (req, res, next) => {
  const id = req.params.singleBlog;
  Blog.remove({_id: id}).exec()
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  });
})

module.exports = router;