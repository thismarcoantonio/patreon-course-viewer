import qs from "qs";

export async function api(url, config = {}) {
  const params = config.params ? `?${qs.stringify(config.params)}` : "";
  const response = await fetch(`${url}${params}`);
  return response.json();
}
