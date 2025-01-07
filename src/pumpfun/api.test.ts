import { writeFileSync } from "node:fs";
import { getCandleSticks } from "./api";

describe("api", () => {
  test("It receives data", async () => {
    const { data } = await getCandleSticks({
      mint: "26s2WUvymTGRVvj7NHicNaXYNf4rArTwKtJhrq36pump",
    });
    writeFileSync("candlesticks.json", JSON.stringify(data));
  });
});
