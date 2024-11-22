const express = require("express");
const {
  createDeal,
  getDeals,
  getDealById,
  updateDeal,
  deleteDeal,
} = require("../controllers/dealController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Deals
 *   description: API for managing deals
 */

/**
 * @swagger
 * /api/deals:
 *   post:
 *     summary: Create a new deal
 *     tags: [Deals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               value:
 *                 type: number
 *               contactOrCompany:
 *                 type: string
 *               stage:
 *                 type: string
 *               closeDate:
 *                 type: string
 *               notes:
 *                 type: string
 *               owner:
 *                 type: string
 *     responses:
 *       201:
 *         description: Deal created successfully
 */
router.post("/", createDeal);

/**
 * @swagger
 * /api/deals:
 *   get:
 *     summary: Get all deals
 *     tags: [Deals]
 *     parameters:
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *         description: Search deals by name or contact/company
 *       - name: stage
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter deals by stage
 *       - name: owner
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter deals by owner
 *       - name: sortBy
 *         in: query
 *         schema:
 *           type: string
 *           enum: [name, closeDate]
 *         description: Sort deals by name or close date
 *     responses:
 *       200:
 *         description: A list of deals
 */
router.get("/", getDeals);

/**
 * @swagger
 * /api/deals/{id}:
 *   get:
 *     summary: Get a deal by ID
 *     tags: [Deals]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deal details
 */
router.get("/:id", getDealById);

/**
 * @swagger
 * /api/deals/{id}:
 *   put:
 *     summary: Update a deal
 *     tags: [Deals]
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
 *               value:
 *                 type: number
 *               contactOrCompany:
 *                 type: string
 *               stage:
 *                 type: string
 *               closeDate:
 *                 type: string
 *               notes:
 *                 type: string
 *               owner:
 *                 type: string
 *     responses:
 *       200:
 *         description: Deal updated successfully
 */
router.put("/:id", updateDeal);

/**
 * @swagger
 * /api/deals/{id}:
 *   delete:
 *     summary: Delete a deal
 *     tags: [Deals]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deal deleted successfully
 */
router.delete("/:id", deleteDeal);

module.exports = router;
