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
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=hourly"
    );
    const response2 = await axios.get(
      "https://api.coingecko.com/api/v3/coins/ripple/market_chart?vs_currency=usd&days=1&interval=hourly"
    );
    const response3 = await axios.get(
      "https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=1&interval=hourly"
    );
    const response4 = await axios.get(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365&interval=daily"
    );
    const response5 = await axios.get(
      "https://api.coingecko.com/api/v3/coins/ripple/market_chart?vs_currency=usd&days=365&interval=daily"
    );
    const response6 = await axios.get(
      "https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=365&interval=daily"
    );
    const hourlyData = {
      bitcoin: response1.data.prices,
      ripple: response2.data.prices,
      solana: response3.data.prices,
    };
    const dailyData = {
      bitcoin: response4.data.prices,
      ripple: response5.data.prices,
      solana: response6.data.prices,
    };
    return {
      hourlyData,
      dailyData,
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
    const currentPrices = get(getCurrentPrices);
    return (
      portfolioValue.bitcoin * currentPrices.bitcoin +
      portfolioValue.ripple * currentPrices.ripple +
      portfolioValue.solana * currentPrices.solana
    );
  },
});

export const getHourlyTotalBalance = selector({
  key: "getHourlyTotalBalance",
  get: ({ get }) => {
    const portfolioValue = get(portfolioValueState);
    const dailyData = get(getMarketDatas).hourlyData;
    let balances = [];
    for (let i = 0; i < 25; i++) {
      balances.push({
        timestamp: dailyData.bitcoin[i][0],
        value:
          dailyData.bitcoin[i][1] * portfolioValue.bitcoin +
          dailyData.ripple[i][1] * portfolioValue.ripple +
          dailyData.solana[i][1] * portfolioValue.solana,
      });
    }
    return balances;
  },
});

export const getDailyTotalBalance = selector({
  key: "getDailyTotalBalance",
  get: ({ get }) => {
    const portfolioValue = get(portfolioValueState);
    const dailyData = get(getMarketDatas).dailyData;
    let balances = [];
    for (let i = 0; i < 365; i++) {
      balances.push({
        timestamp: dailyData.bitcoin[i][0],
        value:
          dailyData.bitcoin[i][1] * portfolioValue.bitcoin +
          dailyData.ripple[i][1] * portfolioValue.ripple +
          dailyData.solana[i][1] * portfolioValue.solana,
      });
    }
    return balances;
  },
});

export const getIndividualBalances = selector({
  key: "getIndividualBalances",
  get: ({ get }) => {
    const portfolioValue = get(portfolioValueState);
    const currentPrices = get(getCurrentPrices);
    return {
      bitcoin: portfolioValue.bitcoin * currentPrices.bitcoin || 0,
      ripple: portfolioValue.ripple * currentPrices.ripple || 0,
      solana: portfolioValue.solana * currentPrices.solana || 0,
    };
  },
});

export const getTotalBalanceDailyChange = selector({
  key: "getTotalBalanceChanges",
  get: async ({ get }) => {
    const portfolioValue = get(portfolioValueState);
    const totalBalance = get(getTotalBalance);

    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cripple%2Csolana&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const yesterdayTotalBalance =
      (portfolioValue.bitcoin *
        response.data[0].current_price *
        (100 - response.data[0].price_change_percentage_24h)) /
        100 +
      (portfolioValue.solana *
        response.data[2].current_price *
        (100 - response.data[2].price_change_percentage_24h)) /
        100 +
      (portfolioValue.ripple *
        response.data[1].current_price *
        (100 - response.data[1].price_change_percentage_24h)) /
        100;

    return (
      ((totalBalance - yesterdayTotalBalance) / yesterdayTotalBalance) * 100 ||
      0
    );
  },
});
