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
    if (!menu_id) {
      res.sendStatus(404).send("Menu non trouvé.");
    }
    const [[menu]] = await databaseClient.query(
      `SELECT * FROM Menu WHERE menu_id = ?`,
      [menu_id]
    );
    res.json(menu);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.put("/:menu_id", async function (req, res, next) {
  try {
    const { menu_id } = req.params;
    if (!menu_id) {
      res.sendStatus(404).send("Menu non trouvé.");
    }
    const { menu_title, menu_description, menu_image } = req.body;
    if (!menu_title || !menu_description || !menu_image) {
      res.sendStatus(400).send("Tous les champs sont requis.");
    }
    const [isMenuUpdated] = await databaseClient.query(
      `UPDATE Menu SET menu_title = ?, menu_description = ?, menu_image = ? WHERE menu_id = ?`,
      [menu_title, menu_description, menu_image, menu_id]
    );
    if (!isMenuUpdated) {
      res.sendStatus(400).send("Erreur lors de la modification du menu");
    }
    res.status(200).send("Menu modifié.");
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete("/:menu_id", async function (req, res, next) {
  try {
    const { menu_id } = req.params;
    if (!menu_id) {
      res.sendStatus(404).send("Menu non trouvé.");
    }
    const [isMenuDeleted] = await databaseClient.query(
      `DELETE FROM Menu WHERE menu_id = ?`,
      [menu_id]
    );
    if (!isMenuDeleted) {
      res.sendStatus(400).send("Erreur lors de la suppression du menu");
    }
    res.status(200).send("Menu supprimé.");
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
