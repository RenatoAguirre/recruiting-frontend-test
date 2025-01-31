import axios from "axios";

const fetchInvoices = async () => {
  const API_URL = "https://recruiting.api.bemmbo.com/invoices/pending";
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;
  }
};

export { fetchInvoices };
