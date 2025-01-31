import { DocumentItemPropTypes } from "../types/propTypes";
import { getFormattedAmounts } from "../utils/currency";

export function DocumentItem({ document, isSelected, onSelect, referenceId }) {
  const isInvoice = document.type !== "credit_note";

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

      <div className="flex-1">
        <span className="text-gray-900 font-bold">
          {getFormattedAmounts(document).displayText}
        </span>
      </div>

      <div className="w-24 text-right text-gray-500">
        {isInvoice ? getDocumentStatus() : referenceId}
      </div>
    </div>
  );
}

DocumentItem.propTypes = DocumentItemPropTypes;
