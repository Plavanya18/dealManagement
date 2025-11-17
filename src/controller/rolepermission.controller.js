const rolePermissionService = require("../service/rolepermission.service");
const logger = require("../config/logger");

const createRolePermission = async (req, res) => {
  try {
    const data = req.body;
    const rolePermission = await rolePermissionService.createRolePermission(data);
    res.status(201).json({
      message: "Role-Permission created successfully",
      data: rolePermission
    });
  } catch (error) {
    logger.error("Error creating role_permission:", error);
    res.status(500).json({ error: "Failed to create role_permission" });
  }
};

const getAllRolePermissions = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const result = await rolePermissionService.getAllRolePermissions(Number(page), Number(limit), search);
    res.json({
      message: "Role_permissions fetched successfully",
      data: result.data,
      pagination: result.pagination,
      sort: result.sort
    });
  } catch (error) {
    logger.error("Error fetching role_permissions:", error);
    res.status(500).json({ error: "Failed to fetch role_permissions" });
  }
};

const getRolePermissionById = async (req, res) => {
  try {
    const id = req.params.id;
    const rolePermission = await rolePermissionService.getRolePermissionById(id);
    if (!rolePermission) return res.status(404).json({ error: "RolePermission not found" });
    res.json({
      message: "Role_permission fetched successfully",
      data: rolePermission
    });
  } catch (error) {
    logger.error("Error fetching role_permission:", error);
    res.status(500).json({ error: "Failed to fetch role_permission" });
  }
};

const updateRolePermission = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updated = await rolePermissionService.updateRolePermission(id, data);
    res.json({
      message: "Role_permission updated successfully",
      data: updated
    });
  } catch (error) {
    logger.error("Error updating role_permission:", error);
    res.status(500).json({ error: "Failed to update role_permission" });
  }
};

const deleteRolePermission = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await rolePermissionService.deleteRolePermission(id);
    res.json({
      message: "Role_permission deleted successfully"
    });
  } catch (error) {
    logger.error("Error deleting role_permission:", error);
    res.status(500).json({ error: "Failed to delete role_permission" });
  }
};

module.exports = {
  createRolePermission,
  getAllRolePermissions,
  getRolePermissionById,
  updateRolePermission,
  deleteRolePermission,
};
