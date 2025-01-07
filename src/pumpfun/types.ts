export type WSTradeCreatedMsg = [
  "tradeCreated",
  {
    signature: string; // "5UXEWgj4qXak5kaMTJfJL1Tp8p8HFdbbTXXTM3KdSzHfw3BKB7KWZrgtnm1vpxMDMwx9szcJfcQ2scxm28ZAG5nR";
    sol_amount: number; // 2268714425;
    token_amount: number; // 7578065739385;
    is_buy: boolean; // true;
    user: string; // "31CWGRuELF5keiskGxLgSqvujsAuQREVAUUbFmm5ampz";
    timestamp: number; // 1736225022;
    mint: "96EGMz6ANP3CjZyjVwTAPqs8JnhfJ1VgPmjYVnJxpump";
    virtual_sol_reserves: number; // 99309199978;
    virtual_token_reserves: number; // 324139156104140;
    slot: number; // 312385217;
    tx_index: number; // 1;
    name: "Unicorn Shlong Dick Tree";
    symbol: "USDT";
    description: "";
    image_uri: "https://ipfs.io/ipfs/QmYJcj76n2FJ5QKGiHbrmzD97CEC5UMtnv4Qou6NbW4BAa";
    video_uri: null;
    metadata_uri: "https://ipfs.io/ipfs/QmcxTAVAmFaRFNZkh11ebqa4pExvRwhAB7egey7m5oHaGj";
    twitter: null;
    telegram: null;
    bonding_curve: "B3mt251aAzqLjY1wiYGf32jNXYpLNckDXxjweJBpj6JM";
    associated_bonding_curve: "J4ik1P38gcKGCSxp3bVXKpEx1G75KZ7WnK3dqmc46y9";
    creator: "21DrqjH3hp51Vcx5Hxh2kaYnfFcV3oM8m7B49mLsnoTj";
    created_timestamp: number; // 1736224565570;
    raydium_pool: null;
    complete: false;
    total_supply: number; // 1000000000000000;
    website: "https://www.reddit.com/r/mildlypenis/comments/bntzqt/this_tree/";
    show_name: true;
    king_of_the_hill_timestamp: number; // 1736224919000;
    market_cap: number; // 290.64490038;
    reply_count: number; // 70;
    last_reply: number; // 1736225019564;
    nsfw: false;
    market_id: null;
    inverted: null;
    is_currently_live: false;
    creator_username: null;
    creator_profile_image: null;
    usd_market_cap: number; // 62979.84346334221;
  },
];

export type CandleStick = {
  mint: string; // "26s2WUvymTGRVvj7NHicNaXYNf4rArTwKtJhrq36pump";
  timestamp: number; // 1736052600;
  open: number; // 1.7853628105030448e-7;
  high: number; // 1.7877085803085447e-7;
  low: number; // 1.779237225557866e-7;
  close: number; // 1.779237225557866e-7;
  volume: number; // 260200452;
  slot: number; // 311964347;
  is_5_min: boolean; // true;
  is_1_min: boolean; // true;
};
