const { faker } = require("@faker-js/faker");
const argon2 = require("argon2");
const database = require("./database/client");
const migrate = require("./migration");

async function insertCustomer() {
  const customers = [
    {
      customer_name: "customer",
      customer_email: "customer@ats.fr",
      customer_password: "customer123",
    },
  ];
  const queries = customers.map(async (customer) => {
    const customer_password = await argon2.hash(customer.customer_password);
    return database.query(
      "INSERT INTO `Customer` (`customer_name`, `customer_email`, `customer_password`) VALUES (?, ?, ?)",
      [customer.customer_name, customer.customer_email, customer_password]
    );
  });
  await Promise.all(queries);
}

async function seed() {
  try {
    migrate();
    await insertCustomer();
    console.info("Base de données remplies.");
  } catch (e) {
    console.error("Erreur lors du remplissage:", e.message);
  } finally {
    database.end();
  }
}

seed();
