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
