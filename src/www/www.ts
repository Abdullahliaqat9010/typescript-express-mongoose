import { DatabaseConnector } from "connectors";
import { App } from "../app";
import { log } from "utilities";

const bootstrap = async () => {
  try {
    const connection = await DatabaseConnector.getInstance().connect();
    console.log("connected to database");
    const app = new App(connection);
    app.listen();
  } catch (e) {
    log(e);
  }
};

bootstrap();
