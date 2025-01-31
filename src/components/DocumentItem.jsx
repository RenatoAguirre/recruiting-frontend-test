import { DocumentItemPropTypes } from "../types/propTypes";

const USD_TO_CLP = 979.9; //esto podría ser un lamado a alguna api
const CLP_TO_USD = 0.001021;

export function DocumentItem({ document, isSelected, onSelect, referenceId }) {
  const isInvoice = document.type !== "credit_note";

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: currency,
      currencyDisplay: "symbol",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getAmountDisplay = () => {
    const mainAmount =
      document.currency === "USD"
        ? document.amount * USD_TO_CLP
        : document.amount;
    const secondaryAmount =
      document.currency === "USD"
        ? document.amount
        : document.amount * CLP_TO_USD;

    return (
      <>
        {formatCurrency(mainAmount, "CLP")}
        <span className="text-gray-400 ml-1">
          ({formatCurrency(secondaryAmount, "USD")})
        </span>
      </>
    );
  };

  const getDocumentStatus = () => {
    return document.type === "received" ? "Recibida" : document.type;
  };

  return (
    <div
      className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors ${
        isSelected ? "bg-indigo-100/70" : "bg-white hover:bg-gray-50"
      }`}
      onClick={() => onSelect(document)}
    >
      <input
        type="radio"
        className="w-4 h-4 text-indigo-500 focus:ring-indigo-400 mr-4"
        checked={isSelected}
        onChange={() => onSelect(document)}
      />
      <div className="flex-1 flex items-center gap-2">
        <span className="text-indigo-600 font-medium">{document.id}</span>
        <span className="text-gray-400">({document.organization_id})</span>
      </div>

      <div className="flex-1">{getAmountDisplay()}</div>

      <div className="w-24 text-right text-gray-500">
        {isInvoice ? getDocumentStatus() : referenceId}
      </div>
    </div>
  );
}

DocumentItem.propTypes = DocumentItemPropTypes;
