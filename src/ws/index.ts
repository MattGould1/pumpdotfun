import WebSocket from "ws";
import {
  ConnectionInformation,
  ProcessedMessage,
  TradeCreatedHandler,
} from "./types";
import logger from "../utils/logger";
import assertNever from "assert-never";
import isObject from "../utils/isObject";

export class WS {
  private wsUrl =
    "wss://frontend-api-v2.pump.fun/socket.io/?EIO=4&transport=websocket";
  private _ws: WebSocket | undefined;
  private _connectionInformation: ConnectionInformation | undefined;
  private _tradeCreatedHandler: TradeCreatedHandler;

  constructor({
    tradeCreatedHandler,
  }: {
    tradeCreatedHandler: TradeCreatedHandler;
  }) {
    this._tradeCreatedHandler = tradeCreatedHandler;
  }

  get ws() {
    if (!this._ws) {
      this._ws = new WebSocket(this.wsUrl, {
        perMessageDeflate: false,
      });
    }

    return this._ws;
  }

  get connectionInformation() {
    return this._connectionInformation;
  }

  set connectionInformation(value: ConnectionInformation | undefined) {
    this._connectionInformation = value;
  }

  private initConnection(): void {
    /**
     * I have no explanation as to why this is necessary, but it is. Once the connection is established, the server expects a 40 to be sent.
     * This can be seen by viewing the network requests of pump.fun
     */
    this.ws.send(40);
  }

  private keepAlive(data: number): void {
    this.ws.send(data + 1);
  }

  connect() {
    this.ws.on("open", () => {
      this.initConnection();
    });

    this.ws.on("close", (code: number) => {
      logger({ level: "error", msg: `Connect closed: ${code}` });
    });

    this.ws.on("message", (msg: Buffer) => {
      const processedMessage = this.processMessage(msg.toString());
      if (processedMessage === false) {
        return;
      }

      switch (processedMessage.method) {
        case "keepAlive":
          this.keepAlive(processedMessage.data);
          break;
        case "connectionInformation":
          this.connectionInformation = processedMessage.data;
          break;
        case "tradeCreated":
          // Pass the trade over to the trade handler
          this._tradeCreatedHandler(processedMessage.data);
          break;
        default:
          return assertNever(processedMessage);
      }
    });
  }

  /**
   * Expected incoming messages will be in the following format:
   * '3' -> keep alive message
   * 0{"sid":"fRvaXxhJ8Musj-UkAObm","upgrades":[],"pingInterval":25000,"pingTimeout":20000,"maxPayload":1000000} -> some connection information
   * 40{"sid":"6gcL3pzMssQqpo6qAObq"} -> keep alive acknowledgement? Received after sending `40` to WS
   * 42["tradeCreated",{"signature":"5pG9Crt3C6nA7J282AKRhSivTTEcsYe5f4WDMmefPo3RP4Mk5zJb6a1EjSDyhPFad5j4ynDRd8WisiG76D9nGmhe","sol_amount":62000000,"token_amount":2212682967800,"is_buy":true,"user":"5VXgJyJsXDaK1ka1TfuzsT9C88fJJAUCJmRV7zrEQjtQ","timestamp":1736235656,"mint":"1ggxALwRLkeVwv3NGHqm7VPji4TvvbTxWT1gmRYmEPk","virtual_sol_reserves":30063879191,"virtual_token_reserves":1070720114321659,"slot":312411247,"tx_index":1,"name":"Christmas Bacon","symbol":"BACON","description":"The bacon famous on tiktok","image_uri":"https://ipfs.io/ipfs/QmbHW2pEwVWkjWLrvEKo3AdMyB1J6gne7XYDK95TDn9JaH","video_uri":null,"metadata_uri":"https://ipfs.io/ipfs/QmPTTUr9UjJaY4HaXrDVD2M2Cag5u9xbL8v1iV4LapB1kB","twitter":"https://www.tiktok.com/@leaderomegabacon/video/7443242534714805535","telegram":null,"bonding_curve":"GZG6SEMczHF8mBD6nwp9Y2eq1NntQFL5DSjciavBJ2Pr","associated_bonding_curve":"4krWvsmVg3kSMevsAvJdFGrz3QUyytP37CSxZFhH81fm","creator":"7mw6vPWBNb3R9g9Ua1ZzT9a5UstPH6Gg2NwAXsPiq6z7","created_timestamp":1733199569569,"raydium_pool":null,"complete":false,"total_supply":1000000000000000,"website":null,"show_name":true,"king_of_the_hill_timestamp":null,"market_cap":27.962496129,"reply_count":24,"last_reply":1736227634529,"nsfw":false,"market_id":null,"inverted":null,"is_currently_live":false,"creator_username":null,"creator_profile_image":null,"usd_market_cap":6047.72866278012}]'
   * @param msg
   */
  public processMessage(msg: string): ProcessedMessage {
    const keepAliveMatch = msg.match(/^[0-9]*$/);
    if (keepAliveMatch) {
      const keepAliveMsg = {
        method: "keepAlive" as const,
        data: parseInt(keepAliveMatch[0]),
      };
      return keepAliveMsg;
    }

    const match = msg.match(/^(\d+)(.*)$/);

    if (!match) {
      logger({ level: "error", msg: `Invalid message: ${msg}` });
      return false;
    }

    try {
      const message = JSON.parse(match[2] ?? "");

      if (isObject(message)) {
        const messageNumber = match[1];
        switch (messageNumber) {
          case "0": {
            return {
              method: "connectionInformation" as const,
              data: message,
            };
          }
          case "40": {
            // ignore
            return false;
          }
          default: {
            logger({ level: "error", msg: `Unknown message: ${msg}` });
            return false;
          }
        }
      }

      if (
        !Array.isArray(message) ||
        (Array.isArray(message) && message.length !== 2)
      ) {
        logger({ level: "error", msg: `Invalid message: ${msg}` });
        return false;
      }

      const method = message[0];
      /**
       * Add validation? Probably wise but takes more CPU time
       */
      const data = message[1];

      switch (method) {
        case "tradeCreated":
          return {
            method: "tradeCreated" as const,
            data,
          };
        default:
          logger({ level: "error", msg: `Unhandled method: ${msg}` });
          return false;
      }
    } catch (err) {
      logger({ level: "error", msg: `Unknown error: ${msg} ${err}` });
      return false;
    }
  }
}
