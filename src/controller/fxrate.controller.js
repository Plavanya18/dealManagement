const fxrateService = require("../service/fxrate.service");
const logger = require("../config/logger");

const createFxRateController = async (req, res) => {
  try {

    const fxRateData = {
      ...req.body,
      created_by: req.user,
    };
    const fxRate = await fxrateService.createFxRate(fxRateData);
    res.status(201).json({
        message: "FX Rate created successfully", 
        data: fxRate
    });
  } catch (error) {
    logger.error("Error creating FX Rate:", error);
    res.status(500).json({ message: "Failed to create FX Rate" });
  }
};

const getAllFxRatesController = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" , orderBy, direction} = req.query;
    const result = await fxrateService.getAllFxRates(Number(page), Number(limit), search, orderBy, direction);
    res.status(200).json({
      message: "FX Rates fetched successfully",
      data: result.data,
      pagination: result.pagination,
      sort: result.sort
    });
  } catch (error) {
    logger.error("Error fetching FX Rates:", error);
    res.status(500).json({ message: "Failed to fetch FX Rates" });
  }
};

const getFxRateByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const fxRate = await fxrateService.getFxRateById(id);
    if (!fxRate) return res.status(404).json({ message: "FX Rate not found" });
    res.status(200).json({
      message: "FX Rate fetched successfully",
      data: fxRate
    });
  } catch (error) {
    logger.error("Error fetching FX Rate by ID:", error);
    res.status(500).json({ message: "Failed to fetch FX Rate" });
  }
};

const updateFxRateController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFxRate = await fxrateService.updateFxRate(id, req.body);
    res.status(200).json({
      message: "FX Rate updated successfully",
      data: updatedFxRate
    });
  } catch (error) {
    logger.error("Error updating FX Rate:", error);
    res.status(500).json({ message: "Failed to update FX Rate" });
  }
};

const deleteFxRateController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFxRate = await fxrateService.deleteFxRate(id);
    res.status(200).json({ message: "FX Rate deleted successfully" });
  } catch (error) {
    logger.error("Error deleting FX Rate:", error);
    res.status(500).json({ message: "Failed to delete FX Rate" });
  }
};

module.exports = {
  createFxRateController,
  getAllFxRatesController,
  getFxRateByIdController,
  updateFxRateController,
  deleteFxRateController,
};
