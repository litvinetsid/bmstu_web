<template>
  <div class="menu-page">
    <h1>Menus</h1>
    <button @click="showCreateMenuModal">Add New Menu</button>

    <div class="menu-grid">
      <div class="column" v-for="menu in groupedMenus" :key="menu.day">
        <div class="menu-item" v-for="item in menu.items" :key="item.id">
          <h3>{{ item.day }} - {{ item.variant }}</h3>
          <ul>
            <li
              v-for="dish in item.dishes"
              :key="dish.id"
              draggable="true"
              @dragstart="onDragStart(dish, item.id)"
              @dragover.prevent
              @drop="onDrop(item.id)"
            >
              {{ dish.name }} ({{ dish.type }})
            </li>
          </ul>
          <button @click="editMenu(item)">Edit</button>
          <button @click="deleteMenu(item.id)">Delete</button>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal">
      <h2>{{ isEdit ? 'Edit Menu' : 'Create Menu' }}</h2>
      <form @submit.prevent="submitMenu">
        <label>
          Day:
          <input v-model="menuForm.day" type="text" required />
        </label>
        <label>
          Variant:
          <input v-model="menuForm.variant" type="text" required />
        </label>
        <label>
          Add Dishes:
          <select v-model="selectedDish">
            <option v-for="dish in availableDishes" :value="dish.id" :key="dish.id">
              {{ dish.name }}
            </option>
          </select>
          <button type="button" @click="addDishToMenu">Add Dish</button>
        </label>
        <button @click="submitMenu">{{ isEdit ? 'Update' : 'Create' }}</button>
        <button @click="closeModal">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue';
import { useMenuStore } from '../store/menus';
import { fetchDishes } from '../services/dishService';
import MenuItem from '../components/MenuItem.vue';
import { toast } from 'vue3-toastify';

export default defineComponent({
  name: 'MenuPage',
  components: { MenuItem },
  setup() {
    const menuStore = useMenuStore();
    const dishes = ref<{ id: string; name: string; type: string }[]>([]);

    const menuForm = reactive({ day: '', variant: '' });
    const showModal = ref(false);
    const isEdit = ref(false);
    const currentMenuId = ref<string | null>(null);

    const selectedDish = ref<string>('');
    const availableDishes = computed(() => {
      if (!currentMenuId.value) return dishes.value;
      const currentMenu = menuStore.menus.find((menu) => menu.id === currentMenuId.value);
      return dishes.value.filter((dish) => !currentMenu?.dishes.some((d) => d.id === dish.id));
    });

    const groupedMenus = computed(() =>
      menuStore.menus.reduce((columns: { day: string; items: any[] }[], menu) => {
        const column = columns.find((col) => col.day === menu.day);
        if (!column) {
          columns.push({ day: menu.day, items: [menu] });
        } else {
          column.items.push(menu);
        }
        return columns;
      }, [])
    );

    const draggedDish = ref<{ dishId: string; fromMenuId: string } | null>(null);

    const showCreateMenuModal = () => {
      isEdit.value = false;
      menuForm.day = '';
      menuForm.variant = '';
      showModal.value = true;
    };

    const editMenu = (menu: { id: string; day: string; variant: string }) => {
      isEdit.value = true;
      currentMenuId.value = menu.id;
      menuForm.day = menu.day;
      menuForm.variant = menu.variant;
      showModal.value = true;
    };

    const submitMenu = async () => {
      try {
        if (isEdit.value && currentMenuId.value) {
          await menuStore.updateMenu(currentMenuId.value, menuForm);
          toast.success('Menu updated successfully');
        } else {
          await menuStore.addMenu(menuForm);
          toast.success('Menu created successfully');
        }
      } catch {
        toast.error('Failed to save menu');
      }
    };

    const deleteMenu = async (id: string) => {
      try {
        await menuStore.removeMenu(id);
        toast.success('Menu deleted successfully');
      } catch {
        toast.error('Failed to delete menu');
      }
    };

    const addDishToMenu = async () => {
      if (!currentMenuId.value) return;
      try {
        await menuStore.addDishToMenu(currentMenuId.value, selectedDish.value);
        toast.success('Dish added successfully');
      } catch {
        toast.error('Failed to add dish');
      }
    };

    const onDragStart = (dish: { id: string }, fromMenuId: string) => {
      draggedDish.value = { dishId: dish.id, fromMenuId };
    };

    const onDrop = async (toMenuId: string) => {
      if (!draggedDish.value) return;

      const { dishId, fromMenuId } = draggedDish.value;

      const success = await menuStore.moveDish(fromMenuId, toMenuId, dishId);
      if (success) {
        if (toast && toast.success) {
  toast.success('Dish moved successfully');
} else {
  console.error('Toast is not initialized or success method is missing');
}

      } else {
        toast.error('Failed to move dish');
      }

      draggedDish.value = null; // Очистить переменную после перемещения
    };


    const closeModal = () => {
      showModal.value = false;
      isEdit.value = false;
      currentMenuId.value = null;
    };

    menuStore.loadMenus();
    fetchDishes().then((res) => {
      if (res.success) dishes.value = res.data;
    });

    return {
      menuStore,
      menuForm,
      dishes,
      groupedMenus,
      showModal,
      isEdit,
      currentMenuId,
      availableDishes,
      selectedDish,
      showCreateMenuModal,
      editMenu,
      submitMenu,
      deleteMenu,
      addDishToMenu,
      closeModal,
      onDragStart,
      onDrop,
    };
  },
});
</script>

<style scoped>
.menu-page {
  padding: 20px;
}

.menu-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.menu-grid {
  display: flex;
  gap: 10px;
}

.column {
  flex: 1;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
