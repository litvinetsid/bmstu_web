const API_URL = `${import.meta.env.VITE_API_URL}/dishes`;

export const fetchDishes = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addDishToMenu = async (menuId: string, dishId: string) => {
  const response = await fetch(`${API_URL}/menus/${menuId}/dishes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dishId }),
  });
  return response.json();
};

export const removeDishFromMenu = async (menuId: string, dishId: string) => {
  const response = await fetch(`${API_URL}/menus/${menuId}/dishes/${dishId}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const createDish = async (dish: { name: string; type: string; }) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dish),
  });
  return response.json();
};
