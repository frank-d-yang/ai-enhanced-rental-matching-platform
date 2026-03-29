export async function getProperties(page = 1, size = 10) {
  const response = await fetch(
    `http://localhost:8080/api/properties?page=${page}&size=${size}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }

  return response.json();
}