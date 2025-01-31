export const USD_TO_CLP = 979.9; //esto podría ser un llamado a alguna api
export const CLP_TO_USD = 0.001021;

export const formatCurrency = (amount, currency) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getAmountInCLP = (document) => {
  return document.currency === "USD"
    ? document.amount * USD_TO_CLP
    : document.amount;
};

export const getAmountInUSD = (document) => {
  return document.currency === "USD"
    ? document.amount
    : document.amount * CLP_TO_USD;
};

export const getFormattedAmounts = (document) => {
  const mainAmount = getAmountInCLP(document);
  const secondaryAmount = getAmountInUSD(document);

  return {
    mainAmount,
    secondaryAmount,
    displayText: `${formatCurrency(mainAmount, "CLP")} (${formatCurrency(
      secondaryAmount,
      "USD"
    )})`,
  };
};
