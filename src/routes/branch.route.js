const express = require("express");
const router = express.Router();
const branchController = require("../controller/branch.controller");

router.post("/", branchController.createBranchController);
router.get("/", branchController.getAllCurrenciesController);
router.get("/:id", branchController.getBranchByIdController);
router.put("/:id", branchController.updateBranchController);
router.delete("/:id", branchController.deleteBranchController);

module.exports = router;
