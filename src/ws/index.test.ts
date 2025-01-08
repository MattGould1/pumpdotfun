import { WS } from ".";

describe("ws", () => {
  test.each([
    {
      msg: "2",
      expected: {
        method: "keepAlive",
        data: 2,
      },
    },
    {
      msg: '42["tradeCreated",{"signature":"5pG9Crt3C6nA7J282AKRhSivTTEcsYe5f4WDMmefPo3RP4Mk5zJb6a1EjSDyhPFad5j4ynDRd8WisiG76D9nGmhe","sol_amount":62000000,"token_amount":2212682967800,"is_buy":true,"user":"5VXgJyJsXDaK1ka1TfuzsT9C88fJJAUCJmRV7zrEQjtQ","timestamp":1736235656,"mint":"1ggxALwRLkeVwv3NGHqm7VPji4TvvbTxWT1gmRYmEPk","virtual_sol_reserves":30063879191,"virtual_token_reserves":1070720114321659,"slot":312411247,"tx_index":1,"name":"Christmas Bacon","symbol":"BACON","description":"The bacon famous on tiktok","image_uri":"https://ipfs.io/ipfs/QmbHW2pEwVWkjWLrvEKo3AdMyB1J6gne7XYDK95TDn9JaH","video_uri":null,"metadata_uri":"https://ipfs.io/ipfs/QmPTTUr9UjJaY4HaXrDVD2M2Cag5u9xbL8v1iV4LapB1kB","twitter":"https://www.tiktok.com/@leaderomegabacon/video/7443242534714805535","telegram":null,"bonding_curve":"GZG6SEMczHF8mBD6nwp9Y2eq1NntQFL5DSjciavBJ2Pr","associated_bonding_curve":"4krWvsmVg3kSMevsAvJdFGrz3QUyytP37CSxZFhH81fm","creator":"7mw6vPWBNb3R9g9Ua1ZzT9a5UstPH6Gg2NwAXsPiq6z7","created_timestamp":1733199569569,"raydium_pool":null,"complete":false,"total_supply":1000000000000000,"website":null,"show_name":true,"king_of_the_hill_timestamp":null,"market_cap":27.962496129,"reply_count":24,"last_reply":1736227634529,"nsfw":false,"market_id":null,"inverted":null,"is_currently_live":false,"creator_username":null,"creator_profile_image":null,"usd_market_cap":6047.72866278012}]',
      expected: {
        method: "tradeCreated",
        data: {
          signature:
            "5pG9Crt3C6nA7J282AKRhSivTTEcsYe5f4WDMmefPo3RP4Mk5zJb6a1EjSDyhPFad5j4ynDRd8WisiG76D9nGmhe",
          sol_amount: 62000000,
          token_amount: 2212682967800,
          is_buy: true,
          user: "5VXgJyJsXDaK1ka1TfuzsT9C88fJJAUCJmRV7zrEQjtQ",
          timestamp: 1736235656,
          mint: "1ggxALwRLkeVwv3NGHqm7VPji4TvvbTxWT1gmRYmEPk",
          virtual_sol_reserves: 30063879191,
          virtual_token_reserves: 1070720114321659,
          slot: 312411247,
          tx_index: 1,
          name: "Christmas Bacon",
          symbol: "BACON",
          description: "The bacon famous on tiktok",
          image_uri:
            "https://ipfs.io/ipfs/QmbHW2pEwVWkjWLrvEKo3AdMyB1J6gne7XYDK95TDn9JaH",
          video_uri: null,
          metadata_uri:
            "https://ipfs.io/ipfs/QmPTTUr9UjJaY4HaXrDVD2M2Cag5u9xbL8v1iV4LapB1kB",
          twitter:
            "https://www.tiktok.com/@leaderomegabacon/video/7443242534714805535",
          telegram: null,
          bonding_curve: "GZG6SEMczHF8mBD6nwp9Y2eq1NntQFL5DSjciavBJ2Pr",
          associated_bonding_curve:
            "4krWvsmVg3kSMevsAvJdFGrz3QUyytP37CSxZFhH81fm",
          creator: "7mw6vPWBNb3R9g9Ua1ZzT9a5UstPH6Gg2NwAXsPiq6z7",
          created_timestamp: 1733199569569,
          raydium_pool: null,
          complete: false,
          total_supply: 1000000000000000,
          website: null,
          show_name: true,
          king_of_the_hill_timestamp: null,
          market_cap: 27.962496129,
          reply_count: 24,
          last_reply: 1736227634529,
          nsfw: false,
          market_id: null,
          inverted: null,
          is_currently_live: false,
          creator_username: null,
          creator_profile_image: null,
          usd_market_cap: 6047.72866278012,
        },
      },
    },
    {
      msg: '0{"sid":"fRvaXxhJ8Musj-UkAObm","upgrades":[],"pingInterval":25000,"pingTimeout":20000,"maxPayload":1000000}',
      expected: {
        method: "connectionInformation",
        data: {
          sid: "fRvaXxhJ8Musj-UkAObm",
          upgrades: [],
          pingInterval: 25000,
          pingTimeout: 20000,
          maxPayload: 1000000,
        },
      },
    },
    {
      msg: '40{"sid":"6gcL3pzMssQqpo6qAObq"}',
      expected: false,
    },
  ])("It parses data - %o", (args) => {
    const ws = new WS({ tradeCreatedHandler: () => {} });
    const result = ws.processMessage(args.msg);
    expect(result).toEqual(args.expected);
  });
});
