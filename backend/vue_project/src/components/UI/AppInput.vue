<template>
    <input :value="value" :type="type" :placeholder="placeholder" @input="updateInput">
</template>

<script>
export default {
  name: "AppInput",
  props: {
    value: [String, Number],
    placeholder: String,
    type: String,
  },
  methods: {
    updateInput(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped>

</style>