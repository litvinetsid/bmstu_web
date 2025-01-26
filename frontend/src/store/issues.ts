import { defineStore } from 'pinia';
import { fetchIssues, createIssue } from '../services/issueService';

export const useIssueStore = defineStore('issues', {
  state: () => ({
    issues: [] as Array<{ id: string; name: string; fuel: string; volume: string; number: string }>,
  }),
  actions: {
    async loadIssues() {
      const response = await fetchIssues();
      if (response.success) {
        this.issues = response.data;
      }
    },
    async addIssue(issue: { name: string; fuel: string; volume: string; number: string }) {
      const response = await createIssue(issue);
      if (response.success) {
        this.issues.push(response.data);
      }
    },
  },
});
