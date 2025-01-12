<template>
  <div class="dish-page">
    <h1>Dishes</h1>
    <button @click="showAddDishModal = true">Add New Dish</button>
    <div v-if="dishes.length">
      <DishItem v-for="dish in dishes" :key="dish.id" :dish="dish" />
    </div>
    <p v-else>No dishes available</p>

    <div v-if="showAddDishModal" class="modal">
      <h2>Add Dish</h2>
      <form @submit.prevent="addDish">
        <div>
          <label for="name">Name:</label>
          <input id="name" v-model="newDish.name" type="text" required />
        </div>
        <div>
          <label for="type">Type:</label>
          <select id="type" v-model="newDish.type" required>
            <option value="салат">Салат</option>
            <option value="первое">Первое</option>
            <option value="второе">Второе</option>
            <option value="напиток">Напиток</option>
            <option value="десерт">Десерт</option>
          </select>
        </div>
        <button type="submit">Add</button>
        <button type="button" @click="showAddDishModal = false">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { fetchDishes, createDish } from '../services/dishService';
import DishItem from '../components/DishItem.vue';

export default defineComponent({
  name: 'DishPage',
  components: { DishItem },
  setup() {
    const dishes = reactive<Array<{ id: string; name: string; type: string }>>([]);
    const newDish = reactive<{ name: string; type: string }>({ name: '', type: '' });
    const showAddDishModal = ref(false);

    const loadDishes = async () => {
      const response = await fetchDishes();
      if (response.success) {
        dishes.push(...(response.data as Array<{ id: string; name: string; type: string }>));
      }
    };

    const addDish = async () => {
      const response = await createDish(newDish);
      if (response.success) {
        dishes.push(response.data);
        showAddDishModal.value = false;
        newDish.name = '';
        newDish.type = '';
      } else {
        alert('Failed to add dish. Please try again.');
      }
    };

    onMounted(loadDishes);

    return { dishes, newDish, showAddDishModal, addDish };
  },
});
</script>

<style scoped>
.dish-page {
  padding: 20px;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal h2 {
  margin-top: 0;
}

.modal form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal form div {
  display: flex;
  flex-direction: column;
}

.modal button {
  margin-top: 10px;
}
</style>
