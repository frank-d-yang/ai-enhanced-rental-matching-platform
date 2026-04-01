import {request} from "./request.js";

export async function getProperties(page = 1, size = 10) {
  return request(`/api/properties?page=${page}&size=${size}`)
}