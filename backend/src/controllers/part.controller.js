const Part = require('../models/part.model');

exports.getAllParts = async (req, res) => {
  try {
    const parts = await Part.find().sort({ createdAt: -1 });
    res.json(parts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch parts' });
  }
};

exports.getPartById = async (req, res) => {
  try {
    const part = await Part.findById(req.params.id);

    if (!part) {
      return res.status(404).json({ message: 'Part not found' });
    }

    res.json(part);
  } catch (error) {
    res.status(400).json({ message: 'Invalid part id' });
  }
};

exports.createPart = async (req, res) => {
  try {
    const part = await Part.create(req.body);
    res.status(201).json(part);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create part', error: error.message });
  }
};

exports.updatePart = async (req, res) => {
  try {
    const part = await Part.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!part) {
      return res.status(404).json({ message: 'Part not found' });
    }

    res.json(part);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update part', error: error.message });
  }
};

exports.deletePart = async (req, res) => {
  try {
    const part = await Part.findByIdAndDelete(req.params.id);

    if (!part) {
      return res.status(404).json({ message: 'Part not found' });
    }

    res.json({ message: 'Part deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid part id' });
  }
};
