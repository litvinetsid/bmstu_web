import { Dish } from './dish.model';

export interface Menu {
  id: string;
  day: string;
  variant: string;
  dishes: Dish[];
}
