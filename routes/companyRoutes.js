const express = require("express");
const {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: API for managing companies
 */

/**
 * @swagger
 * /api/companies:
 *   post:
 *     summary: Create a new company
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               industry:
 *                 type: string
 *               website:
 *                 type: string
 *               address:
 *                 type: string
 *               country:
 *                 type: string
 *               city:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Company created successfully
 */
router.post("/", createCompany);

/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: Get all companies
 *     tags: [Companies]
 *     parameters:
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *         description: Search companies by name, phone, or industry
 *       - name: country
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter companies by country
 *       - name: industry
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter companies by industry
 *       - name: sortBy
 *         in: query
 *         schema:
 *           type: string
 *           enum: [name, createdAt]
 *         description: Sort companies by name or creation date
 *     responses:
 *       200:
 *         description: A list of companies
 */
router.get("/", getCompanies);

/**
 * @swagger
 * /api/companies/{id}:
 *   get:
 *     summary: Get a company by ID
 *     tags: [Companies]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Company details
 */
router.get("/:id", getCompanyById);

/**
 * @swagger
 * /api/companies/{id}:
 *   put:
 *     summary: Update a company
 *     tags: [Companies]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               industry:
 *                 type: string
 *               website:
 *                 type: string
 *               address:
 *                 type: string
 *               country:
 *                 type: string
 *               city:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company updated successfully
 */
router.put("/:id", updateCompany);

/**
 * @swagger
 * /api/companies/{id}:
 *   delete:
 *     summary: Delete a company
 *     tags: [Companies]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Company deleted successfully
 */
router.delete("/:id", deleteCompany);

module.exports = router;
