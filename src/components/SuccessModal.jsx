import { ModalPropTypes } from "../types/propTypes";
import PropTypes from "prop-types";
import { formatCurrency, getAmountInCLP } from "../utils/currency";

export function SuccessModal({ isOpen, onContinue, invoice, creditNotes }) {
  if (!isOpen) return null;

  const invoiceAmount = getAmountInCLP(invoice);
  const totalCreditAmount = creditNotes.reduce(
    (total, note) => total + getAmountInCLP(note),
    0
  );
  const remainingAmount = invoiceAmount - totalCreditAmount;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl text-center max-w-md w-full mx-4">
        <div className="w-16 h-16 bg-green-300 rounded-full flex items-center justify-center mx-auto mb-5">
          <span className="text-white text-2xl">✓</span>
        </div>
        <h2 className="text-xl font-semibold mb-6">
          Notas de crédito asignadas correctamente
        </h2>

        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
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
        </div>

        <button
          className="bg-indigo-500 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-indigo-600 transition-colors w-full"
          onClick={onContinue}
        >
          Seguir asignando
        </button>
      </div>
    </div>
  );
}

SuccessModal.propTypes = {
  ...ModalPropTypes,
  invoice: PropTypes.shape({
    id: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
  }),
  creditNotes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
    })
  ),
};
