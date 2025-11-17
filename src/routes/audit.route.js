const express = require("express");
const router = express.Router();
const auditController = require("../controller/audit.controller");

router.get("/", auditController.listActiveAuditLogs);
router.get("/:dealId", auditController.getAuditLogs);

module.exports = router;
