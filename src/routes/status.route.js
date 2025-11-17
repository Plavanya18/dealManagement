const express = require("express");
const router = express.Router();
const controller = require("../controller/status.controller");

router.post("/deal", controller.createDealStatus);
router.put("/deal/:id", controller.updateDealStatus);
router.get("/deal/:id", controller.getDealStatusById);
router.get("/deal", controller.getDealStatusList);
router.delete("/deal/:id", controller.deleteDealStatus);
router.post("/payment", controller.createPaymentStatus);
router.put("/payment/:id", controller.updatePaymentStatus);
router.get("/payment/:id", controller.getPaymentStatusById);
router.get("/payment", controller.getPaymentStatusList);
router.delete("/payment/:id", controller.deletePaymentStatus);

module.exports = router;
