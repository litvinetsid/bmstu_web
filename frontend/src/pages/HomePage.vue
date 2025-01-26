<template>
  <div class="home-page">
    <h1>Welcome to Restaurant Dashboard</h1>
    <p>
      <router-link to="/refuellers">Go to Refuellers</router-link>
    </p>
    <p>
      <router-link to="/issues">Go to Issues</router-link>
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
