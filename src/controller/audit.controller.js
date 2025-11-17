const auditService= require("../service/audit.service");
const listActiveAuditLogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      startDate,
      endDate,
      status,
      dealType,
      orderByField = "created_at",
      orderDirection = "desc",
    } = req.query;

    const logs = await auditService.getAllActiveAuditLogs({
      page: Number(page),
      limit: Number(limit),
      startDate,
      endDate,
      status,
      dealType,
      orderByField,
      orderDirection,
    });

    res.status(200).json({
      message: "All active audit logs",
      data: logs.data,
      pagination: logs.pagination,
      sort: logs.sort,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAuditLogs = async (req, res) => {
  try {
    const { dealId } = req.params;
    if (!dealId) return res.status(400).json({ message: "Deal ID is required" });

    const logs = await auditService.getAuditLogsByDealId(dealId);

    res.status(200).json({
      message: `Audit logs for deal ID ${dealId}`,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
    listActiveAuditLogs,
    getAuditLogs 
};
