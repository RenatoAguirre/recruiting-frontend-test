export function CreditNoteItem({
  creditNote,
  isSelected,
  onSelect,
  invoiceId,
}) {
  return (
    <div
      className={`flex items-center p-4 border rounded-lg cursor-pointer gap-5 transition-colors ${
        isSelected
          ? "bg-indigo-50 border-indigo-500"
          : "border-gray-200 hover:border-indigo-200"
      }`}
      onClick={() => onSelect(creditNote)}
    >
      <input
        type="radio"
        className="w-4 h-4 text-indigo-500 focus:ring-indigo-400"
        checked={isSelected}
        onChange={() => onSelect(creditNote)}
      />
      <span className="text-gray-700">{creditNote.id}</span>
      <span className="text-gray-900">
        ${creditNote.amount} {creditNote.currency}
      </span>
      <span className="text-gray-600 ml-auto">{invoiceId}</span>
    </div>
  );
}
