import express from "express";
import * as http from "http";
import dotenv from "dotenv";

import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import { CommonRoutesConfig } from "./app/common/common.routes.config";
import { BookRoutes } from "./app/books/book.route.config";
import debug from "debug";
import sequelize from "./app/common/sequelize.config";
import "./app/books/model/book.model";
import commonMiddleware from "./app/common/common.middleware";

dotenv.config();
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

// parse all incomeing request to json
app.use(express.json());

// this line adds a middleware that allows cross-origin requests
app.use(cors());

/**
 * ExpressWinston middleware configuration which will automatically log all HTTP requests handled by express.js
 */
const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

// when not debugging, log requests as one liners
if (!process.env.DEBUG) {
  loggerOptions.meta = false;
}

// initialize logger
app.use(expressWinston.logger(loggerOptions));

routes.push(new BookRoutes(app));

app.use(commonMiddleware.errorHandler);

const runningMessage = `Server running at http://localhost:${port}`;
app.get("/", (req: express.Request, res: express.Response) => {
  res
    .status(200)
    .send(
      "Welcome to the NodeJS - Express & Typescript task. Please go through README file"
    );
});

sequelize
  .sync()
  .then(() => {
    server.listen(port, () => {
      routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
        console.log(runningMessage);
      });
    });
  })
  .catch((error) => {
    debugLog("Unable to connect to the database: ", error);
  });
