<template>
  <div class="menu-item" :class="{ 'highlighted': isHighlighted }">
    <h3>{{ menu.day }} - {{ menu.variant }}</h3>
    <ul class="dish-list" @dragover.prevent="onDragOver" @dragleave="onDragLeave" @drop="onDrop(menu.id)">
      <li
        v-for="dish in menu.dishes"
        :key="dish.id"
        draggable="true"
        @dragstart="onDragStart(dish, menu.id)"
        @click="navigateToDish(dish.id)"
        class="clickable-dish"
      >
        {{ dish.name }} ({{ dish.type }})
        <button class="remove-btn" @click.stop="removeDish(menu.id, dish.id)">×</button>
      </li>
      <li v-if="menu.dishes.length === 0" class="empty">
        Drop dishes here
      </li>
    </ul>
    <button @click="editMenu(menu)">Edit</button>
    <button @click="deleteMenu(menu.id)">Delete</button>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'MenuItem',
  props: {
    menu: {
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
    removeDish: {
      type: Function,
      required: true,
    },
    editMenu: {
      type: Function,
      required: true,
    },
    deleteMenu: {
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

    const onDrop = (menuId: string) => {
      isHighlighted.value = false;
      props.onDrop(menuId);
    };

    const navigateToDish = (dishId: string) => {
      router.push(`/dishes/${dishId}`);
    };

    return {
      isHighlighted,
      onDragOver,
      onDragLeave,
      onDrop,
      navigateToDish,
    };
  },
});
</script>

<style scoped>
.menu-item {
  border: 1px solid #ccc;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  width: 100%;
  transition: background-color 0.3s, border-color 0.3s;
}

.menu-item.highlighted {
  background-color: #f0f9f0;
  border-color: #4caf50;
}

.dish-list {
  min-height: 50px;
  padding: 10px;
  border: 1px dashed #ccc;
  transition: border-color 0.3s;
}

.dish-list .empty {
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

.clickable-dish {
  cursor: pointer;
  transition: background-color 0.2s;
}

.clickable-dish:hover {
  background-color: #f9f9f9;
}
</style>
