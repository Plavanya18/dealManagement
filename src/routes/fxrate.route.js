const express = require("express");
const router = express.Router();
const fxrateController = require("../controller/fxrate.controller");

router.post("/", fxrateController.createFxRateController);
router.get("/", fxrateController.getAllFxRatesController);
router.get("/:id", fxrateController.getFxRateByIdController);
router.put("/:id", fxrateController.updateFxRateController);
router.delete("/:id", fxrateController.deleteFxRateController);

module.exports = router;
