import qs from "qs";
import config from "../config";

export async function api(endpoint, options = {}) {
  const params = options.params ? `?${qs.stringify(options.params)}` : "";
  const response = await fetch(`${config.baseUrl}${endpoint}${params}`);
  return response.json();
}
