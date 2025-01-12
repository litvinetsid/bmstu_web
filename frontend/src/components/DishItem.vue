<template>
  <div class="dish-item">
    <h4>{{ dish.name }}</h4>
    <p>Type: {{ dish.type }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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
});
</script>

<style scoped>
.dish-item {
  border: 1px solid #eee;
  padding: 8px;
  margin: 5px 0;
  border-radius: 4px;
}
</style>
