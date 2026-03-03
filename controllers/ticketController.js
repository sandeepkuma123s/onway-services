const Ticket = require("../models/Ticket");

// Create Ticket
exports.createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Tickets
exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel Ticket
exports.cancelTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (ticket.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (ticket.status === "Cancelled") {
      return res.status(400).json({ message: "Ticket already cancelled" });
    }

    ticket.status = "Cancelled";
    await ticket.save();

    res.json({
      message: "Ticket cancelled successfully",
      ticket,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};