import { AxiosResponse } from "axios";
import { API } from "../api";
import { CandleStick } from "./types";

let _api: API | undefined;
export const getApi = () => {
  if (!_api) {
    return new API();
  }

  return _api;
};

export const getCandleSticks = async ({ mint }: { mint: string }) => {
  const api = getApi().instance();
  return api.get<unknown, AxiosResponse<CandleStick[]>>(
    `candlesticks/${mint}`,
    {
      method: "GET",
      params: {
        offset: 0,
        limit: 1000,
        timeframe: 1,
      },
    }
  );
};
