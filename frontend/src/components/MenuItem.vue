<template>
  <div class="menu-item">
    <h3>{{ menu.day }} - {{ menu.variant }}</h3>
    <ul>
      <li v-for="dish in menu.dishes" :key="dish.id">
        {{ dish.name }} ({{ dish.type }})
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'MenuItem',
  props: {
    menu: {
      type: Object as PropType<{
        id: string;
        day: string;
        variant: string;
        dishes: { id: string; name: string; type: string }[];
      }>,
      required: true,
    },
  },
  // TODO CОРТИРОВКА ПО ТИПУ БЛЮДА
});
</script>

<style scoped>
.menu-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}
</style>
