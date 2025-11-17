const { getdb } = require("../config/db");

const getDashboardData = async (userId) => {
    const totalCustomers = await getdb.customer.count();
    const userCustomers = await getdb.customer.count({
        where: { created_by: Number(userId) },
    });

    const totalDeals = await getdb.deal.count();
    const userDealsCount = await getdb.deal.count({
        where: { created_by: Number(userId) },
    });

    const dealsByStatus = await getdb.deal.groupBy({
        by: ["status_id"],
        _count: { _all: true },
    });

    const dealsByStatusDetailed = [];
    for (const d of dealsByStatus) {
        const status = await getdb.dealStatus.findUnique({
            where: { id: d.status_id },
            select: { name: true },
        });
        dealsByStatusDetailed.push({
            status_id: d.status_id,
            status_name: status?.name || "Unknown",
            count: d._count._all,
        });
    }

    const userDealsByStatus = await getdb.deal.groupBy({
        by: ["status_id"],
        _count: { _all: true },
        where: { created_by: Number(userId) },
    });

    const userDealsDetailed = [];
    for (const d of userDealsByStatus) {
        const status = await getdb.dealStatus.findUnique({
            where: { id: d.status_id },
            select: { name: true },
        });
        userDealsDetailed.push({
            status_id: d.status_id,
            status_name: status?.name || "Unknown",
            count: d._count._all,
        });
    }

    const systemBankAccounts = await getdb.systemBank.findMany({
        select: {
            id: true,
            name: true,
            swift_code: true,
            branch_name: true,
            account_number: true,
            country: true,
        },
    });

    const totalComplianceAlerts = await getdb.customer.count({
        where: {
            OR: [
                { risk_level: { in: ["medium", "high"] } },
                { compliance_remarks: { not: null } },
            ],
        },
    });

    const userComplianceAlerts = await getdb.customer.count({
        where: {
            created_by: Number(userId),
            OR: [
                { risk_level: { in: ["medium", "high"] } },
                { compliance_remarks: { not: null } },
            ],
        },
    });

    return {
        customers: {
            total: totalCustomers,
            byUser: userCustomers,
        },
        deals: {
            total: totalDeals,
            byUser: userDealsCount,
            overallByStatus: dealsByStatusDetailed,
            byUserByStatus: userDealsDetailed,
        },
        bankAccounts: {
            systemAccounts: systemBankAccounts,
        },
        complianceAlerts: {
            total: totalComplianceAlerts,
            byUser: userComplianceAlerts,
        },
    };
};

const getCustomerBankAccountsByCustomer = async (customerId) => {

    if (!customerId) throw new Error("Customer ID is required");

    const accounts = await getdb.customerBank.findMany({
        where: { customer_id: Number(customerId) },
        select: {
            customer: { select: { id: true, name: true } },
            id: true,
            bank_name: true,
            branch_name: true,
            account_number: true,
            swift_code: true,
            country: true,
            is_active: true,
            is_dormant: true,
            is_primary: true,
            currency: { select: { code: true, name: true } },
        },
    });

    return accounts;
};

module.exports = {
    getDashboardData,
    getCustomerBankAccountsByCustomer,
};
