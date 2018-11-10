const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'posts '
  });
})

router.post('/', (req, res, next) => {
  const post = {
    postId: req.body.postId,
    category: req.body.category 
  }
  res.status(201).json({
    message: 'posts create',
    cratedPost: post
  });
})

router.get('/:postId', (req, res, next) => {
  res.status(201).json({
    message: 'posts detail',
    postId: req.params.postId
  });
})

router.delete('/:postId', (req, res, next) => {
  res.status(201).json({
    message: 'posts delete',
    postId: req.params.postId
  });
})
module.exports = router;