import Category from "../models/category.js";
import slugify from "slugify";
import Blog from "../models/blogs.js"

export const create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name.trim) {
      return res.json({ error: "name is requied" });
    }
    const existCategory = await Category.findOne({ name });
    if (existCategory) {
      return res.json({ error: "Already Exists" });
    }

    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const remove = async (req, res) => {
  try {
    const removed = await Category.findByIdAndRemove(req.params.categoryId);
    res.json(removed);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const list = async (req, res) => {
  try {
    const all = await Category.find({});
    res.json(all);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const read = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const blogByCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    const blogs = await Blog.find({ category }).populate("category");
    res.json({ category, blogs });
  } catch (err) {
    console.log(err);
  }
};
