<template>
  <div class="home-page">
    <h1>Welcome to Restaurant Dashboard</h1>
    <p>
      <router-link to="/menus">Go to Menus</router-link>
    </p>
    <p>
      <router-link to="/dishes">Go to Dishes</router-link>
    </p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomePage',
};
</script>

<style scoped>
.home-page {
  text-align: center;
  margin-top: 50px;
}
</style>
