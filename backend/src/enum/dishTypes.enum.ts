export enum DishType {
  SALAD = 'салат',
  FIRST = 'первое',
  SECOND = 'второе',
  DRINK = 'напиток',
  DESSERT = 'десерт',
}

// Дополнительная функция для проверки валидности типа
export const isValidDishType = (type: string): boolean => {
  return Object.values(DishType).includes(type as DishType);
};
