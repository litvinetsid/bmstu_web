export enum DishType {
  SALAD = 'salad',
  FIRST = 'starter',
  SECOND = 'main course',
  DRINK = 'drink',
  DESSERT = 'dessert',
}

export const DishTypeOrder: DishType[] = [
  DishType.SALAD,
  DishType.FIRST,
  DishType.SECOND,
  DishType.DRINK,
  DishType.DESSERT,
];

export const isValidDishType = (type: string): boolean => {
  return Object.values(DishType).includes(type as DishType);
};

export const getDishTypeOrderIndex = (type: string): number => {
  return DishTypeOrder.indexOf(type as DishType);
};
