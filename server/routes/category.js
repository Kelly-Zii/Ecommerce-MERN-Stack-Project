import express from "express";

const router = express.Router();

import { requireSignin, isAdmin } from "../middwares/auth.js";

import { create, update, remove, list, read, blogByCategory } from "../controllers/category.js";
router.post("/category", requireSignin, isAdmin, create);
router.put("/category/:categoryId", requireSignin, isAdmin, update);
router.delete("/category/:categoryId", requireSignin, isAdmin, remove);
router.get("/categories", list);
router.get("/category/:slug", read);
router.get("/blogs-by-category/:slug", blogByCategory);

export default router;