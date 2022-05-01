import { atom, selector } from "recoil";
import axios from "axios";

export const portfolioValueState = atom({
  key: "portfolioValueState",
  default: { bitcoin: 0, ripple: 0, solana: 0 },
});

export const getMarketDatas = selector({
  key: "getMarketDatas",
  get: async ({ get }) => {
    const response1 = await axios.get(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily"
    );
    const response2 = await axios.get(
      "https://api.coingecko.com/api/v3/coins/ripple/market_chart?vs_currency=usd&days=30&interval=daily"
    );
    const response3 = await axios.get(
      "https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=30&interval=daily"
    );
    return {
      bitcoin: response1.data.prices,
      ripple: response2.data.prices,
      solana: response3.data.prices,
    };
  },
});

export const getCurrentPrices = selector({
  key: "getCurrentPrices",
  get: async ({ get }) => {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cripple%2Csolana&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    return {
      bitcoin: response.data[0].current_price,
      ripple: response.data[1].current_price,
      solana: response.data[2].current_price,
    };
  },
});

export const getTotalBalance = selector({
  key: "getTotalBalance",
  get: ({ get }) => {
    const portfolioValue = get(portfolioValueState);
    const marketDatas = get(getMarketDatas);
    return (
      portfolioValue.bitcoin *
        marketDatas.bitcoin[marketDatas.bitcoin.length - 1][1] +
      portfolioValue.ripple *
        marketDatas.ripple[marketDatas.ripple.length - 1][1] +
      portfolioValue.solana *
        marketDatas.solana[marketDatas.solana.length - 1][1]
    );
  },
});

export const getThirtyDayBalances = selector({
  key: "getThirtyDayBalances",
  get: ({ get }) => {
    const portfolioValue = get(portfolioValueState);
    const marketDatas = get(getMarketDatas);
    let balances = [];
    for (let i = 1; i <= 30; i++) {
      balances.push({
        x: i,
        y:
          portfolioValue.bitcoin * marketDatas.bitcoin[i][1] +
          portfolioValue.ripple * marketDatas.ripple[i][1] +
          portfolioValue.solana * marketDatas.solana[i][1],
      });
    }
    return balances;
  },
});

export const getIndividualBalances = selector({
  key: "getIndividualBalances",
  get: ({ get }) => {
    const portfolioValue = get(portfolioValueState);
    const marketDatas = get(getMarketDatas);
    return {
      bitcoin:
        portfolioValue.bitcoin *
          marketDatas.bitcoin[marketDatas.bitcoin.length - 1][1] || 0,
      ripple:
        portfolioValue.ripple *
          marketDatas.ripple[marketDatas.ripple.length - 1][1] || 0,
      solana:
        portfolioValue.solana *
          marketDatas.solana[marketDatas.solana.length - 1][1] || 0,
    };
  },
});

export const getTotalBalanceDailyChange = selector({
  key: "getTotalBalanceChanges",
  get: ({ get }) => {
    const portfolioValue = get(portfolioValueState);
    const marketDatas = get(getMarketDatas);
    // index 0 is yesterday price and index 1 is today price
    const btcPrices = [
      marketDatas.bitcoin[marketDatas.bitcoin.length - 2][1],
      marketDatas.bitcoin[marketDatas.bitcoin.length - 1][1],
    ];
    const ripplePrices = [
      marketDatas.ripple[marketDatas.ripple.length - 2][1],
      marketDatas.ripple[marketDatas.ripple.length - 1][1],
    ];
    const solanaPrices = [
      marketDatas.solana[marketDatas.solana.length - 2][1],
      marketDatas.solana[marketDatas.solana.length - 1][1],
    ];
    const yesterdayTotalBalance =
      portfolioValue.bitcoin * btcPrices[0] +
      portfolioValue.ripple * ripplePrices[0] +
      portfolioValue.solana * solanaPrices[0];
    const todayTotalBalance =
      portfolioValue.bitcoin * btcPrices[1] +
      portfolioValue.ripple * ripplePrices[1] +
      portfolioValue.solana * solanaPrices[1];

    return (
      ((todayTotalBalance - yesterdayTotalBalance) / yesterdayTotalBalance) *
        100 || 0
    );
  },
});
