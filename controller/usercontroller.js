const usermod = require("../models/usermodel");
const { auth, generateToken } = require("../middleware/jwt");

exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const documents = await usermod
      .find({ isDeleted: false, isBlocked: false })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ id: 1 });
    res.status(200).json({ status: "user List", documents });
  } catch (error) {
    console.log(error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const userList = await usermod.findById(id, {
      isDeleted: false,
      isBlocked: false,
    });
    res.status(200).json({ status: "user List", userList });
  } catch (error) {
    console.log(error);
  }
};

exports.updateuse = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await usermod.findByIdAndUpdate(id,req.body,{ isDeleted: true},{new:true});
    res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
