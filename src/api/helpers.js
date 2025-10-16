export async function getData(endpoint) {
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error(response.status);

  return await response.json();
}

export async function postData(endpoint, data) {
  await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function isHex(str) {
  const pattern = /^[a-fA-F0-9]+$/;

  str = str.startsWith("0x") ? str.slice(2) : str; // Common optional prefix
  return pattern.test(str);
}
