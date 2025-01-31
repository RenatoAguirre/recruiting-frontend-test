import axios from "axios";

const API_URL = "https://recruiting.api.bemmbo.com/invoices/pending";

const fetchInvoices = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;
  }
};

export { fetchInvoices };
