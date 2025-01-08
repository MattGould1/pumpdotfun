import { WSTradeCreated } from "src/pumpfun/types";

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
  | MessageHandlerMessage
  | {
      error: true;
      msg: string;
    }
  | {
      error: false;
    };

export type MessageHandlerMessage = {
  method: "tradeCreated";
  data: WSTradeCreated;
};

export type ConnectionInformation = {
  sid: string;
  upgrades: unknown[];
  pingInterval: number;
  pingTimeout: number;
  maxPayload: number;
};

export type MessageHandler = (data: MessageHandlerMessage) => unknown;
export type ErrorHandler = (data: { error: true; msg: string }) => unknown;
