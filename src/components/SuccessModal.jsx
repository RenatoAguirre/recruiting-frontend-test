export function SuccessModal({ isOpen, onContinue }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl text-center">
        <div className="w-16 h-16 bg-green-300 rounded-full flex items-center justify-center mx-auto mb-5">
          <span className="text-white text-2xl">✓</span>
        </div>
        <h2 className="text-xl font-semibold mb-6">
          Nota de crédito asignada correctamente
        </h2>
        <button
          className="bg-indigo-500 text-white px-6 py-3 rounded-lg text-base hover:bg-indigo-600 transition-colors"
          onClick={onContinue}
        >
          Seguir asignando
        </button>
      </div>
    </div>
  );
}
