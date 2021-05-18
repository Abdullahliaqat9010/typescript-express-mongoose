import { Environment } from "utilities";

export const log = (message: any) => {
  if (Environment.NODE_ENV === "production") return;
  // eslint-disable-line no-console
  console.log(`Logger: ${message}`);
};
