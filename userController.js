const User = require('../models/User');

// Get all users (for admin panel)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve or reject operator
exports.updateApproval = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      isApproved: req.body.isApproved
    }, { new: true });

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
