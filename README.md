# PumpDotFun

## Important

THIS IS NOT TRADE ADVICE! This is intended to be educational only.

Never click links in this repository leaving github, never click links in Issues, don't run code that others post without reading it, this software is provided "as is," without warranty.

## Overview

`PumpDotFun` is an open source 3rd party client for the `pump.fun` API. This package provides methods to begin listening to WS trade events, retrieve candlesticks for mints and other `pump.fun` API methods. This repository is not a bot. This repository does not allow you to buy or sell tokens.

## Basic Usage

- npm install --save pumpdotfun

```ts
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
```

## Running Tests

- yarn test
- yarn jest ws/index --watch

## Running Dev

To run the client locally use

- yarn dev

## Disclaimer

THIS IS NOT TRADE ADVICE!

This software is provided "as is," without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.

Use at your own risk. The authors take no responsibility for any harm or damage caused by the use of this software. Users are responsible for ensuring the suitability and safety of this software for their specific use cases.

By using this software, you acknowledge that you have read, understood, and agree to this disclaimer.
