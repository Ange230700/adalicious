const express = require("express");
const router = express.Router();
const databaseClient = require("../database/client");

router.get("/customer/:customer_id", async function (req, res, next) {
  try {
    const { customer_id } = req.params;
    if (!customer_id) {
      res
        .sendStatus(400)
        .send("Connectez-vous pour pouvoir accéder aux commandes.");
    }
    const [ordersList] = await databaseClient.query(
      "SELECT `Order`.order_id, `Order`.created_at, `Customer`.customer_name FROM `Order` LEFT JOIN `Customer` ON `Order`.customer_id = `Customer`.customer_id"
    );
    if (!ordersList) {
      res.sendStatus(404).send("Liste de commandes non trouvé.");
    }
    res.json(ordersList);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/:order_id/customer/:customer_id", async function (req, res, next) {
  try {
    const { order_id, customer_id } = req.params;
    if (!customer_id) {
      res
        .sendStatus(400)
        .send("Connectez-vous pour pouvoir accéder à votre commande.");
    }
    if (!order_id) {
      res.sendStatus(404).send("Commande non trouvé.");
    }
    const [[order]] = await databaseClient.query(
      "SELECT `Order`.order_id, `Order`.created_at, `Customer`.customer_name FROM `Order` LEFT JOIN `Customer` ON `Order`.customer_id = `Customer`.customer_id WHERE `Order`.order_id = ?",
      [order_id]
    );
    res.json(order);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
