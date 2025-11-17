const express = require("express");
const router = express.Router();
const dashboardController = require("../controller/dashboard.controller");

router.get("/", dashboardController.getDashboard);
router.get("/customer-banks/:customerId", dashboardController.getCustomerBanksController);

module.exports = router;
