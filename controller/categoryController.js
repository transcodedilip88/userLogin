const categoryModel = require("../models/category");
const jwt = require("jsonwebtoken");
const { deleteOne } = require("../models/usermodel");
const SECRET = "ioendlckn65";

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const authorization = req.headers.authorization;
    if (!authorization)
      return res.status(404).json({ error: "token has not found" });

    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(404).json({ error: "unauthorized" });
    let decode = jwt.verify(token, SECRET);
    let userId = decode.id;
    console.log("object",userId);

    const user = await categoryModel.findOne({ name: name });

    if (user) {
      return res.status(401).json({ status: "name has been already defined" });
    }

    const newCategory = new categoryModel({
      name: name,
      createdBy: userId,
      updatedby: userId,
    });

    await newCategory.save();
    res.status(200).json({ status: "success", newCategory });
  } catch (error) {
    console.log(error);
  }
};

exports.getCategorybyid = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await categoryModel.findById(id, {
      isDeleted: false,
      isBlocked: false,
    });
    res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    let data = await categoryModel
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "createdBy",
            foreignField: "_id",
            as: "userdata",
          },
        },
      ])
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await categoryModel.findByIdAndUpdate(id,req.body,{isDeleted:true});
    if (!data) return res.status(404).json({ error: "Category not found" });
    res.status(200).json({ status: "success", data});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
