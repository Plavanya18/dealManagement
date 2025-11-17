const branchService = require("../service/branch.service");
const logger = require("../config/logger");

const createBranchController = async (req, res) => {
  try {
    const branch = await branchService.createBranch(req.body);
    res.status(201).json({
      message: "Branch created successfully",
      data: branch,
    });
  } catch (err) {
    logger.error("Error creating Branch:", err);
    res.status(500).json({ error: "Failed to create Branch" });
  }
};

const getAllCurrenciesController = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", orderBy, direction} = req.query;
    const branch = await branchService.getAllBranches(Number(page), Number(limit), search, orderBy, direction);
    res.status(200).json({
      message: "Branches fetched successfully",
      data: branch.data,
      pagination: branch.pagination,
      sort: branch.sort
    });
  } catch (err) {
    logger.error("Error fetching branches:", err);
    res.status(500).json({ error: "Failed to fetch branches" });
  }
};

const getBranchByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const Branch = await branchService.getBranchById(id);
    if (!Branch) return res.status(404).json({ error: "Branch not found" });
    res.status(200).json({
      message: "Branch fetched successfully",
      data: Branch
    });
  } catch (err) {
    logger.error("Error fetching Branch:", err);
    res.status(500).json({ error: "Failed to fetch Branch" });
  }
};

const updateBranchController = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await branchService.updateBranch(id, req.body);
    res.status(200).json({
      message: "Branch updated successfully",
      data: updated
    });
  } catch (err) {
    logger.error("Error updating Branch:", err);
    res.status(500).json({ error: "Failed to update Branch" });
  }
};

const deleteBranchController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await branchService.deleteBranch(id);
     res.status(200).json({
      message: "Branch deleted successfully",
    });
    } catch (err) {
    logger.error("Error deleting Branch:", err);
    res.status(500).json({ error: "Failed to delete Branch" });

  }
};

module.exports = {
  createBranchController,
  getAllCurrenciesController,
  getBranchByIdController,
  updateBranchController,
  deleteBranchController,
};
