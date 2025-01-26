import { Request, Response } from 'express';
import {
  getAllIssues,
  createIssueService,
  addIssueToRefuellerService,
  removeIssueFromRefuellerService,
  moveIssueBetweenRefuellersService,
  updateIssueService,
  deleteIssueService,
} from '../services/issues.service';
import { createResponse } from '../utils/response.util';

export const getIssues = async (req: Request, res: Response) => {
  try {
    const issues = await getAllIssues();
    res.status(200).json(createResponse(true, issues, { count: issues.length }));
  } catch (error) {
    res.status(500).json(createResponse(false, null, { message: 'Error fetching issues' }));
  }
};

export const createIssue = async (req: Request, res: Response) => {
  try {
    const newIssue = await createIssueService(req.body);
    res.status(201).json(createResponse(true, newIssue, { message: 'Issue created successfully' }));
  } catch (error) {
    res.status(400).json(createResponse(false, null, { message: 'Invalid request data' }));
  }
};

export const updateIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedIssue = await updateIssueService(id, req.body);
    if (!updatedIssue) {
      return res.status(404).json(createResponse(false, null, { message: 'Issue not found' }));
    }
    res.status(200).json(createResponse(true, updatedIssue, { message: 'Issue updated successfully' }));
  } catch (error) {
    res.status(500).json(createResponse(false, null, { message: 'Error updating issue' }));
  }
};

export const deleteIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteIssueService(id);
    if (!result) {
      return res.status(404).json(createResponse(false, null, { message: 'Issue not found' }));
    }
    res.status(200).json(createResponse(true, null, { message: 'Issue deleted successfully' }));
  } catch (error) {
    res.status(500).json(createResponse(false, null, { message: 'Error deleting issue' }));
  }
};


export const addIssueToRefueller = async (req: Request, res: Response) => {
  try {
    const { refuellerId } = req.params;
    const { issueId } = req.body;

    const result = await addIssueToRefuellerService(refuellerId, issueId);

    if (!result) {
      return res.status(400).json(
        createResponse(false, null, {
          message: 'Issue cannot be added to the refueller due to constraints.',
        })
      );
    }

    res.status(200).json(
      createResponse(true, result, {
        message: 'Issue added to refueller successfully',
      })
    );
  } catch (error: any) {
    if (error.message.includes('already exists')) {
      return res.status(400).json(
        createResponse(false, null, {
          message: error.message,
        })
      );
    }

    if (error.message.includes('Refueller or issue not found.')) {
      return res.status(400).json(
        createResponse(false, null, {
          message: error.message,
        })
      );
    }

    res.status(500).json(
      createResponse(false, null, {
        message: 'Error adding issue to refueller',
        error: error.message,
      })
    );
  }
};

export const removeIssueFromRefueller = async (req: Request, res: Response) => {
  try {
    const { refuellerId, issueId } = req.params;
    const result = await removeIssueFromRefuellerService(refuellerId, issueId);
    if (!result) {
      return res.status(404).json(createResponse(false, null, { message: 'Issue not found in refueller' }));
    }
    res.status(200).json(createResponse(true, null, { message: 'Issue removed from refueller successfully' }));
  } catch (error) {
    res.status(500).json(createResponse(false, null, { message: 'Error removing issue from refueller' }));
  }
};

export const moveIssueBetweenRefuellers = async (req: Request, res: Response) => {
  try {
    const { fromRefuellerId, issueId } = req.params;
    const { toRefuellerId } = req.body;
    const result = await moveIssueBetweenRefuellersService(fromRefuellerId, toRefuellerId, issueId);
    if (!result) {
      return res.status(400).json(createResponse(false, null, { message: 'Cannot move issue between refuellers' }));
    }
    res.status(200).json(createResponse(true, null, { message: 'Issue moved successfully' }));
  } catch (error) {
    res.status(500).json(createResponse(false, null, { message: 'Error moving issue between refuellers' }));
  }
};
