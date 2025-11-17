const express = require("express");
const router = express.Router();
const rolePermissionController = require("../controller/rolepermission.controller");

router.post("/", rolePermissionController.createRolePermission);
router.get("/", rolePermissionController.getAllRolePermissions);
router.get("/:id", rolePermissionController.getRolePermissionById);
router.put("/:id", rolePermissionController.updateRolePermission);
router.delete("/:id", rolePermissionController.deleteRolePermission);

module.exports = router;
