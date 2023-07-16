<template>
  <div class="body">
    <app-header></app-header>
    <div class="main-block">
      <app-content></app-content>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import AppContent from "@/components/AppContent";

export default {
  name: "CarPage",
  components: {
    AppContent,
    AppHeader
  }
}
</script>

<style scoped>

</style>