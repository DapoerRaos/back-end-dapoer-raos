const createServer = require("./server");
const { PORT } = require("./config");
const sequelize = require("./utils/sequelize");
const logger = require("./utils/logger");

function startServer() {
  const app = createServer();
  return app.listen(PORT, async () => {
    try {
      await sequelize.authenticate();
      logger.info(`Server is listening on port http://localhost:${PORT}`);
    } catch (err) {
      logger.error(`Cannot start server, error: ${err.message}`);
      process.exit(1);
    }
  });
}

startServer();
