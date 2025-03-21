const express = require("express");
const router = express.Router();
const databaseClient = require("../database/client");

router.get("/list", async function (req, res, next) {
  try {
    const [menusList] = await databaseClient.query(`SELECT * FROM Menu`);
    if (!menusList) {
      res.sendStatus(404).send("Liste de menus non trouvé.");
    }
    res.json(menusList);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/:menu_id", async function (req, res, next) {
  try {
    const { menu_id } = req.params;
    const [[menu]] = await databaseClient.query(
      `SELECT * FROM Menu WHERE menu_id = ?`,
      [menu_id]
    );
    if (!menu) {
      res.sendStatus(404).send("Menu non trouvé.");
    }
    res.json(menu);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
