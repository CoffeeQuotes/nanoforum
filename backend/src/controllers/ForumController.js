const {validationResult } = require('express-validator');

// import model 
const Forum = require('./../models/ForumModel');
// const Post = require("../models/PostModel");

// Get all Forum

exports.indexForums = async (req, res) => {
  try {
    const forums = await Forum.find({});
    return res.status(200).json({ data: forums });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ data: { errors: ["Failed due to internal error"] } });
  }
};
// Get Forum By Id
exports.getForumById = async (req, res) => {
  try {
    const id = req.params._id;
    const forum = await Forum.findById(id);
    // console.log(forum);
    return res.status(200).json({ data: forum });
  } catch(error) {
    console.log(error);
    return res.status(501).json({ data: { errors: ["Failed due to internal error"] } });
  }
}

// Create Forum admin
exports.createForum = async(req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ data: { errors: errors.array().map(error => error.msg) }});
  }

  const forum = new Forum({
    name: req.body.name,
    description: req.body.description,
  });

  try {
    await forum.save();
    return res.status(201).json({ data: { message: 'Successfully created forum'}});
  } catch (error) {
    console.log(error);
    return res.status(501).json({ data: { errors: ["Failed to create forum"] } });
  }
};
