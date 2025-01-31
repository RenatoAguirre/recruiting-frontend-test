import axios from "axios";

const API_URL = "https://recruiting.api.bemmbo.com/invoices/pending"; //esto podría ir en un archivo de configuración o un .env

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
