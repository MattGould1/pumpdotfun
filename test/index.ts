import { describe, it } from "@jest/globals";
import { WS } from "../src/ws";
import { ErrorHandler, MessageHandler } from "../src/ws/types";
import assertNever from "assert-never";
import { writeFileSync } from "fs";

describe("Connecting works", () => {
  it("works", () => {
    const messageHandler: MessageHandler = (data) => {
      switch (data.method) {
        case "tradeCreated": {
          // Do things
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
  });
});

// import { TradeCreatedHandler } from "./ws/types";

// const main = () => {
//   // eslint-disable-next-line no-bitwise
//   setInterval(() => {}, 1 << 30);
//   console.log("hello Node.js and Typescript world :]");
//   const handler: TradeCreatedHandler = (data) => {
//     console.log("incoming data", data);
//   };
//   const ws = new WS({ tradeCreatedHandler: handler });
//   ws.connect();
// };

// // This was just here to force a linting error for now to demonstrate/test the
// // eslint pipeline. You can uncomment this and run "yarn lint:check" to test the
// // linting.
// // const x: number[] = [1, 2];
// // const y: Array<number> = [3, 4];
// // if (x == y) {
// //   console.log("equal!");
// // }

// main();
