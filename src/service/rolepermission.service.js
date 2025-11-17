const { getdb } = require("../config/db");
const logger = require("../config/logger");

const createRolePermission = async (data) => {
  try {
    const newRolePermission = await getdb.rolePermission.create({
      data: {
        role_id: data.role_id,
        permission_id: data.permission_id,
      },
    });

    logger.info(
      `RolePermission created: Role ${newRolePermission.role_id} -> Permission ${newRolePermission.permission_id}`
    );
    return newRolePermission;
  } catch (error) {
    logger.error("Failed to create role_permission:", error);
    throw error;
  }
};

const getAllRolePermissions = async (page = 1, limit = 10, search = "") => {
  try {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { role: { name: { contains: search } } },
            { permission: { name: { contains: search } } },
          ],
        }
      : {};

    const total = await getdb.rolePermission.count({ where });

    const rolePermissions = await getdb.rolePermission.findMany({
      where,
      skip,
      take: limit,
      include: { 
        role: {
          select: { 
            id: true, 
            name: true 
          },
        },
        permission: {
          select: { 
            id: true, 
            name: true 
          },
        }},
    });

    return {
      data: rolePermissions,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    logger.error("Failed to fetch role_permissions:", error);
    throw error;
  }
};

const getRolePermissionById = async (id) => {
  try {
    const rolePermission = await getdb.rolePermission.findUnique({
      where: { id: Number(id) },
      include: { 
        role: {
          select: { 
            id: true, 
            name: true 
          },
        },
        permission: {
          select: { 
            id: true, 
            name: true 
          },
        } 
    },
    });
    return rolePermission;
  } catch (error) {
    logger.error(`Failed to fetch role_permission with ID ${id}:`, error);
    throw error;
  }
};

const updateRolePermission = async (id, data) => {
  try {
    const updated = await getdb.rolePermission.update({
      where: { id: Number(id) },
      data,
    });
    logger.info(
      `RolePermission updated: Role ${updated.role_id} -> Permission ${updated.permission_id}`
    );
    return updated;
  } catch (error) {
    logger.error(`Failed to update role_permission with ID ${id}:`, error);
    throw error;
  }
};

const deleteRolePermission = async (id) => {
  try {
    const deleted = await getdb.rolePermission.delete({
      where: { id: Number(id) },
    });
    logger.info(
      `RolePermission deleted: Role ${deleted.role_id} -> Permission ${deleted.permission_id}`
    );
    return deleted;
  } catch (error) {
    logger.error(`Failed to delete role_permission with ID ${id}:`, error);
    throw error;
  }
};

module.exports = {
  createRolePermission,
  getAllRolePermissions,
  getRolePermissionById,
  updateRolePermission,
  deleteRolePermission,
};
