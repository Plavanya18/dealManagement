const express = require("express");
const router = express.Router();
const systemBankController = require("../controller/systembank.controller");

router.post("/", systemBankController.createSystemBank);
router.put("/:id", systemBankController.updateSystemBank);
router.get("/:id", systemBankController.getSystemBankById);
router.get("/", systemBankController.getSystemBankList);
router.delete("/:id", systemBankController.softDeleteSystemBank);

module.exports = router;
