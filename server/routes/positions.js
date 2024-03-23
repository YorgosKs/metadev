const Position = require('../models/positions.models');
const router = require('express').Router();
const { jwtAuth } = require('../middleware/auth');

// GET ALL POSITIONS
router.get('/', jwtAuth, async (req, res) => {
  try {
    const positions = await Position.find();
    res.status(200).json(positions);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE POSITION
router.post('/new', jwtAuth, async (req, res) => {
  try {
    const newPosition = new Position(req.body);
    const position = await newPosition.save();
    res.status(200).json(position);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE POSITION
router.put('/:id', jwtAuth, async (req, res) => {
  try {
    const position = await Position.findById(req.params.id);
    if (position.userId === req.body.userId) {
      await position.updateOne({ $set: req.body });
      res.status(200).json('Position has been updated!');
    } else {
      res.status(403).json('You can update only your position!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE POSITION
router.delete('/:id', jwtAuth, async (req, res) => {
  try {
    const position = await Position.findById(req.params.id);
    if (position.userId === req.body.userId) {
      await position.deleteOne();
      res.status(200).json('Position has been deleted!');
    } else {
      res.status(403).json('You can delete only your position!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET OPEN POSITIONS

router.get('/open', jwtAuth, async (req, res) => {
  try {
    const open = true;
    const positions = await Position.find({ status: open });
    res.status(200).json(positions);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
