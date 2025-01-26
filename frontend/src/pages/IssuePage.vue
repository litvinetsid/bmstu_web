<template>
  <div class="issue-page page-container">
    <h1>Issues</h1>
    <center><button @click="showIssueModal = true">Add New Issue</button></center>
    <div v-if="issues.length" class="issue-list">
      <IssueItem 
        v-for="issue in issues" 
        :key="issue.id" 
        :issue="issue" 
        @click="openEditIssueModal(issue)" 
        @delete-issue="deleteIssue" 
      />
    </div>
    <p v-else>No issues available</p>

    <!-- Add/Edit Issue Modal -->
    <div v-if="showIssueModal" class="modal-overlay" @click.self="closeIssueModal">
      <div class="modal">
        <h2>{{ isEditing ? 'Edit Issue' : 'Add Issue' }}</h2>
        <form @submit.prevent="submitIssue">
          <div>
            <label for="name">Name:</label>
            <input id="name" v-model="currentIssue.name" type="text" required />
          </div>
          <div>
            <label for="number">Number:</label>
            <input id="number" v-model="currentIssue.number" type="text" required />
          </div>
          <div>
            <label for="volume">Volume:</label>
            <input id="volume" v-model="currentIssue.volume" type="text" required />
          </div>
          <div>
            <label for="fuel">Fuel:</label>
            <select id="fuel" v-model="currentIssue.fuel" required>
              <option value="92">92</option>
              <option value="95">95</option>
              <option value="98">98</option>
              <option value="100">100</option>
              <option value="diesel">diesel</option>
            </select>
          </div>
          <div class="modal-buttons">
            <button type="submit">{{ isEditing ? 'Update' : 'Add' }}</button>
            <button type="button" @click="closeIssueModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import {
  fetchIssues,
  createIssue,
  updateIssueService,
  deleteIssueService,
} from '../services/issueService';
import IssueItem from '../components/IssueItem.vue';
import { toast } from 'vue3-toastify';

export default defineComponent({
  name: 'IssuePage',
  components: { IssueItem },
  setup() {
    const issues = reactive<Array<{ id: string; name: string; fuel: string; volume: string; number: string }>>([]);
    const currentIssue = reactive<{ id?: string; name: string;fuel: string; volume: string; number: string }>({
      name: '',
      fuel: '',
      volume: '',
      number: '',
    });
    const showIssueModal = ref(false);
    const isEditing = ref(false);

    const loadIssues = async () => {
      const response = await fetchIssues();
      if (response.success) {
        issues.push(...(response.data as Array<{ id: string; name: string; fuel: string; volume: string; number: string }>));
      }
    };

    const addIssue = async () => {
      try {
        const response = await createIssue(currentIssue);
        if (response.success) {
          issues.push(response.data);
          closeIssueModal();
          toast.success('Issue added successfully');
        } else {
          throw new Error('Failed to add issue');
        }
      } catch (error) {
        toast.error(error || 'Error adding issue');
      }
    };

    const updateIssue = async () => {
      if (!currentIssue.id) return;
      try {
        const response = await updateIssueService(currentIssue.id, currentIssue);
        if (response.success) {
          const index = issues.findIndex((issue) => issue.id === currentIssue.id);
          if (index !== -1) {
            issues[index] = response.data;
          }
          closeIssueModal();
          toast.success('Issue updated successfully');
        } else {
          throw new Error('Failed to update issue');
        }
      } catch (error) {
        toast.error(error || 'Error updating issue');
      }
    };

    const deleteIssue = async (id?: string) => {
      if (!id) return;
      try {
        const response = await deleteIssueService(id);
        if (response.success) {
          const index = issues.findIndex((issue) => issue.id === id);
          if (index !== -1) {
            issues.splice(index, 1);
          }
          toast.success('Issue deleted successfully');
        } else {
          throw new Error('Failed to delete issue');
        }
      } catch (error) {
        toast.error(error || 'Error deleting issue');
      }
    };

    const openEditIssueModal = (issue: { id: string; name: string; fuel: string; volume: string; number: string }) => {
      Object.assign(currentIssue, issue);
      isEditing.value = true;
      showIssueModal.value = true;
    };

    const closeIssueModal = () => {
      Object.assign(currentIssue, { name: '', fuel: '', volume: '', number: '' });
      isEditing.value = false;
      showIssueModal.value = false;
    };

    const submitIssue = async () => {
      if (isEditing.value) {
        await updateIssue();
      } else {
        await addIssue();
      }
    };

    const route = useRoute();
    const loadIssueFromRoute = () => {
      const issueId = route.params.id as string;
      if (issueId) {
        const issue = issues.find((d) => d.id == issueId);
        if (issue) {
          openEditIssueModal(issue);
        }
      }
    };

    onMounted(async () => {
      await loadIssues();
      loadIssueFromRoute();
    });

    return {
      issues,
      currentIssue,
      showIssueModal,
      isEditing,
      addIssue,
      updateIssue,
      deleteIssue,
      openEditIssueModal,
      closeIssueModal,
      submitIssue,
    };
  },
});
</script>
