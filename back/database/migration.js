const mysql = require("mysql2/promise");
const fs = require("node:fs");
const path = require("node:path");
const schema = path.join(__dirname, "schema.sql");
const migrate = async () => {
  try {
    const sql = fs.readFileSync(schema, "utf8");
    const database = await mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "",
      multipleStatements: true,
    });

    await database.query("DROP DATABASE IF EXISTS `adalicious`");
    await database.query("CREATE DATABASE `adalicious`");
    await database.query("USE `adalicious`");
    await database.query(sql);
    database.end();
    console.info("Base de donnée mise à jour.");
  } catch (e) {
    console.error(
      "Erreur lors de la migration de la base de donnée:",
      e.message
    );
  }
};
module.exports = migrate;
