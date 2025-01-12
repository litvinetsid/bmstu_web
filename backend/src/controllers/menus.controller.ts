import { Request, Response } from 'express';
import { getAllMenus, getMenuByIdService, createMenuService, updateMenuService, deleteMenuService } from '../services/menus.service';
import { createResponse } from '../utils/response.util';

export const getMenus = async (req: Request, res: Response) => {
    try {
      const menus = await getAllMenus();
      res.status(200).json(createResponse(true, menus, { count: menus.length }));
    } catch (error) {
      res.status(500).json(createResponse(false, null, { message: 'Error fetching menus' }));
    }
  };
  

export const getMenuById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const menu = await getMenuByIdService(id);
    if (!menu) {
      return res.status(404).json(createResponse(false, null, { message: 'Menu not found' }));
    }
    res.status(200).json(createResponse(true, menu, {}));
  } catch (error) {
    res.status(500).json(createResponse(false, null, { message: 'Error fetching menu' }));
  }
};

export const createMenu = async (req: Request, res: Response) => {
  try {
    const newMenu = await createMenuService(req.body);
    res.status(201).json(createResponse(true, newMenu, { message: 'Menu created successfully' }));
  } catch (error) {
    res.status(400).json(createResponse(false, null, { message: 'Invalid request data' }));
  }
};

export const updateMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedMenu = await updateMenuService(id, req.body);
    if (!updatedMenu) {
      return res.status(404).json(createResponse(false, null, { message: 'Menu not found' }));
    }
    res.status(200).json(createResponse(true, updatedMenu, { message: 'Menu updated successfully' }));
  } catch (error) {
    res.status(400).json(createResponse(false, null, { message: 'Invalid request data' }));
  }
};

export const deleteMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await deleteMenuService(id);
    if (!deleted) {
      return res.status(404).json(createResponse(false, null, { message: 'Menu not found' }));
    }
    res.status(200).json(createResponse(true, null, { message: 'Menu deleted successfully' }));
  } catch (error) {
    res.status(500).json(createResponse(false, null, { message: 'Error deleting menu' }));
  }
};
