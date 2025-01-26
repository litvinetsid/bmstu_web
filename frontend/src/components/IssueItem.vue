<template>
  <div class="issue-item card" @mouseover="hover = true" @mouseleave="hover = false">
    <button class="remove-btn" @click.stop="deleteIssue">×</button>
    <h4>{{ issue.name }}</h4>
    <p>Number: {{ issue.number }}</p>
    <p>Fuel: {{ issue.fuel }}</p>
    <p>Volume: {{ issue.volume }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'IssueItem',
  props: {
    issue: {
      type: Object as PropType<{
        id: string;
        name: string; 
        fuel: string; 
        volume: string; 
        number: string
      }>,
      required: true,
    },
  },
  emits: ['delete-issue'],
  setup(props, { emit }) {
    const hover = ref(false);

    const deleteIssue = () => {
      emit('delete-issue', props.issue.id);
    };

    return { hover, deleteIssue };
  },
});
</script>

<style scoped>
.issue-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  padding: 15px;
  transition: box-shadow 0.3s, transform 0.3s;
}

.issue-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-3px);
}

.issue-item h4 {
  margin-bottom: 8px;
  font-size: 18px;
  color: #333;
}

.issue-item p {
  margin: 0;
  color: #555;
  font-size: 14px;
}
</style>
