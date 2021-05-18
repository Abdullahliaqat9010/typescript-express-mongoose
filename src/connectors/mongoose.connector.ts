import { Environment } from "utilities";
import mongoose, { ConnectOptions } from "mongoose";

const mongoConfig: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  autoIndex: true,
  ssl: Environment.NODE_ENV === "production" ? true : false,
  authSource: "admin",
};

export class MongooseConnector {
  public connect(): Promise<typeof mongoose> {
    return mongoose.connect(Environment.MONGO_URI, mongoConfig);
  }
}
