import Blog from "../models/blogs.js";
import fs from "fs";
import slugify from "slugify";
import exp from "constants";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

export const create = async (req, res) => {
  try {
    const { name, content, category, country, city, price } = req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name.trim():
        return res.json({ err: "Name is required" });
      case !content.trim():
        return res.json({ err: "Content is required" });
      case !category.trim():
        return res.json({ err: "Category is required" });
      case !price.trim():
        return res.json({ err: "Price is required" });
      case !country.trim():
        return res.json({ err: "Country is required" });
      case !city.trim():
        return res.json({ err: "City is required" });
      case photo && photo.size > 1000000:
        return res.json({ err: "Image should be less than 1mb in size" });
    }

    //create blog
    const blog = new Blog({ ...req.fields, slug: slugify(name), user: req.user._id });

    if (photo) {
      blog.photo.data = fs.readFileSync(photo.path);
      blog.photo.contentType = photo.type;
    }

    await blog.save();
    res.json(blog);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const list = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.log(err);
  }
};
export const listByUser = async (req, res) => {
  try {
    const userId = req.user._id; // Get the user ID from the request (assuming it's available from the authentication middleware)
    const blogs = await Blog.find({ user: userId })
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.log(err);
  }
};
export const read = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.json(blog);
  } catch (err) {
    console.log(err);
  }
};

export const photo = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId).select("photo");
    if (blog.photo.data) {
      res.set("Content-type", blog.photo.contentType);
      return res.send(blog.photo.data);
    }
    res.json(blog);
  } catch (err) {
    console.log(err);
  }
};

export const remove = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndRemove(req.params.blogId).select(
      "-photo"
    );
    res.json(blog);
  } catch (err) {
    console.log(err);
  }
};

export const update = async (req, res) => {
  try {
    const { name, content, category, country, city, price } = req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name.trim():
        return res.json({ err: "Name is required" });
      case !content.trim():
        return res.json({ err: "Content is required" });
      case !category.trim():
        return res.json({ err: "Category is required" });
      case !price.trim():
        return res.json({ err: "Price is required" });
      case !country.trim():
        return res.json({ err: "Country is required" });
      case !city.trim():
        return res.json({ err: "City is required" });
      case photo && photo.size > 1000000:
        return res.json({ err: "Image should be less than 1mb in size" });
    }

    //update blog
    const blog = await Blog.findByIdAndUpdate(
      req.params.blogId,
      {
        ...req.fields,
        slug: slugify(name),
        user: req.user._id,
      },
      { new: true }
    );

    if (photo) {
      blog.photo.data = fs.readFileSync(photo.path);
      blog.photo.contentType = photo.type;
    }

    await blog.save();
    res.json(blog);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const filteredBlogs = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};

    // Filter by category
    if (checked.length > 0) {args.category = checked;}
    // Filter by price range
    if (radio.length) {
      const [minPrice, maxPrice] = radio;
      if (minPrice > 0) {
        args.price = { $gte: minPrice };
      }
      // Check if maxPrice is less than or equal to the maximum price value in your Blog data
      const maxBlogPrice = await Blog.findOne().sort({ price: -1 });
      if (maxPrice <= maxBlogPrice.price) {
        args.price = { ...args.price, $lte: maxPrice };
      }
    }
    const blogs = await Blog.find(args);
    res.json(blogs);
  } catch (err) {
    console.log(err);
  }
};


export const blogCounts = async (req, res) => {
  try {
    const total = await Blog.find({}).estimatedDocumentCount();
    res.json(total);
  } catch (err) {
    console.log(err);
  }
};

export const listBlogs = async (req, res) => {
  try {
    const perPage = 4;
    const page = req.params.page ? req.params.page : 1;

    const blogs = await Blog.find({})
      .skip((page - 1) * perPage)
      .select("-photo")
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (err) {
    console.log(err);
  }
};

export const blogsSearch = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await Blog.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { content: { $regex: keyword, $options: "i" } },
        { country: { $regex: keyword, $options: "i" } },
        { city: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    res.json(results);
  } catch (err) {
    console.log(err);
  }
};

export const relatedBlogs = async (req, res) => {
  try {
    const { blogId, categoryId } = req.params;
    const results = await Blog.find({
      category: categoryId,
      _id: { $ne: blogId },
    })
      .select("-photo")
      .populate("category")
      .limit(3);
    res.json(results);
  } catch (err) {
    console.log(err);
  }
};

export const getToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
