#!/usr/bin/env node
// NOTE: You can remove the first line if you don't plan to release an
// executable package. E.g. code that can be used as cli like prettier or eslint

import { WS } from "./ws";
import { TradeCreatedHandler } from "./ws/types";

const main = () => {
  // eslint-disable-next-line no-bitwise
  setInterval(() => {}, 1 << 30);
  console.log("hello Node.js and Typescript world :]");
  const handler: TradeCreatedHandler = (data) => {
    console.log("incoming data", data);
  };
  const ws = new WS({ tradeCreatedHandler: handler });
  ws.connect();
};

// This was just here to force a linting error for now to demonstrate/test the
// eslint pipeline. You can uncomment this and run "yarn lint:check" to test the
// linting.
// const x: number[] = [1, 2];
// const y: Array<number> = [3, 4];
// if (x == y) {
//   console.log("equal!");
// }

main();
