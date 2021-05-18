import { MongooseConnector } from "connectors";

export class DatabaseConnector extends MongooseConnector {
  private static _instance: DatabaseConnector;

  private constructor() {
    super();
  }

  public static getInstance() {
    if (!DatabaseConnector._instance) {
      DatabaseConnector._instance = new DatabaseConnector();
    }
    return DatabaseConnector._instance;
  }
}
