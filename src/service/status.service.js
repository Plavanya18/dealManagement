const { getdb } = require("../config/db");
const logger = require("../config/logger");

const createDealStatus = async (data) => {
  try {
    const { name } = data;

    const existing = await getdb.dealStatus.findUnique({ where: { name } });
    if (existing) throw new Error("Deal Status name already exists");

    const created = await getdb.dealStatus.create({
      data: { name },
    });

    logger.info(`DealStatus created: ${created.name}`);
    return created;
  } catch (error) {
    logger.error("Failed to create DealStatus:", error);
    throw error;
  }
};

const updateDealStatus = async (id, data) => {
  try {
    const updated = await getdb.dealStatus.update({
      where: { id: Number(id) },
      data: { name: data.name },
    });

    logger.info(`DealStatus updated: ${updated.name}`);
    return updated;
  } catch (error) {
    logger.error(`Failed to update DealStatus with ID ${id}:`, error);
    throw error;
  }
};

const getDealStatusById = async (id) => {
  try {
    const dealStatus = await getdb.dealStatus.findUnique({
      where: { id: Number(id) },
    });

    return dealStatus;
  } catch (error) {
    logger.error(`Failed to fetch DealStatus with ID ${id}:`, error);
    throw error;
  }
};

const getDealStatusList = async () => {
  try {
    const list = await getdb.dealStatus.findMany({
      orderBy: { id: "asc" },
    });

    return list;
  } catch (error) {
    logger.error("Failed to list DealStatus:", error);
    throw error;
  }
};

const deleteDealStatus = async (id) => {
  try {
    const deleted = await getdb.dealStatus.delete({
      where: { id: Number(id) },
    });

    logger.info(`DealStatus deleted: ${deleted.name}`);
    return deleted;
  } catch (error) {
    logger.error(`Failed to delete DealStatus with ID ${id}:`, error);
    throw error;
  }
};


const createPaymentStatus = async (data) => {
  try {
    const { name } = data;

    const existing = await getdb.paymentStatus.findUnique({ where: { name } });
    if (existing) throw new Error("Payment Status name already exists");

    const created = await getdb.paymentStatus.create({
      data: { name },
    });

    logger.info(`PaymentStatus created: ${created.name}`);
    return created;
  } catch (error) {
    logger.error("Failed to create PaymentStatus:", error);
    throw error;
  }
};

const updatePaymentStatus = async (id, data) => {
  try {
    const updated = await getdb.paymentStatus.update({
      where: { id: Number(id) },
      data: { name: data.name },
    });

    logger.info(`PaymentStatus updated: ${updated.name}`);
    return updated;
  } catch (error) {
    logger.error(`Failed to update PaymentStatus with ID ${id}:`, error);
    throw error;
  }
};

const getPaymentStatusById = async (id) => {
  try {
    const paymentStatus = await getdb.paymentStatus.findUnique({
      where: { id: Number(id) },
    });

    return paymentStatus;
  } catch (error) {
    logger.error(`Failed to fetch PaymentStatus with ID ${id}:`, error);
    throw error;
  }
};

const getPaymentStatusList = async () => {
  try {
    const list = await getdb.paymentStatus.findMany({
      orderBy: { id: "asc" },
    });

    return list;
  } catch (error) {
    logger.error("Failed to list PaymentStatus:", error);
    throw error;
  }
};

const deletePaymentStatus = async (id) => {
  try {
    const deleted = await getdb.paymentStatus.delete({
      where: { id: Number(id) },
    });

    logger.info(`PaymentStatus deleted: ${deleted.name}`);
    return deleted;
  } catch (error) {
    logger.error(`Failed to delete PaymentStatus with ID ${id}:`, error);
    throw error;
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
