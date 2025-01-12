<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
   name: "App",
   setup() {
    const notify = () => {
      toast("Wow so easy !", {
        autoClose: 1000,
      }); // ToastOptions
    }
    return { notify };
   }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
