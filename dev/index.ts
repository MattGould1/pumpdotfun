import assertNever from "assert-never";
import { writeFileSync } from "fs";
import { MessageHandler, ErrorHandler } from "../src/ws/types";
import { WS } from "../src/ws";

const main = () => {
  const messageHandler: MessageHandler = (data) => {
    switch (data.method) {
      case "tradeCreated": {
        // Do things
        console.log(data.method);
        break;
      }
      default:
        return assertNever(data.method);
    }
  };

  const errorHandler: ErrorHandler = (data) => {
    console.error(data.msg);

    writeFileSync("./error.log", `${Date.now()}:${data.msg}\n`);
  };

  const ws = new WS({
    messageHandler,
    errorHandler,
  });

  ws.connect();

  console.log("running");
};

main();
