const express = require("express");
const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: API for managing tickets
 */

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Create a new ticket
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               priority:
 *                 type: string
 *               contactOrCompany:
 *                 type: string
 *               assignedUser:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ticket created successfully
 */
router.post("/", createTicket);

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Get all tickets
 *     tags: [Tickets]
 *     parameters:
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *         description: Search tickets by name or contact/company
 *       - name: status
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter tickets by status
 *       - name: priority
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter tickets by priority
 *       - name: assignedUser
 *         in: query
 *         schema:
 *           type: string
 *         description: Filter tickets by assigned user
 *       - name: sortBy
 *         in: query
 *         schema:
 *           type: string
 *           enum: [createdAt, updatedAt]
 *         description: Sort tickets by creation or update date
 *     responses:
 *       200:
 *         description: A list of tickets
 */
router.get("/", getTickets);

/**
 * @swagger
 * /api/tickets/{id}:
 *   get:
 *     summary: Get a ticket by ID
 *     tags: [Tickets]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket details
 */
router.get("/:id", getTicketById);

/**
 * @swagger
 * /api/tickets/{id}:
 *   put:
 *     summary: Update a ticket
 *     tags: [Tickets]
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
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               priority:
 *                 type: string
 *               contactOrCompany:
 *                 type: string
 *               assignedUser:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ticket updated successfully
 */
router.put("/:id", updateTicket);

/**
 * @swagger
 * /api/tickets/{id}:
 *   delete:
 *     summary: Delete a ticket
 *     tags: [Tickets]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket deleted successfully
 */
router.delete("/:id", deleteTicket);

module.exports = router;
