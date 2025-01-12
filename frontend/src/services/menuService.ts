const API_URL = `${import.meta.env.VITE_API_URL}/menus`;

export const fetchMenus = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const fetchMenuById = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

export const createMenu = async (menu: { day: string; variant: string }) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(menu),
  });
  return response.json();
};

export const updateMenuById = async (id: string, menu: { day: string; variant: string }) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(menu),
  });
  return response.json();
};


export const deleteMenuById = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const moveDishBetweenMenus = async (fromMenuId: string, dishId: string, toMenuId: string) => {
  const response = await fetch(`${API_URL}/${fromMenuId}/dishes/${dishId}/move`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ toMenuId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || 'Failed to move dish between menus');
  }

  return response.json();
};