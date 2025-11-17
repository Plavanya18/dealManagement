const { getdb } = require("../config/db");
const logger = require("../config/logger");

const createSystemBank = async (data, userId) => {
    try {
        const {
            name,
            swift_code,
            branch_name,
            account_number,
            address,
            country,
            contact_person,
            contact_number,
        } = data;

        const newBank = await getdb.systemBank.create({
            data: {
                name,
                swift_code,
                branch_name,
                account_number,
                address,
                country,
                contact_person,
                contact_number,
                created_by: userId,
                created_at: new Date(),
                updated_at: new Date(),
            },
        });

        logger.info(`System Bank created: ${newBank.name}`);
        return newBank;
    } catch (error) {
        logger.error("Error creating System Bank:", error);
        throw error;
    }
};

const updateSystemBank = async (id, data) => {
    try {
        const {
            name,
            swift_code,
            branch_name,
            account_number,
            address,
            country,
            contact_person,
            contact_number,
        } = data;

        const updatedBank = await getdb.systemBank.update({
            where: { id: Number(id) },
            data: {
                name,
                swift_code,
                branch_name,
                account_number,
                address,
                country,
                contact_person,
                contact_number,
                updated_at: new Date(),
            },
        });

        logger.info(`System Bank updated: ID ${id}`);
        return updatedBank;
    } catch (error) {
        logger.error(`Error updating System Bank ID ${id}:`, error);
        throw error;
    }
};

const getSystemBankById = async (id) => {
    try {
        const bank = await getdb.systemBank.findFirst({
            where: { id: Number(id), deleted_at: null },
        });
        logger.info(`Fetched System Bank ID: ${id}`);
        return bank;
    } catch (error) {
        logger.error(`Error fetching System Bank ID ${id}:`, error);
        throw error;
    }
};

const getSystemBankList = async ({ page = 1, limit = 10, search = "" }) => {
    try {
        const skip = (page - 1) * limit;
        let where = { deleted_at: null };

        if (search) {
            where = {
                ...where,
                OR: [
                    { name: { contains: search } },
                    { swift_code: { contains: search } },
                    { branch_name: { contains: search } },
                    { country: { contains: search } },
                ],
            };
        }

        const systemBanks = await getdb.systemBank.findMany({
            where,
            skip,
            take: Number(limit),
            orderBy: { created_at: "desc" },
        });

        const totalCount = await getdb.systemBank.count({ where });

        logger.info(`Fetched System Banks list - Page ${page}`);
        return {
            data: systemBanks,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
            },
        };
    } catch (error) {
        logger.error("Error fetching System Banks list:", error);
        throw error;
    }
};

const softDeleteSystemBank = async (id) => {
    try {
        const deletedBank = await getdb.systemBank.update({
            where: { id: Number(id) },
            data: { deleted_at: new Date() },
        });
        logger.info(`Soft deleted System Bank ID: ${id}`);
        return deletedBank;
    } catch (error) {
        logger.error(`Error deleting System Bank ID ${id}:`, error);
        throw error;
    }
};

module.exports = {
    createSystemBank,
    updateSystemBank,
    getSystemBankById,
    getSystemBankList,
    softDeleteSystemBank,
};
