const express = require("express");
const router = express.Router();
const dealController = require("../controller/deal.controller");
const multer = require("multer");
const path = require("path");

const upload = multer({
  dest: path.join(process.cwd(), "uploads", "temp"),
});

router.post("/", dealController.createDealController);
router.get("/", dealController.getAllDealsController);
router.get("/:id", dealController.getdealsbyIdController);
router.patch("/action/:id", dealController.updateDealStatusController);
router.post("/upload-document", upload.single("file"), dealController.uploadDealFileController);


module.exports = router;
