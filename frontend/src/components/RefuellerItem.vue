<template>
  <div class="refueller-item" :class="{ 'highlighted': isHighlighted }">
    <h3>{{ refueller.day }} - {{ refueller.variant }}</h3>
    <ul class="issue-list" @dragover.prevent="onDragOver" @dragleave="onDragLeave" @drop="onDrop(refueller.id)">
      <li
        v-for="issue in refueller.issues"
        :key="issue.id"
        draggable="true"
        @dragstart="onDragStart(issue, refueller.id)"
        @click="navigateToIssue(issue.id)"
        class="clickable-issue"
      >
        {{ issue.name }} ({{ issue.type }})
        <button class="remove-btn" @click.stop="removeIssue(refueller.id, issue.id)">×</button>
      </li>
      <li v-if="refueller.issues.length === 0" class="empty">
        Drop issues here
      </li>
    </ul>
    <button @click="editRefueller(refueller)">Edit</button>
    <button @click="deleteRefueller(refueller.id)">Delete</button>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'RefuellerItem',
  props: {
    refueller: {
      type: Object,
      required: true,
    },
    onDragStart: {
      type: Function,
      required: true,
    },
    onDrop: {
      type: Function,
      required: true,
    },
    removeIssue: {
      type: Function,
      required: true,
    },
    editRefueller: {
      type: Function,
      required: true,
    },
    deleteRefueller: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const isHighlighted = ref(false);

    const onDragOver = () => {
      isHighlighted.value = true;
    };

    const onDragLeave = () => {
      isHighlighted.value = false;
    };

    const onDrop = (refuellerId: string) => {
      isHighlighted.value = false;
      props.onDrop(refuellerId);
    };

    const navigateToIssue = (issueId: string) => {
      router.push(`/issues/${issueId}`);
    };

    return {
      isHighlighted,
      onDragOver,
      onDragLeave,
      onDrop,
      navigateToIssue,
    };
  },
});
</script>

<style scoped>
.refueller-item {
  border: 1px solid #ccc;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  width: 100%;
  transition: background-color 0.3s, border-color 0.3s;
}

.refueller-item.highlighted {
  background-color: #f0f9f0;
  border-color: #4caf50;
}

.issue-list {
  min-height: 50px;
  padding: 10px;
  border: 1px dashed #ccc;
  transition: border-color 0.3s;
}

.issue-list .empty {
  color: gray;
  text-align: center;
  font-style: italic;
}

.remove-btn {
  background: transparent;
  border: none;
  color: red;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 10px;
  padding: 0;
}

.remove-btn:hover {
  color: darkred;
}

.clickable-issue {
  cursor: pointer;
  transition: background-color 0.2s;
}

.clickable-issue:hover {
  background-color: #f9f9f9;
}
</style>
