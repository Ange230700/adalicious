const { faker } = require("@faker-js/faker");
const argon2 = require("argon2");
const database = require("./client");
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

async function insertMenus() {
  const menus = [
    {
      menu_title: "Hello World Burger",
      menu_description:
        "Un cheeseburger classique (pain, steak, fromage, salade, sauce).",
      menu_image: "🍔",
    },
    {
      menu_title: "404 Not Found Fries",
      menu_description:
        "Des frites maison avec une sauce mystère (choisie aléatoirement par le backend !).",
      menu_image: "🍟",
    },
    {
      menu_title: "JSON Nuggets",
      menu_description:
        "Nuggets de poulet avec 3 sauces au choix (ketchup, mayo, barbecue).",
      menu_image: "🍗",
    },
    {
      menu_title: "Git Pull Tacos",
      menu_description: "Un taco simple avec poulet, salade, fromage et sauce.",
      menu_image: "🌮",
    },
    {
      menu_title: "Front-end Salad",
      menu_description:
        "Une salade légère avec tomates, feta et vinaigrette maison.",
      menu_image: "🥗",
    },
    {
      menu_title: "Back-End Brownie",
      menu_description: "Un brownie moelleux au chocolat.",
      menu_image: "🍫",
    },
    {
      menu_title: "Full Stack Menu",
      menu_description: "Un combo burger, frites et boisson.",
      menu_image: "🥗",
    },
  ];
  const queries = menus.map(async (menu) => {
    return database.query(
      "INSERT INTO `Menu` (`menu_title`, `menu_description`, `menu_image`) VALUES (?, ?, ?)",
      [menu.menu_title, menu.menu_description, menu.menu_image]
    );
  });
  await Promise.all(queries);
}

async function seed() {
  try {
    migrate();
    await insertCustomer();
    await insertMenus();
    console.info("Base de données remplie.");
  } catch (e) {
    console.error("Erreur lors du remplissage:", e.message);
  } finally {
    database.end();
  }
}
module.exports = seed;