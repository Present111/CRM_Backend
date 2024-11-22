const Deal = require('../models/Deal');

// Tạo deal mới
exports.createDeal = async (req, res) => {
    try {
        const { name, value, contactOrCompany, stage, closeDate, notes, owner } = req.body;

        // Kiểm tra các trường bắt buộc
        if (!name || !value || !contactOrCompany || !stage) {
            return res.status(400).json({ message: 'Name, value, contactOrCompany, and stage are required.' });
        }

        const deal = await Deal.create({
            name,
            value,
            contactOrCompany,
            stage,
            closeDate,
            notes,
            owner,
        });

        res.status(201).json({ message: 'Deal created successfully', deal });
    } catch (err) {
        res.status(500).json({ message: 'Error creating deal', error: err.message });
    }
};

// Lấy danh sách deal
exports.getDeals = async (req, res) => {
    try {
        const { search, stage, owner, sortBy } = req.query;

        let query = {};
        if (search) {
            query.$or = [
                { name: new RegExp(search, 'i') },
                { contactOrCompany: new RegExp(search, 'i') },
            ];
        }
        if (stage) query.stage = stage;
        if (owner) query.owner = owner;

        let deals = await Deal.find(query).populate('contactOrCompany');

        if (sortBy === 'name') {
            deals = deals.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'closeDate') {
            deals = deals.sort((a, b) => new Date(a.closeDate) - new Date(b.closeDate));
        }

        res.status(200).json(deals);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching deals', error: err.message });
    }
};

// Lấy deal theo ID
exports.getDealById = async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.id).populate('contactOrCompany');

        if (!deal) {
            return res.status(404).json({ message: 'Deal not found' });
        }

        res.status(200).json(deal);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching deal', error: err.message });
    }
};

// Cập nhật deal
exports.updateDeal = async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.id);

        if (!deal) {
            return res.status(404).json({ message: 'Deal not found' });
        }

        Object.assign(deal, req.body);
        await deal.save();

        res.status(200).json({ message: 'Deal updated successfully', deal });
    } catch (err) {
        res.status(500).json({ message: 'Error updating deal', error: err.message });
    }
};

// Xóa deal
exports.deleteDeal = async (req, res) => {
    try {
        const deal = await Deal.findByIdAndDelete(req.params.id);

        if (!deal) {
            return res.status(404).json({ message: 'Deal not found' });
        }

        res.status(200).json({ message: 'Deal deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting deal', error: err.message });
    }
};
