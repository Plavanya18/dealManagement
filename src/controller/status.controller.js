const statusService = require("../service/status.service");
const logger = require("../config/logger");

const createDealStatus = async (req, res) => {
  try {
    const result = await statusService.createDealStatus(req.body);
    res.status(201).json({ message: "Deal Status created successfully", data: result });
  } catch (error) {
    logger.error("Error creating DealStatus:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateDealStatus = async (req, res) => {
  try {
    const result = await statusService.updateDealStatus(req.params.id, req.body);
    res.status(200).json({ message: "Deal Status updated successfully", data: result });
  } catch (error) {
    logger.error("Error updating DealStatus:", error);
    res.status(500).json({ message: error.message });
  }
};

const getDealStatusById = async (req, res) => {
  try {
    const result = await statusService.getDealStatusById(req.params.id);
    res.status(200).json({ data: result });
  } catch (error) {
    logger.error("Error fetching DealStatus:", error);
    res.status(500).json({ message: error.message });
  }
};

const getDealStatusList = async (req, res) => {
  try {
    const result = await statusService.getDealStatusList();
    res.status(200).json({ 
        message: "Deal Status fetched successfully", 
        data: result 
    });
  } catch (error) {
    logger.error("Error listing DealStatus:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteDealStatus = async (req, res) => {
  try {
    const result = await statusService.deleteDealStatus(req.params.id);
    res.status(200).json({ message: "Deal Status deleted successfully" });
  } catch (error) {
    logger.error("Error deleting DealStatus:", error);
    res.status(500).json({ message: error.message });
  }
};

const createPaymentStatus = async (req, res) => {
  try {
    const result = await statusService.createPaymentStatus(req.body);
    res.status(201).json({ message: "Payment Status created successfully", data: result });
  } catch (error) {
    logger.error("Error creating PaymentStatus:", error);
    res.status(500).json({ message: error.message });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const result = await statusService.updatePaymentStatus(req.params.id, req.body);
    res.status(200).json({ message: "Payment Status updated successfully", data: result });
  } catch (error) {
    logger.error("Error updating PaymentStatus:", error);
    res.status(500).json({ message: error.message });
  }
};

const getPaymentStatusById = async (req, res) => {
  try {
    const result = await statusService.getPaymentStatusById(req.params.id);
    res.status(200).json({ 
        message: "Payment Status fetched successfully",
        data: result });
  } catch (error) {
    logger.error("Error fetching PaymentStatus:", error);
    res.status(500).json({ message: error.message });
  }
};

const getPaymentStatusList = async (req, res) => {
  try {
    const result = await statusService.getPaymentStatusList();
    res.status(200).json({ 
        message: "Payment Status fetched successfully", 
        data: result });
  } catch (error) {
    logger.error("Error listing PaymentStatus:", error);
    res.status(500).json({ message: error.message });
  }
};

const deletePaymentStatus = async (req, res) => {
  try {
    const result = await statusService.deletePaymentStatus(req.params.id);
    res.status(200).json({ message: "Payment Status deleted successfully", data: result });
  } catch (error) {
    logger.error("Error deleting PaymentStatus:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDealStatus,
  updateDealStatus,
  getDealStatusById,
  getDealStatusList,
  deleteDealStatus,
  createPaymentStatus,
  updatePaymentStatus,
  getPaymentStatusById,
  getPaymentStatusList,
  deletePaymentStatus,
};
