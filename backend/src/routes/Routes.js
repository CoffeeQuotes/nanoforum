const express = require('express');
const PostRoutes = require('./PostRoutes');
const UserRoutes = require('./UserRoutes');
const ForumRoutes = require('./ForumRoutes');
const ReplyRoutes = require('./ReplyRoutes');

const router = express.Router();

router.get('/', (req, res) => {
    res.send({title: 'Welcome to Nanoforum API.', body: 'Here are list of routes: posts'});
});

router.use('/posts', PostRoutes);
router.use('/users', UserRoutes);
router.use('/forums', ForumRoutes);
router.use('/reply', ReplyRoutes);

module.exports = router;
