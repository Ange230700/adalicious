const express = require("express");
const router = express.Router();
const databaseClient = require("../database/client");

router.get("/list", async function (req, res, next) {
  try {
    const [menusList] = await databaseClient.query(`SELECT * FROM Menu`);
    if (!menusList) {
      res.sendStatus(404).send("Menus non trouvés.");
    }
    res.json(menusList);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
