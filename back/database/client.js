const mysql = require("mysql2/promise");
const client = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "adalicious",
});
client
  .getConnection()
  .then((connection) => {
    console.info(`Base de données connectée.`);
    connection.release();
  })
  .catch((error) => {
    console.error(
      "Attention:",
      "Échec de la connexion",
      "Vérifie les identifiants."
    );
    console.error("Message d'erreur:", error.message);
  });
client.databaseName = "adalicious";
module.exports = client;
