const dashboardService = require("../service/dashboard.service.js");
const logger = require("../config/logger");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user;
    if (!userId) return res.status(400).json({ message: "User ID required" });

    const dashboardData = await dashboardService.getDashboardData(userId);

    res.status(200).json({
      message: "Dashboard data fetched successfully",
      data: dashboardData,
    });
  } catch (error) {
    logger.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: error.message });
  }
};


const getCustomerBanksController = async (req, res) => {
  try {
    const { customerId } = req.params;
    const data = await dashboardService.getCustomerBankAccountsByCustomer(customerId);
    res.status(200).json({ message: "Customer bank accounts fetched", data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
    getDashboard,
    getCustomerBanksController,
 };
