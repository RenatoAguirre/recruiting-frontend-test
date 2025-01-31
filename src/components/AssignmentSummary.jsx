import PropTypes from "prop-types";
import { getAmountInCLP, formatCurrency } from "../utils/currency";

export function AssignmentSummary({
  invoice,
  creditNotes,
  showWarning = true,
  variant = "default",
}) {
  const invoiceAmount = getAmountInCLP(invoice);
  const totalCreditAmount = creditNotes.reduce(
    (total, note) => total + getAmountInCLP(note),
    0
  );
  const remainingAmount = invoiceAmount - totalCreditAmount;
  const canAssign = totalCreditAmount <= invoiceAmount;

  if (variant === "modal") {
    return (
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500 mb-1">Factura</p>
          <div className="flex justify-between">
            <span className="text-gray-700">{invoice.id}</span>
            <span className="font-medium">
              {formatCurrency(invoiceAmount, "CLP")} CLP
            </span>
          </div>
        </div>

        {creditNotes.map((note) => (
          <div key={note.id}>
            <p className="text-sm text-gray-500 mb-1">Nota de crédito</p>
            <div className="flex justify-between">
              <span className="text-gray-700">{note.id}</span>
              <span className="font-medium text-red-600">
                -{formatCurrency(getAmountInCLP(note), "CLP")} CLP
              </span>
            </div>
          </div>
        ))}

        <div className="pt-3 border-t">
          <div className="flex justify-between">
            <span className="font-medium">Monto restante</span>
            <span className="font-medium text-green-600">
              {formatCurrency(remainingAmount, "CLP")} CLP
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Total seleccionado</p>
          <p className="text-lg font-medium">
            {creditNotes.length} nota{creditNotes.length !== 1 ? "s" : ""} de
            crédito
          </p>
        </div>
        {showWarning && !canAssign && (
          <p className="text-red-500 text-sm">
            El monto total excede el valor de la factura
          </p>
        )}
      </div>

      <div className="space-y-2 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Monto factura</span>
          <span className="font-medium">
            {formatCurrency(invoiceAmount, "CLP")} CLP
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total notas de crédito</span>
          <span className="font-medium text-red-600">
            -{formatCurrency(totalCreditAmount, "CLP")} CLP
          </span>
        </div>
        <div className="flex justify-between text-sm pt-2 border-t">
          <span className="font-medium">Monto restante</span>
          <span
            className={`font-medium ${
              remainingAmount >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {formatCurrency(remainingAmount, "CLP")} CLP
          </span>
        </div>
      </div>
    </div>
  );
}

AssignmentSummary.propTypes = {
  invoice: PropTypes.shape({
    id: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired,
  creditNotes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
    })
  ).isRequired,
  showWarning: PropTypes.bool,
  variant: PropTypes.oneOf(["default", "modal"]),
};
