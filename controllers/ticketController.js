const Ticket = require("../models/Ticket");

// Tạo ticket mới
exports.createTicket = async (req, res) => {
  try {
    const {
      name,
      description,
      status,
      priority,
      contactOrCompany,
      assignedUser,
      category,
    } = req.body;

    if (!name || !description || !status || !contactOrCompany) {
      return res
        .status(400)
        .json({
          message:
            "Name, description, status, and contactOrCompany are required.",
        });
    }

    const ticket = await Ticket.create({
      name,
      description,
      status,
      priority,
      contactOrCompany,
      assignedUser,
      category,
    });

    res.status(201).json({ message: "Ticket created successfully", ticket });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating ticket", error: err.message });
  }
};

// Lấy danh sách ticket
exports.getTickets = async (req, res) => {
  try {
    const { search, status, priority, assignedUser, sortBy } = req.query;

    let query = {};
    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { contactOrCompany: new RegExp(search, "i") },
      ];
    }
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (assignedUser) query.assignedUser = assignedUser;

    let tickets = await Ticket.find(query)
      .populate("contactOrCompany")
      .populate("assignedUser");

    if (sortBy === "createdAt") {
      tickets = tickets.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortBy === "updatedAt") {
      tickets = tickets.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
    }

    res.status(200).json(tickets);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching tickets", error: err.message });
  }
};

// Lấy ticket theo ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("contactOrCompany")
      .populate("assignedUser");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching ticket", error: err.message });
  }
};

// Cập nhật ticket
exports.updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    Object.assign(ticket, req.body);
    await ticket.save();

    res.status(200).json({ message: "Ticket updated successfully", ticket });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating ticket", error: err.message });
  }
};

// Xóa ticket
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting ticket", error: err.message });
  }
};
