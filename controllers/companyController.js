const Company = require("../models/Company");

// Tạo công ty
exports.createCompany = async (req, res) => {
  try {
    const { name, phone, industry, website, address, country, city, notes } =
      req.body;

    if (!name || !phone || !industry) {
      return res
        .status(400)
        .json({ message: "Name, phone, and industry are required." });
    }

    const company = await Company.create({
      name,
      phone,
      industry,
      website,
      address,
      country,
      city,
      notes,
    });

    res.status(201).json({ message: "Company created successfully", company });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating company", error: err.message });
  }
};

// Lấy danh sách công ty
exports.getCompanies = async (req, res) => {
  try {
    const { search, country, industry, sortBy } = req.query;

    let query = {};
    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { phone: new RegExp(search, "i") },
        { industry: new RegExp(search, "i") },
      ];
    }
    if (country) query.country = country;
    if (industry) query.industry = industry;

    let companies = await Company.find(query);

    if (sortBy === "name") {
      companies = companies.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "createdAt") {
      companies = companies.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    res.status(200).json(companies);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching companies", error: err.message });
  }
};

// Lấy công ty theo ID
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json(company);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching company", error: err.message });
  }
};

// Cập nhật công ty
exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    Object.assign(company, req.body);
    await company.save();

    res.status(200).json({ message: "Company updated successfully", company });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating company", error: err.message });
  }
};

// Xóa công ty
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({ message: "Company deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting company", error: err.message });
  }
};
