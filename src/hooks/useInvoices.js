import { useState, useEffect } from "react";
import { fetchInvoices } from "../services/invoiceService";

export function useInvoices() {
  const [regularInvoices, setRegularInvoices] = useState([]);
  const [creditNotes, setCreditNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const invoices = await fetchInvoices();
        setRegularInvoices(
          invoices.filter((invoice) => invoice.type !== "credit_note")
        );
        setCreditNotes(
          invoices.filter((invoice) => invoice.type === "credit_note")
        );
      } catch (error) {
        console.error("Error loading invoices:", error);
        setError(
          "Error al cargar las facturas. Por favor, intente nuevamente."
        );
      } finally {
        setIsLoading(false);
      }
    };
    loadInvoices();
  }, []);

  return { regularInvoices, creditNotes, isLoading, error };
}
