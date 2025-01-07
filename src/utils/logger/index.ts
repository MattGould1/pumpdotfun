import { writeFileSync } from "fs";

/**
 * Super simple logging mostly to catch new WS msgs
 */
const logger = ({
  level,
  msg,
}: {
  level: "log" | "info" | "error";
  msg: unknown;
}) => {
  console[level](`${level}: ${msg}`);

  if (level === "error") {
    writeFileSync("./error.log", `${msg}\n`, { flag: "a" });
  }
};

export default logger;
