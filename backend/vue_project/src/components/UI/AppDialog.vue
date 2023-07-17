<template>
  <div class="app-dialog" v-if="value === true" @click="$emit('input', false)">
    <div class="app-dialog--content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppDialog",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.app-dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  z-index: 1000;
}

.app-dialog--content {
  margin: auto;
  background: white;
  border-radius: 10px;
  min-height: 80px;
  min-width: 350px;
  padding: 20px;
}

</style>