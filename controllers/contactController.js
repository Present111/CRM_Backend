const Contact = require("../models/Contact");

// Tạo liên hệ
exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, company, address, position, notes } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ message: "Name, email, and phone are required." });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      company,
      address,
      position,
      notes,
    });

    res.status(201).json({ message: "Contact created successfully", contact });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating contact", error: err.message });
  }
};

// Lấy danh sách liên hệ
exports.getContacts = async (req, res) => {
  try {
    const { search, company, status, sortBy } = req.query;

    let query = {};
    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
        { phone: new RegExp(search, "i") },
      ];
    }
    if (company) query.company = company;
    if (status) query.status = status;

    let contacts = await Contact.find(query);

    // Sắp xếp
    if (sortBy === "name") {
      contacts = contacts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "createdAt") {
      contacts = contacts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    res.status(200).json(contacts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching contacts", error: err.message });
  }
};

// Lấy thông tin liên hệ theo ID
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching contact", error: err.message });
  }
};

// Cập nhật liên hệ
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    Object.assign(contact, req.body);
    await contact.save();

    res.status(200).json({ message: "Contact updated successfully", contact });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating contact", error: err.message });
  }
};

// Xóa liên hệ
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting contact", error: err.message });
  }
};
