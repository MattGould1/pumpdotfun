import assertNever from "assert-never";
import { writeFileSync } from "fs";
import { WS } from "../src/ws";

const main = () => {
  const ws = new WS({});

  ws.connect();

  ws.on("open", (data) => {
    console.log("open", data);
  });

  ws.on("message", (data) => {
    switch (data.method) {
      case "tradeCreated": {
        // Do things
        console.log(data.method);
        break;
      }
      default:
        return assertNever(data.method);
    }
  });

  ws.on("error", (data) => {
    console.error(data.msg);

    writeFileSync("./error.log", `${Date.now()}:${data.msg}\n`);
  });
};

main();
