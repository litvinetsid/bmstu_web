<template>
  <div class="refueller-page">
    <h1>Refuellers</h1>
    <center><button @click="showCreateRefuellerModal">Add New Refueller</button></center>

    <div class="refueller-grid">
      <div class="column" v-for="refueller in groupedRefuellers" :key="refueller.name">
        <RefuellerItem v-for="item in refueller.items" :key="item.id" :refueller="item" :onDragStart="onDragStart" :onDrop="onDrop"
          :removeIssue="removeIssueFromRefueller" :editRefueller="editRefueller" :deleteRefueller="deleteRefueller"
          @navigateToIssue="navigateToIssue" />


      </div>
    </div>

    <div class="modal-overlay" @click.self="closeModal" v-if="showModal">
      <div class="modal">
        <h2>{{ isEdit ? 'Edit Refueller' : 'Create Refueller' }}</h2>
        <form @submit.prevent="submitRefueller">
          <label>
            Name:
            <input v-model="refuellerForm.name" type="text" required />
          </label>
          <label>
            Volume:
            <input v-model="refuellerForm.vol" type="text" required />
          </label>
          <label for="fuel">Fuel:</label>
            <select id="fuel" v-model="refuellerForm.fuel" required>
              <option value="92">92</option>
              <option value="95">95</option>
              <option value="98">98</option>
              <option value="100">100</option>
              <option value="diesel">diesel</option>
            </select>
          <button type="submit">{{ isEdit ? 'Update' : 'Create' }}</button>
          <button type="button" @click="closeModal">Cancel</button>
        </form>
        <label v-if="isEdit">
          Add Issues:
          <select v-model="selectedIssue">
            <option v-for="issue in availableIssues" :value="issue.id" :key="issue.id">
              {{ issue.name }}
            </option>
          </select>
          <button type="button" class="add-issue-button" @click="addIssueToRefueller">Add Issue</button>
        </label>
      </div>
    </div>

  </div>

  <div v-if="showAdModal" class="ad-modal-overlay">
    <div class="ad-modal">
      <button class="close-btn" :disabled="adTimer > 0" @click="closeAdModal">
        Close <span v-if="adTimer > 0">in {{ adTimer }}</span>
      </button>
      <img src="https://nothehe.fun/ad/image.png" alt="Ad Image" class="ad-image" />
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, onMounted } from 'vue';
import { useRefuellerStore } from '../store/refuellers';
import { fetchIssues } from '../services/issueService';
import { useRouter } from 'vue-router';
import RefuellerItem from '../components/RefuellerItem.vue';
import { toast } from 'vue3-toastify';

