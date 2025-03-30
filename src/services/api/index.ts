import axios from "axios";
import { baseUrl } from "../../config/envConfig";

export const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
});
