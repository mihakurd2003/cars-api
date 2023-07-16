<template>
  <button class="app-btn" v-on="$listeners">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "AppButton"
}
</script>

<style scoped>
.app-btn {
  background-color: #e1eff8;
  border: 1px solid #CCCCCC;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
  transition: border 0.2s linear 0s, box-shadow 0.2s linear 0s;
  border-radius: 8px;
  color: #555555;
  display: block;
  width: 120px;
  font-size: 14px;
  text-align: center;
  line-height: 20px;
  padding: 4px 8px;
  vertical-align: middle;
  text-decoration: none;
}

.app-btn:hover, .app-btn:focus {
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(82, 168, 236, 0.6);
  outline: 0 none;
}
</style>