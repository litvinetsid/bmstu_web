const API_URL = `${import.meta.env.VITE_API_URL}/refuellers`;

export const fetchRefuellers = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const fetchRefuellerById = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

export const createRefueller = async (refueller: { name: string; fuel: string; vol: string }) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(refueller),
  });
  return response.json();
};

export const updateRefuellerById = async (id: string, refueller: { name: string; fuel: string; vol: string }) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(refueller),
  });
  return response.json();
};


export const deleteRefuellerById = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const moveIssueBetweenRefuellers = async (fromRefuellerId: string, issueId: string, toRefuellerId: string) => {
  const response = await fetch(`${API_URL}/${fromRefuellerId}/issues/${issueId}/move`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ toRefuellerId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || 'Failed to move issue between refuellers');
  }

  return response.json();
};