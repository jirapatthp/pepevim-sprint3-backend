import { Router } from "express";
import { createProduct, getProducts } from "../../modules/products/products.controller.js";

export const router = Router();

router.post("/", createProduct);
router.get("/",getProducts);