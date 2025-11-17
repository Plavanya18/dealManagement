const permissionService = require("../service/permission.service");
const logger = require("../config/logger");

const createPermission = async (req, res) => {
  try {
    const data = req.body;
    const permission = await permissionService.createPermission(data);
    res.status(201).json({
      message: "Permission created successfully",
      data: permission
    });
  } catch (error) {
    logger.error("Error creating permission:", error);
    res.status(500).json({ error: "Failed to create permission" });
  }
};

const getAllPermissions = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = "", 
      orderBy = "created_at", 
      direction = "desc" 
    } = req.query;
    const result = await permissionService.getAllPermissions(
      Number(page), 
      Number(limit), 
      search,
      orderBy, 
      direction);
    res.json({
      message: "Permissions fetched successfully",
      data: result.data,
      pagination: result.pagination,
      sort: result.sort
    });
  } catch (error) {
    logger.error("Error fetching permissions:", error);
    res.status(500).json({ error: "Failed to fetch permissions" });
  }
};

const getPermissionById = async (req, res) => {
  try {
    const id = req.params.id;
    const permission = await permissionService.getPermissionById(id);
    if (!permission) return res.status(404).json({ error: "Permission not found" });
    res.json({
      message: "Permission fetched successfully",
      data: permission
    });
  } catch (error) {
    logger.error("Error fetching permission:", error);
    res.status(500).json({ error: "Failed to fetch permission" });
  }
};

const updatePermission = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updated = await permissionService.updatePermission(id, data);
    res.json({
      message: "Permission updated successfully",
      data: updated
    });
  } catch (error) {
    logger.error("Error updating permission:", error);
    res.status(500).json({ error: "Failed to update permission" });
  }
};

const deletePermission = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await permissionService.deletePermission(id);
    res.json({
      message: "Permission deleted successfully"
    });
  } catch (error) {
    logger.error("Error deleting permission:", error);
    res.status(500).json({ error: "Failed to delete permission" });
  }
};

module.exports = {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
};
