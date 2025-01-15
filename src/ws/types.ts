import { WSTradeCreated } from "../pumpfun/types";

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
  | ProcessMessageError
  | {
      error: false;
    };

export type ProcessMessageError = {
  error: true;
  msg: string;
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
