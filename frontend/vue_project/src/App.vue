<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
}
</script>

<style>
@import "./styles/index.css";

.body {
  min-height: 100vh;
  background: url("images/cover.jpg") no-repeat;
  background-size: cover;
  padding: 5px;
}

.main-block {
  width: 65%;
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px 5px 10px 5px;
  min-height: 100vh;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.4);
  overflow: auto;
}

</style>
