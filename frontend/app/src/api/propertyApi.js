import {request} from "./request.js";

export async function getProperties(page = 1, size = 10, params = {}) {

  const queryParams = new URLSearchParams();

  queryParams.append("page", page);
  queryParams.append("size", size);

  if (params.location) queryParams.append("location", params.location);
  if (params.minPrice) queryParams.append("minPrice", params.minPrice);
  if (params.maxPrice) queryParams.append("maxPrice", params.maxPrice);

  return request(`/api/properties?${queryParams.toString()}`);
}