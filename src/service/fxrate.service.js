const { getdb } = require("../config/db");
const logger = require("../config/logger");

const createFxRate = async (data) => {
  try {
    const timestamp = new Date();
    const newFxRate = await getdb.fxRate.create({
      data: {
        base_currency_id: data.base_currency_id,
        quote_currency_id: data.quote_currency_id,
        buy_rate: data.buy_rate,
        sell_rate: data.sell_rate,
        effective_date: data.effective_date ? new Date(data.effective_date) : timestamp,
        created_by: data.created_by,
        created_at: timestamp,
        updated_at: timestamp,
      },
    });

    logger.info(`FX Rate created: ${newFxRate.id}`);
    return newFxRate;
  } catch (error) {
    logger.error("Failed to create FX Rate:", error);
    throw error;
  }
};

const getAllFxRates = async (page = 1, limit = 10, search = "", orderByField = "created_at", orderDirection = "desc") => {
  try {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            {
              baseCurrency: {
                code: { contains: search },
              },
            },
            {
              quoteCurrency: {
                code: { contains: search },
              },
            },
          ],
        }
      : {};

    const total = await getdb.fxRate.count({ where });

    const fxRates = await getdb.fxRate.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [orderByField]: orderDirection },
      include: {
        baseCurrency: true,
        quoteCurrency: true,
        createdBy: { select: { id: true, full_name: true, email: true } },
      },
    });

    return {
      data: fxRates,
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
    logger.error("Failed to fetch FX Rates:", error);
    throw error;
  }
};

const getFxRateById = async (id) => {
  try {
    const fxRate = await getdb.fxRate.findUnique({
      where: { id: Number(id) },
      include: {
        baseCurrency: true,
        quoteCurrency: true,
        createdBy: { select: { id: true, full_name: true } },
      },
    });
    return fxRate;
  } catch (error) {
    logger.error(`Failed to fetch FX Rate with ID ${id}:`, error);
    throw error;
  }
};

const updateFxRate = async (id, data) => {
  try {
    const updatedFx = await getdb.fxRate.update({
      where: { id: Number(id) },
      data: {
        ...data,
        updated_at: new Date(),
      },
    });
    logger.info(`FX Rate updated: ${updatedFx.id}`);
    return updatedFx;
  } catch (error) {
    logger.error(`Failed to update FX Rate with ID ${id}:`, error);
    throw error;
  }
};

const deleteFxRate = async (id) => {
  try {
    const deletedFx = await getdb.fxRate.delete({
      where: { id: Number(id) },
    });
    logger.info(`FX Rate deleted: ${deletedFx.id}`);
    return deletedFx;
  } catch (error) {
    logger.error(`Failed to delete FX Rate with ID ${id}:`, error);
    throw error;
  }
};

module.exports = {
  createFxRate,
  getAllFxRates,
  getFxRateById,
  updateFxRate,
  deleteFxRate,
};
