const logger = require("../config/logger");
const customerService = require("../service/customer.service");

const createCustomerController = async (req, res) => {
  try {
    const userId = req.user;
    const customer = await customerService.createCustomer(req.body, req.files, userId);
    res.status(201).json({
      message: "Customer created successfully",
      data: customer,
    });
  } catch (err) {
    logger.error("Error creating customer:", err);
    res.status(500).json({ error: "Failed to create customer" });
  }
};

// const sendOtpForCustomerController = async (req, res) => {
//   try {
//     const userId = req.user;

//     const response = await customerService.sendOtpForCustomer(
//       req.body,
//       req.files || [],
//       userId
//     );

//     res.status(200).json(response);
//   } catch (err) {
//     logger.error("❌ Error sending OTP:", err);
//     res.status(500).json({ error: err.message || "Failed to send OTP" });
//   }
// };

// const createCustomerController = async (req, res) => {
//   try {
//     const { contact_number, otp } = req.body;

//     if (!contact_number || !otp) {
//       return res.status(400).json({ error: "Phone number and OTP are required" });
//     }

//     const newCustomer = await customerService.createCustomer(contact_number, otp);

//     return res.status(201).json({
//       message: "Customer created successfully",
//       data: newCustomer,
//     });

//   } catch (err) {
//     logger.error("❌ Error verifying OTP or creating customer:", err);
//     res.status(500).json({ error: err.message || "Failed to verify OTP" });
//   }
// };


const listCustomersController = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", status = "" } = req.query;
    const userId = req.user;
    const role = req.roleName;

    console.log("userId", userId, "role", role);

    console.log("page", page, "limit", limit, "search", search, "status", status);
    const result = await customerService.listCustomers(Number(page), Number(limit), search, status, userId, role);
    res.status(200).json(result);
  } catch (err) {
    logger.error("Error listing customers:", err);
    res.status(500).json({ error: "Failed to list customers" });
  }
};

const getCustomerByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await customerService.getCustomerById(id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.status(200).json(customer);
  } catch (err) {
    logger.error("Error fetching customer:", err);
    res.status(500).json({ error: "Failed to fetch customer" });
  }
};

const updateCustomerController = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user;

    const updated = await customerService.updateCustomer(id, req.body, userId);

    res.status(200).json({
      message: "Customer updated successfully",
      data: updated,
    });
  } catch (err) {
    logger.error("Error updating customer:", err);
    res.status(500).json({ error: "Failed to update customer" });
  }
};


const verifyCustomerController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reason } = req.body;
    const updated  = await customerService.verifyCustomer(id, req.user, status, reason);
    res.status(200).json({
      message: "Customer verified successfully",
      data: updated ,
    });
  } catch (err) {
    logger.error("Error verifying customer:", err);
    res.status(500).json({ error: "Failed to verify customer" });
  }
};

const uploadKycDocumentController = async (req, res) => {
  try {
    const userId = req.user;
    const doc = await customerService.uploadKycDocument(req.body, req.file, userId);
    res.status(201).json({
      message: "KYC document uploaded successfully",
      data: doc,
    });
  } catch (err) {
    logger.error("Error uploading KYC document:", err);
    res.status(500).json({ error: "Failed to upload KYC document" });
  }
};

module.exports = {
  createCustomerController,
  // sendOtpForCustomerController,
  listCustomersController,
  getCustomerByIdController,
  updateCustomerController,
  verifyCustomerController,
  uploadKycDocumentController,
};
