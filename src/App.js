import { useState } from "react";
import "./App.css";
import { SuccessModal } from "./components/SuccessModal";
import { DocumentItem } from "./components/DocumentItem";
import { useInvoices } from "./hooks/useInvoices";

function App() {
  const { regularInvoices, creditNotes, isLoading, error } = useInvoices();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedCreditNote, setSelectedCreditNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInvoiceSelect = (invoice) => {
    setSelectedInvoice(invoice);
    setSelectedCreditNote(null);
  };

  const handleCreditNoteSelect = (creditNote) => {
    setSelectedCreditNote(creditNote);
  };

  const handleAssign = () => {
    setIsModalOpen(true);
  };

  const handleContinue = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
    setSelectedCreditNote(null);
  };

  const filteredCreditNotes = selectedInvoice
    ? creditNotes.filter((note) => note.reference === selectedInvoice.id)
    : [];

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
              Selecciona una nota de crédito
            </h2>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {filteredCreditNotes.map((creditNote) => (
                <DocumentItem
                  key={creditNote.id}
                  document={creditNote}
                  isSelected={selectedCreditNote?.id === creditNote.id}
                  onSelect={handleCreditNoteSelect}
                  referenceId={selectedInvoice.id}
                />
              ))}
              {filteredCreditNotes.length === 0 && (
                <div className="text-gray-500 text-center py-4">
                  No hay notas de crédito disponibles para esta factura
                </div>
              )}
            </div>
          </>
        )}

        {selectedCreditNote && (
          <div className="mt-8 flex justify-center">
            <button
              className="bg-indigo-500 text-white px-8 py-3 rounded-lg text-base font-medium hover:bg-indigo-600 transition-colors"
              onClick={handleAssign}
            >
              Asignar
            </button>
          </div>
        )}

        <SuccessModal isOpen={isModalOpen} onContinue={handleContinue} />
      </div>
    </div>
  );
}

export default App;
