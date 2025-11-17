const { getdb } = require("../config/db");
const logger = require("../config/logger");

const createPermission = async (data) => {
  try {
    const timestamp = new Date();

    const newPermission = await getdb.permission.create({ data:{
      name: data.name,
      description: data.description,
      created_at: timestamp,
      updated_at: timestamp
    } });
    logger.info(`Permission created: ${newPermission.name}`);
    return newPermission;
  } catch (error) {
    logger.error("Failed to create permission:", error);
    throw error;
  }
};

const getAllPermissions = async (page = 1, limit = 10, search = "", orderByField = "created_at", orderDirection = "desc") => {
  try {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { description: { contains: search } },
          ],
        }
      : {};

    const total = await getdb.permission.count({ where });

    const permissions = await getdb.permission.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [orderByField]: orderDirection },
    });

    return {
      data: permissions,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      sort: {
        field: orderByField,
        direction: orderDirection,
      },
    };
  } catch (error) {
    logger.error("Failed to fetch permissions:", error);
    throw error;
  }
};

const getPermissionById = async (id) => {
  try {
    const permission = await getdb.permission.findUnique({
      where: { id: Number(id) },
    });
    return permission;
  } catch (error) {
    logger.error(`Failed to fetch permission with ID ${id}:`, error);
    throw error;
  }
};

const updatePermission = async (id, data) => {
  try {
    const updated = await getdb.permission.update({
      where: { id: Number(id) },
      data: { ...data, updated_at: new Date() },
    });
    logger.info(`Permission updated: ${updated.name}`);
    return updated;
  } catch (error) {
    logger.error(`Failed to update permission with ID ${id}:`, error);
    throw error;
  }
};

const deletePermission = async (id) => {
  try {
    const deleted = await getdb.permission.delete({
      where: { id: Number(id) },
    });
    logger.info(`Permission deleted: ${deleted.name}`);
    return deleted;
  } catch (error) {
    logger.error(`Failed to delete permission with ID ${id}:`, error);
    throw error;
  }
};

module.exports = {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
};
