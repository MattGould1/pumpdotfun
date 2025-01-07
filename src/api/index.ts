import axios, { AxiosInstance } from "axios";

export class API {
  private baseUrl = "https://frontend-api-v2.pump.fun";
  private _instance: AxiosInstance;

  constructor() {
    this._instance = axios.create({
      baseURL: this.baseUrl,
    });
  }

  instance() {
    return this._instance;
  }
}
