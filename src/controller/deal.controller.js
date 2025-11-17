const logger = require("../config/logger");
const dealService = require("../service/deal.service");
const fs = require("fs");
const path = require("path");

const createDealController = async (req, res) => {
  try {
    const userId = req.user;
    const deal = await dealService.createDeal(req.body, userId);

    res.status(201).json({
      message: "Deal created successfully",
      data: deal,
    });
  } catch (err) {
    logger.error("Error creating deal:", err);
    res.status(500).json({ error: err.message });
  }
};

const getAllDealsController = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      orderByField = "created_at",
      orderDirection = "desc",
      startDate,
      endDate,
      baseCurrencyCode,
      quoteCurrencyCode,
      statusName,
      dealType,
      exportType,
      downloadreport,
    } = req.query;

    const userId = req.user;
    const role = req.roleName;

    const result = await dealService.getAllDeals({
      page: Number(page),
      limit: Number(limit),
      search,
      orderByField,
      orderDirection,
      startDate,
      endDate,
      baseCurrencyCode,
      quoteCurrencyCode,
      statusName,
      dealType,
      userId,
      roleName: role,
      exportType,
      downloadreport,
    });

    if ((exportType === "excel" || exportType === "pdf") && downloadreport === "true") {
      const { filePath } = result;

      if (!filePath) {
        return res.status(500).json({ message: "File was not generated" });
      }

      const fileName = path.basename(filePath);

      const userAgent = req.headers["user-agent"] || "";
      if (userAgent.includes("Postman")) {
        return res.status(200).json({
          message: `${exportType.toUpperCase()} generated successfully`,
          filePath,
        });
      }

      return res.download(filePath, fileName);
    }

    return res.status(200).json({
      message: "Deals fetched successfully",
      data: result.data,
      pagination: result.pagination,
      sort: result.sort,
    });
  } catch (error) {
    console.error("❌ Error fetching all deals:", error);
    res.status(500).json({ message: error.message });
  }
};

const getdealsbyIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const { download_deal_slip = "false" } = req.query;

    const result = await dealService.getDealById(id, download_deal_slip);
    if (!result) return res.status(404).json({ error: "Deal not found" });

    if (download_deal_slip === "true") {
      const { filePath } = result;
      if (!fs.existsSync(filePath)) {
        return res.status(500).json({ error: "File was not generated" });
      }

      const fileName = `deal-slip-${id}.pdf`;
      const userAgent = req.headers["user-agent"] || "";

      if (userAgent.includes("Postman")) {
        return res.status(200).json({
          message: "PDF generated successfully",
          filePath,
        });
      }
      return res.download(filePath, fileName);
    }

    res.status(200).json({
      message: "Deal fetched successfully",
      data: result,
    });
  } catch (err) {
    console.error("❌ Error fetching deal:", err);
    res.status(500).json({ error: err.message });
  }
};

const updateDealStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;
    const userId = req.user;

    const updatedDeal = await dealService.updateDealStatus(id, action, userId);

    res.status(200).json({
      message: `Deal ${action}d successfully`,
      data: updatedDeal,
    });
  } catch (error) {
    logger.error("Error updating deal status:", error);
    res.status(400).json({ message: error.message || "Failed to update deal" });
  }
};

const uploadDealFileController = async (req, res) => {
  try {
    const { deal_id } = req.body;
    const userId = req.user;
    const file = req.file;

    if (!deal_id || !file) {
      return res.status(400).json({ message: "deal_id or file is required" });
    }
    const document = await dealService.uploadDealDocument(deal_id, file, userId);

    return res.status(201).json({
      message: "Deal document uploaded successfully",
      document,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Document upload failed" });
  }
};

module.exports = {
  createDealController,
  getAllDealsController,
  getdealsbyIdController,
  updateDealStatusController,
  uploadDealFileController,
};
