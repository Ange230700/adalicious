const argon2 = require("argon2");
const express = require("express");
const router = express.Router();
const databaseClient = require("../database/client");

async function readCustomerByEmail(email) {
  const [[customer]] = await databaseClient.query(
    `SELECT * FROM Customer WHERE customer_email = ?`,
    [email]
  );
  return customer;
}

router.post("/login", async function (req, res, next) {
  try {
    const { customer_email, customer_password } = req.body;
    if (!customer_email || !customer_password) {
      res.sendStatus(400).send("Tous les champs sont requis.");
    }
    const customer = await readCustomerByEmail(customer_email);
    if (!customer) {
      res.sendStatus(404).send("Client non trouvé.");
    }

    if (customer?.customer_password) {
      const isRightPassword = await argon2.verify(
        customer.customer_password,
        customer_password
      );

      if (isRightPassword) {
        const { customer_password, ...customerWithoutPassword } = customer;
        res.status(200).json({
          customerWithoutPassword,
        });
      }
    } else {
      res.sendStatus(400).send("Erreur lors de la connexion.");
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
