const express = require('express');
const {
  getAllBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} = require('../controllers/brandController');
const {
  createUpdateBrandRulesInterceptor,
  validateRules,
} = require('../middleware/validator');
const { isAuthenticated } = require('../middleware/authenticate');

const brandRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Brands
 *     description: Brand management
 */

/**
 * @swagger
 * /v1/brands:
 *   get:
 *     summary: Get all brands
 *     description: Get a list of all brands.
 *     tags:
 *       - Brands
 *     responses:
 *       200:
 *         description: Brands fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GetAllBrands"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ServerError"
 */
brandRouter.get('/', getAllBrands);

/**
 * @swagger
 * /v1/brands/{id}:
 *   get:
 *     summary: Get single brand
 *     description: Fetch a single brand by its id.
 *     tags:
 *       - Brands
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the brand.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Brand fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GetBrand"
 *       404:
 *         description: Brand not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BrandNotFound"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ServerError"
 */
brandRouter.get('/:id', isAuthenticated, getBrand);

/**
 * @swagger
 * /v1/brands:
 *   post:
 *     summary: Create new brand
 *     description: Create new brand based on data provided.
 *     tags:
 *       - Brands
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/BrandBody"
 *     responses:
 *       201:
 *         description: Brand created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GetBrand"
 *       422:
 *         description: Required data incorrect/missing.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BrandUnprocessableContent"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ServerError"
 */
brandRouter.post(
  '/',
  isAuthenticated,
  createUpdateBrandRulesInterceptor(),
  validateRules,
  createBrand
);

/**
 * @swagger
 * /v1/brands/{id}:
 *   put:
 *     summary: Update brand
 *     description: Update brand based on data provided and its id.
 *     tags:
 *       - Brands
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the brand.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/BrandBody"
 *     responses:
 *       200:
 *         description: Brand fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/GetBrand"
 *       422:
 *         description: Required data incorrect/missing.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BrandUnprocessableContent"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ServerError"
 */
brandRouter.put(
  '/:id',
  isAuthenticated,
  createUpdateBrandRulesInterceptor(),
  validateRules,
  updateBrand
);

/**
 * @swagger
 * /v1/brands/{id}:
 *   delete:
 *     summary: Delete brand
 *     description: Delete a specific brand by its id.
 *     tags:
 *       - Brands
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the brand.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: brand deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/DeleteBrand"
 *       404:
 *         description: Brand not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BrandNotFound"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ServerError"
 */
brandRouter.delete('/:id', isAuthenticated, deleteBrand);

module.exports = brandRouter;