export default defineComponent({
  name: 'RefuellerPage',
  components: { RefuellerItem },
  setup() {
    const refuellerStore = useRefuellerStore();
    const router = useRouter();
    const issues = ref<{ id: string; name: string; fuel: string; vol: string }[]>([]);

    const refuellerForm = reactive({ name: '', fuel: '', vol: '' });
    const showModal = ref(false);
    const isEdit = ref(false);
    const currentRefuellerId = ref<string | null>(null);

    const selectedIssue = ref<string>('');
    const availableIssues = computed(() => {
      if (!currentRefuellerId.value) return issues.value;
      const currentRefueller = refuellerStore.refuellers.find((refueller) => refueller.id === currentRefuellerId.value);
      return issues.value.filter((issue) => !currentRefueller?.issues.some((d) => d.id === issue.id));
    });

    const IssueTypeOrder = ['92', '95', '98', '100', 'diesel'];

    const getIssueTypeOrderIndex = (type: string): number => {
      const index = IssueTypeOrder.indexOf(type);
      return index !== -1 ? index : IssueTypeOrder.length;
    };

    const groupedRefuellers = computed(() =>
      refuellerStore.refuellers.reduce((columns: { name: string; items: any[] }[], refueller) => {
        if (!refueller.name) return columns;

        const sortedIssues = [...refueller.issues].sort(
          (a, b) => getIssueTypeOrderIndex(a.type) - getIssueTypeOrderIndex(b.type)
        );

        const column = columns.find((col) => col.name === refueller.name);
        if (!column) {
          columns.push({ name: refueller.name, items: [{ ...refueller, issues: sortedIssues }] });
        } else {
          column.items.push({ ...refueller, issues: sortedIssues });
        }
        return columns;
      }, [])
    );

    const updateIssueOrder = (refuellerId: string) => {
      const refueller = refuellerStore.refuellers.find((m) => m.id === refuellerId);
      if (refueller) {
        refueller.issues.sort((a, b) => getIssueTypeOrderIndex(a.type) - getIssueTypeOrderIndex(b.type));
      }
    };

    const navigateToIssue = (issueId: string) => {
      router.push(`/issues/${issueId}`);
    };


    const draggedIssue = ref<{ issueId: string; fromRefuellerId: string } | null>(null);

    const showCreateRefuellerModal = () => {
      isEdit.value = false;
      refuellerForm.name = '';
      refuellerForm.fuel = '';
      refuellerForm.vol = '';
      showModal.value = true;
    };

    const editRefueller = (refueller: { id: string; name: string; fuel: string; vol: string }) => {
      isEdit.value = true;
      currentRefuellerId.value = refueller.id;
      refuellerForm.name = refueller.name;
      refuellerForm.fuel = refueller.fuel;
      refuellerForm.vol = refueller.vol;
      showModal.value = true;
    };

    const submitRefueller = async () => {
      try {
        if (isEdit.value && currentRefuellerId.value) {
          await refuellerStore.updateRefueller(currentRefuellerId.value, refuellerForm);
          toast.success('Refueller updated successfully');
        } else {
          await refuellerStore.addRefueller(refuellerForm);
          toast.success('Refueller created successfully');
        }
      } catch {
        toast.error('Failed to save refueller');
      }
    };

    const deleteRefueller = async (id: string) => {
      try {
        await refuellerStore.removeRefueller(id);
        toast.success('Refueller deleted successfully');
      } catch {
        toast.error('Failed to delete refueller');
      }
    };

    const addIssueToRefueller = async () => {
      if (!currentRefuellerId.value) return;
      try {
        await refuellerStore.addIssueToRefueller(currentRefuellerId.value, selectedIssue.value);
        updateIssueOrder(currentRefuellerId.value);
        toast.success('Issue added successfully');
      } catch (error) {
        toast.error(error);
      }
    };

    const removeIssueFromRefueller = async (refuellerId: string, issueId: string) => {
      try {
        await refuellerStore.removeIssueFromRefueller(refuellerId, issueId);
        toast.success('Issue removed successfully');
      } catch {
        toast.error('Failed to remove issue');
      }
    };

    const onDragStart = (issue: { id: string }, fromRefuellerId: string) => {
      draggedIssue.value = { issueId: issue.id, fromRefuellerId };
    };

    const onDrop = async (toRefuellerId: string) => {
      if (!draggedIssue.value) return;

      const { issueId, fromRefuellerId } = draggedIssue.value;

      try {
        const success = await refuellerStore.moveIssue(fromRefuellerId, toRefuellerId, issueId);

        if (success) {
          toast.success('Issue moved successfully');
        } else {
          toast.error('Failed to move issue');
        }
      } catch (error) {
        console.error('Error moving issue:', error);
        toast.error('An error occurred while moving the issue');
      } finally {
        draggedIssue.value = null;
      }
    };

    const closeModal = () => {
      showModal.value = false;
      isEdit.value = false;
      currentRefuellerId.value = null;
    };

    refuellerStore.loadRefuellers();
    fetchIssues().then((res) => {
      if (res.success) issues.value = res.data;
    });

    const showAdModal = ref(false);
    const adTimer = ref(5);

    const startAdCountdown = () => {
      const interval = setInterval(() => {
        if (adTimer.value > 0) {
          adTimer.value--;
        } else {
          clearInterval(interval);
        }
      }, 1000);
    };

    const closeAdModal = () => {
      showAdModal.value = false;
    };

    onMounted(() => {
      setTimeout(() => {
        startAdCountdown();
        showAdModal.value = true;
      }, 30000);
    });


    return {
      refuellerStore,
      refuellerForm,
      issues,
      groupedRefuellers,
      showModal,
      isEdit,
      currentRefuellerId,
      availableIssues,
      selectedIssue,
      showCreateRefuellerModal,
      editRefueller,
      submitRefueller,
      deleteRefueller,
      addIssueToRefueller,
      removeIssueFromRefueller,
      closeModal,
      onDragStart,
      onDrop,
      navigateToIssue,
      showAdModal,
      adTimer,
      closeAdModal,
    };
  },
});
</script>