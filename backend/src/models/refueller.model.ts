import { Issue } from './issue.model';

export interface Refueller {
  id: string;
  name: string;
  fuel: string;
  vol: string;
  issues: Issue[];
}
