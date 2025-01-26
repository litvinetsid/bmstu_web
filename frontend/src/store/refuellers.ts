import { defineStore } from 'pinia';
import { fetchRefuellers, createRefueller, updateRefuellerById, deleteRefuellerById } from '../services/refuellerService';
import { addIssueToRefueller, removeIssueFromRefueller } from '../services/issueService';
import { moveIssueBetweenRefuellers } from '../services/refuellerService';

export const useRefuellerStore = defineStore('refuellers', {
  state: () => ({
    refuellers: [] as Array<{ id: string; name: string; fuel: string; vol: string; issues: any[] }>,
  }),
  actions: {
    async loadRefuellers() {
      const response = await fetchRefuellers();
      if (response.success) {
        this.refuellers = response.data || [];
      }
    },
    async addRefueller(refueller: { name: string; fuel: string; vol: string }) {
      const response = await createRefueller(refueller);
      if (response.success) {
        this.refuellers.push(response.data);
      }
    },
    async updateRefueller(id: string, updatedRefueller: { name: string; fuel: string; vol: string }) {
      const response = await updateRefuellerById(id, updatedRefueller);
      if (response.success) {
        const index = this.refuellers.findIndex((refueller) => refueller.id === id);
        if (index !== -1) {
          this.refuellers[index] = { ...this.refuellers[index], ...response.data };
        }
      }
    },
    async removeRefueller(id: string) {
      const response = await deleteRefuellerById(id);
      if (response.success) {
        this.refuellers = this.refuellers.filter((refueller) => refueller.id !== id);
      }
    },
    async addIssueToRefueller(refuellerId: string, issueId: string) {
      try {
        const response = await addIssueToRefueller(refuellerId, issueId);

        if (!response.success) {
          throw new Error(response.meta?.message || 'Failed to add issue to refueller');
        }

        const refueller = this.refuellers.find((refueller) => refueller.id === refuellerId);
        if (refueller) {
          refueller.issues.push(response.data);
        }

      } catch (error) {
        throw error;
      }
    },

    async removeIssueFromRefueller(refuellerId: string, issueId: string) {
      const response = await removeIssueFromRefueller(refuellerId, issueId);
      if (response.success) {
        const refueller = this.refuellers.find((refueller) => refueller.id === refuellerId);
        if (refueller) {
          refueller.issues = refueller.issues.filter((issue) => issue.id !== issueId);
        }
      }
    },

    async moveIssue(fromRefuellerId: string, toRefuellerId: string, issueId: string): Promise<boolean> {
      try {
        const response = await moveIssueBetweenRefuellers(fromRefuellerId, issueId, toRefuellerId);
        if (!response.success) {
          return false;
        }

        const sourceRefueller = this.refuellers.find((refueller) => refueller.id === fromRefuellerId);
        const targetRefueller = this.refuellers.find((refueller) => refueller.id === toRefuellerId);

        if (sourceRefueller && targetRefueller) {
          const issueIndex = sourceRefueller.issues.findIndex((issue) => issue.id === issueId);
          if (issueIndex !== -1) {
            const [issue] = sourceRefueller.issues.splice(issueIndex, 1);
            targetRefueller.issues.push(issue);
          }
        }

        return true;
      } catch (error) {
        console.error('Error moving issue between refuellers:', error);
        return false;
      }
    },
  },
});
