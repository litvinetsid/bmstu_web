import { Request, Response } from 'express';
import { getAllRefuellers, getRefuellerByIdService, createRefuellerService, updateRefuellerService, deleteRefuellerService } from '../services/refuellers.service';
import { createResponse } from '../utils/response.util';

export const getRefuellers = async (req: Request, res: Response) => {
  try {
    const refuellers = await getAllRefuellers();
    res.status(200).json(createResponse(true, refuellers, { count: refuellers.length }));
  } catch (error) {
    res.status(500).json(createResponse(false, null, { message: 'Error fetching refuellers' }));
  }
};


export const getRefuellerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const refueller = await getRefuellerByIdService(id);
    if (!refueller) {
      return res.status(404).json(createResponse(false, null, { message: 'Refueller not found' }));
    }
    res.status(200).json(createResponse(true, refueller, {}));
  } catch (error) {
    res.status(500).json(createResponse(false, null, { message: 'Error fetching refueller' }));
  }
};

export const createRefueller = async (req: Request, res: Response) => {
  try {
    const newRefueller = await createRefuellerService(req.body);
    res.status(201).json(createResponse(true, newRefueller, { message: 'Refueller created successfully' }));
  } catch (error) {
    res.status(400).json(createResponse(false, null, { message: 'Invalid request data' }));
  }
};

export const updateRefueller = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedRefueller = await updateRefuellerService(id, req.body);
    if (!updatedRefueller) {
      return res.status(404).json(createResponse(false, null, { message: 'Refueller not found' }));
    }
    res.status(200).json(createResponse(true, updatedRefueller, { message: 'Refueller updated successfully' }));
  } catch (error) {
    res.status(400).json(createResponse(false, null, { message: 'Invalid request data' }));
  }
};

export const deleteRefueller = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await deleteRefuellerService(id);
    if (!deleted) {
      return res.status(404).json(createResponse(false, null, { message: 'Refueller not found' }));
    }
    res.status(200).json(createResponse(true, null, { message: 'Refueller deleted successfully' }));
  } catch (error) {
    res.status(500).json(createResponse(false, null, { message: 'Error deleting refueller' }));
  }
};
