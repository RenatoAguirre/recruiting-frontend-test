import { useState } from "react";
import "./App.css";
import { SuccessModal } from "./components/SuccessModal";
import { DocumentItem } from "./components/DocumentItem";
import { useInvoices } from "./hooks/useInvoices";
import { getAmountInCLP } from "./utils/currency";

function App() {
  const { regularInvoices, creditNotes, isLoading, error } = useInvoices();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedCreditNotes, setSelectedCreditNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInvoiceSelect = (invoice) => {
    setSelectedInvoice(invoice);
    setSelectedCreditNotes([]);
  };

  const handleCreditNoteSelect = (creditNote) => {
    setSelectedCreditNotes((prev) => {
      const isAlreadySelected = prev.some((note) => note.id === creditNote.id);
      if (isAlreadySelected) {
        return prev.filter((note) => note.id !== creditNote.id);
      }
      return [...prev, creditNote];
    });
  };

  const getTotalCreditAmount = () => {
    return selectedCreditNotes.reduce(
      (total, note) => total + getAmountInCLP(note),
      0
    );
  };

  const handleAssign = () => {
    setIsModalOpen(true);
  };

  const handleContinue = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
    setSelectedCreditNotes([]);
  };

  const filteredCreditNotes = selectedInvoice
    ? creditNotes.filter((note) => note.reference === selectedInvoice.id)
    : [];

  const invoiceAmount = selectedInvoice ? getAmountInCLP(selectedInvoice) : 0;
  const totalCreditAmount = getTotalCreditAmount();
  const canAssign =
    selectedCreditNotes.length > 0 && totalCreditAmount <= invoiceAmount;

  if (isLoading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Cargando...</div>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Selecciona una factura
        </h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {regularInvoices.map((invoice) => (
            <DocumentItem
              key={invoice.id}
              document={invoice}
              isSelected={selectedInvoice?.id === invoice.id}
              onSelect={handleInvoiceSelect}
            />
          ))}
        </div>

        {selectedInvoice && (
          <>
            <h2 className="text-xl font-semibold mb-4 mt-8 text-center">
              Selecciona notas de crédito
            </h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {filteredCreditNotes.map((creditNote) => (
                <DocumentItem
                  key={creditNote.id}
                  document={creditNote}
                  isSelected={selectedCreditNotes.some(
                    (note) => note.id === creditNote.id
                  )}
                  onSelect={handleCreditNoteSelect}
                  referenceId={selectedInvoice.id}
                  type="checkbox"
                />
              ))}
              {filteredCreditNotes.length === 0 && (
                <div className="text-gray-500 text-center py-4">
                  No hay notas de crédito disponibles para esta factura
                </div>
              )}
            </div>

            {selectedCreditNotes.length > 0 && (
              <div className="mt-4 bg-white rounded-xl shadow-sm p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Total seleccionado</p>
                    <p className="text-lg font-medium">
                      {selectedCreditNotes.length} nota
                      {selectedCreditNotes.length !== 1 ? "s" : ""} de crédito
                    </p>
                  </div>
                  {!canAssign && (
                    <p className="text-red-500 text-sm">
                      El monto total excede el valor de la factura
                    </p>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {selectedCreditNotes.length > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              className={`px-8 py-3 rounded-lg text-base font-medium transition-colors ${
                canAssign
                  ? "bg-indigo-500 text-white hover:bg-indigo-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={handleAssign}
              disabled={!canAssign}
            >
              Asignar
            </button>
          </div>
        )}

        <SuccessModal
          isOpen={isModalOpen}
          onContinue={handleContinue}
          invoice={selectedInvoice}
          creditNotes={selectedCreditNotes}
        />
      </div>
    </div>
  );
}

export default App;
