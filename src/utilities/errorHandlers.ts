import { DatabaseErrorInterface } from "interfaces";
import { log } from "utilities";
import { Error } from "mongoose";

export const handleDatabaseError = (err: Error): DatabaseErrorInterface => {
  log(err);

  const response: DatabaseErrorInterface = {
    error_code: err.name,
    error_text: err.message,
  };

  return response;
};
