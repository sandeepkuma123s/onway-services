const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createTicket,
  getTickets,
  cancelTicket,
} = require("../controllers/ticketController");

router.post("/", authMiddleware, createTicket);
router.get("/", authMiddleware, getTickets);
router.put("/:id/cancel", authMiddleware, cancelTicket);

module.exports = router;