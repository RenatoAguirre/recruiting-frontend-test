import { ModalPropTypes } from "../types/propTypes";
import PropTypes from "prop-types";
import { AssignmentSummary } from "./AssignmentSummary";

export function SuccessModal({ isOpen, onContinue, invoice, creditNotes }) {
  if (!isOpen) return null;

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
          <AssignmentSummary
            invoice={invoice}
            creditNotes={creditNotes}
            showWarning={false}
            variant="modal"
          />
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
