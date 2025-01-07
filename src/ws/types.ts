import { WSTradeCreatedMsg } from "src/pumpfun/types";

export type ProcessedMessage =
  | {
      method: "connectionInformation";
      data: {
        sid: string;
        upgrades: unknown[];
        pingInterval: number;
        pingTimeout: number;
        maxPayload: number;
      };
    }
  | {
      method: "keepAlive";
      data: number;
    }
  | {
      method: "tradeCreated";
      data: WSTradeCreatedMsg[1];
    }
  | false;

export type ConnectionInformation = {
  sid: string;
  upgrades: unknown[];
  pingInterval: number;
  pingTimeout: number;
  maxPayload: number;
};

export type TradeCreatedHandler = (data: WSTradeCreatedMsg[1]) => unknown;
