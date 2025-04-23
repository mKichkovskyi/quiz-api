import { Express, Request, Response } from "express";
import swaggerJsDoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { version, name } from "../../package.json";
import logger from "../logger";

const options: Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: name,
      version,
    },
    servers: [
      {
        url: "/v1",
        description: "Base path for all endpoints",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};

const swaggerSpec = swaggerJsDoc(options);
const route = "/docs";

const swaggerDoc = (app: Express, port: number) => {
  app.use(route, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application-json");
    res.send(swaggerSpec);
  });

  logger.info(`Docs: http://localhost:${port}${route}`);
};

export default swaggerDoc;
