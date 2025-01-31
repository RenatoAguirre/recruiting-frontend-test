//archivo solo para ordenarme con los tipos, si es un proyecto js no es necesario que vaya
export type Invoice = {
  id: string;
  amount: number;
  organization_id: string;
  currency: string;
  type: string;
  reference?: string;
};

export type InvoiceList = {
  invoices: Invoice[];
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
};
