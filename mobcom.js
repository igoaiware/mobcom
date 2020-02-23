const app = require("./app");
const config = require("./services/config/config");

/* parametrizar a porta de escuta */
async function main() {
  app.listen(config.PORT, () => {
    console.log(`Servidor online ${config.PORT}`);
  });

  // await app.db.connect();

  // console.log(app.db.totalCon());
}

main();
