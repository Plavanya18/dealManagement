const { getdb } = require("../config/db");
const logger = require("../config/logger");

const createBranch = async (data) => {
  try {
    const newBranch = await getdb.branch.create({
      data: {
        name: data.name,
        is_active: data.is_active ?? true,
      },
    });

    logger.info(`Branch created: ${newBranch.name}`);
    return newBranch;
  } catch (error) {
    logger.error("Failed to create Branch:", error);
    throw error;
  }
};

const getAllBranches = async (
  page = 1,
  limit = 10,
  search = "",
  orderByField = "created_at",
  orderDirection = "desc"
) => {
  try {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          name: { contains: search },
        }
      : {};

    const total = await getdb.branch.count({ where });

    const branches = await getdb.branch.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [orderByField]: orderDirection },
    });

    return {
      data: branches,
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
    logger.error("Failed to fetch Branches:", error);
    throw error;
  }
};

const getBranchById = async (id) => {
  try {
    const branch = await getdb.branch.findUnique({
      where: { id: Number(id) },
    });
    return branch;
  } catch (error) {
    logger.error(`Failed to fetch Branch with ID ${id}:`, error);
    throw error;
  }
};

const updateBranch = async (id, data) => {
  try {
    const updated = await getdb.branch.update({
      where: { id: Number(id) },
      data: {
        name: data.name,
        is_active: data.is_active,
      },
    });

    logger.info(`Branch updated: ${updated.name}`);
    return updated;
  } catch (error) {
    logger.error(`Failed to update Branch with ID ${id}:`, error);
    throw error;
  }
};

const deleteBranch = async (id) => {
  try {
    const deleted = await getdb.branch.delete({
      where: { id: Number(id) },
    });
    logger.info(`Branch deleted: ${deleted.name}`);
    return deleted;
  } catch (error) {
    logger.error(`Failed to delete Branch with ID ${id}:`, error);
    throw error;
  }
};

module.exports = {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
};
