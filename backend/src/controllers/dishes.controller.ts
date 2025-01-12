import { Request, Response } from 'express';
import {
  getAllDishes,
  createDishService,
  addDishToMenuService,
  removeDishFromMenuService,
  moveDishBetweenMenusService,
  checkDishConstraintsService,
} from '../services/dishes.service';
import { createResponse } from '../utils/response.util';

export const getDishes = async (req: Request, res: Response) => {
  try {
    const dishes = await getAllDishes();
    res.status(200).json(createResponse(true, dishes, { count: dishes.length }));
  } catch (error) {
    res.status(500).json(createResponse(false, null, { message: 'Error fetching dishes' }));
  }
};

export const createDish = async (req: Request, res: Response) => {
  try {
    const newDish = await createDishService(req.body);
    res.status(201).json(createResponse(true, newDish, { message: 'Dish created successfully' }));
  } catch (error) {
    res.status(400).json(createResponse(false, null, { message: 'Invalid request data' }));
  }
};

export const addDishToMenu = async (req: Request, res: Response) => {
  try {
    const { menuId } = req.params;
    const { dishId } = req.body;
    const result = await addDishToMenuService(menuId, dishId);
    if (!result) {
      return res.status(400).json(createResponse(false, null, { message: 'Cannot add dish to menu' }));
    }
    res.status(200).json(createResponse(true, null, { message: 'Dish added to menu successfully' }));
  } catch (error) {
    res.status(500).json(createResponse(false, null, { message: 'Error adding dish to menu' }));
  }
};

export const removeDishFromMenu = async (req: Request, res: Response) => {
  try {
    const { menuId, dishId } = req.params;
    const result = await removeDishFromMenuService(menuId, dishId);
    if (!result) {
      return res.status(404).json(createResponse(false, null, { message: 'Dish not found in menu' }));
    }
    res.status(200).json(createResponse(true, null, { message: 'Dish removed from menu successfully' }));
  } catch (error) {
    res.status(500).json(createResponse(false, null, { message: 'Error removing dish from menu' }));
  }
};

export const moveDishBetweenMenus = async (req: Request, res: Response) => {
  try {
    const { fromMenuId, dishId } = req.params;
    const { toMenuId } = req.body;
    const result = await moveDishBetweenMenusService(fromMenuId, toMenuId, dishId);
    if (!result) {
      return res.status(400).json(createResponse(false, null, { message: 'Cannot move dish between menus' }));
    }
    res.status(200).json(createResponse(true, null, { message: 'Dish moved successfully' }));
  } catch (error) {
    res.status(500).json(createResponse(false, null, { message: 'Error moving dish between menus' }));
  }
};

export const checkDishConstraints = async (req: Request, res: Response) => {
  try {
    const { menuId } = req.params;
    const { dishId } = req.body;
    const isValid = await checkDishConstraintsService(menuId, dishId);
    if (!isValid) {
      return res.status(400).json(createResponse(false, null, { message: 'Cannot add more dishes of this type to menu' }));
    }
    res.status(200).json(createResponse(true, null, { message: 'Dish constraints are valid' }));
  } catch (error) {
    res.status(500).json(createResponse(false, null, { message: 'Error checking dish constraints' }));
  }
};
