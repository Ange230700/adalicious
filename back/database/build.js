const migrate = require("./migration");
const seed = require("./seeding");

const build = async () => {
    await migrate();
    await seed();
}
build();