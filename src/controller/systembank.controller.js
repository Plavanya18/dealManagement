const logger = require("../config/logger");
const systemBankService = require("../service/systembank.service");

const createSystemBank = async (req, res) => {
  try {
    const userId = req.user?.id;
    const data = req.body;
    const result = await systemBankService.createSystemBank(data, userId);
    res.status(201).json({ message: "System Bank created successfully", data: result });
  } catch (error) {
    logger.error("Error creating System Bank:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateSystemBank = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await systemBankService.updateSystemBank(id, data);
    res.status(200).json({ message: "System Bank updated successfully", data: result });
  } catch (error) {
    logger.error("Error updating System Bank:", error);
    res.status(500).json({ error: error.message });
  }
};

const getSystemBankById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await systemBankService.getSystemBankById(id);
    if (!result) {
      return res.status(404).json({ message: "System Bank not found" });
    }
    res.status(200).json({ message: "System Bank fetched successfully", data: result });
  } catch (error) {
    logger.error("Error fetching System Bank by ID:", error);
    res.status(500).json({ error: error.message });
  }
};

const getSystemBankList = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const result = await systemBankService.getSystemBankList({
      page: Number(page),
      limit: Number(limit),
      search,
    });
    res.status(200).json({ message: "System Banks fetched successfully", ...result });
  } catch (error) {
    logger.error("Error fetching System Bank list:", error);
    res.status(500).json({ error: error.message });
  }
};

const softDeleteSystemBank = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await systemBankService.softDeleteSystemBank(id);
    res.status(200).json({ message: "System Bank deleted successfully" });
  } catch (error) {
    logger.error("Error deleting System Bank:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSystemBank,
  updateSystemBank,
  getSystemBankById,
  getSystemBankList,
  softDeleteSystemBank,
};
