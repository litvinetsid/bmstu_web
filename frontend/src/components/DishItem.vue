<template>
  <div class="dish-item card" @mouseover="hover = true" @mouseleave="hover = false">
    <button class="remove-btn" @click.stop="deleteDish">×</button>
    <h4>{{ dish.name }}</h4>
    <p>Type: {{ dish.type }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'DishItem',
  props: {
    dish: {
      type: Object as PropType<{
        id: string;
        name: string;
        type: string;
      }>,
      required: true,
    },
  },
  emits: ['delete-dish'],
  setup(props, { emit }) {
    const hover = ref(false);

    const deleteDish = () => {
      emit('delete-dish', props.dish.id);
    };

    return { hover, deleteDish };
  },
});
</script>

<style scoped>
.dish-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  padding: 15px;
  transition: box-shadow 0.3s, transform 0.3s;
}

.dish-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-3px);
}

.dish-item h4 {
  margin-bottom: 8px;
  font-size: 18px;
  color: #333;
}

.dish-item p {
  margin: 0;
  color: #555;
  font-size: 14px;
}
</style>
