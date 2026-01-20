import { Router } from "express";
import { createProduct, getProductDetail, getProducts } from "../../modules/products/products.controller.js";

export const router = Router();

router.post("/", createProduct);
router.get("/",getProducts);
router.get("/:id",getProductDetail);