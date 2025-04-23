import express from "express";
import cors from "cors";
import sequelize from "./config/database";
import router from "./routes";
import logger from "./logger";
import { successHandler, errorHandler } from "./logger/morgan";

import { initDefaultQuestions } from "./metadata/initDefaultQuestions";
import config from "./config/config";
import swaggerDoc from "./utils/swagger";
import registerGlobalErrorHandlers from "./middlewares/registerGlobalErrorHandlers.middleware";

// to do: add to .env
const PORT = 3000;

const app = express();

// Logger
if (config.env !== "test") {
  app.use(successHandler);
  app.use(errorHandler);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/v1", router);

// Connect db and start listen
sequelize
  .sync({ force: true })
  .then(() => {
    logger.info("Database synchronized");
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);

      // add swagger
      if (config.env !== "test") {
        swaggerDoc(app, PORT);
      }

      registerGlobalErrorHandlers(app);
    });
  })
  .then(() => {
    initDefaultQuestions();
  })
  .catch((err) => {
    logger.error("Error synchronizing database:", err);
  });

export default app;
