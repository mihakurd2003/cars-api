<template>
  <div>
    <div class="app-header">
      <strong class="logo">Кудряшов Михаил</strong>
      <transition name="dialog">
          <app-dialog v-model="jokeFormVisible" v-show="showDialog">
            <app-jokes></app-jokes>
          </app-dialog>
      </transition>
      <app-button
          @click="jokeFormVisible=true"
          class="btn-success"
      >Шутеечка
      </app-button>
      <app-button @click="onLogout">Выход</app-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      jokeFormVisible: false,
      showDialog: false,
    }
  },
  methods: {
    onLogout() {
      this.$store.commit('car/removeToken')
      this.$router.push('/login')
    }
  },
  mounted() {
    this.showDialog = true
  }
}
</script>

<style scoped>
.app-header {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.6);
}

.logo {
  font-size: 1.5em;
  user-select: none;
}

.dialog-enter-active, .dialog-leave-active {
  transition: all 1s;
}

.dialog-enter, .dialog-leave-to {
  opacity: 0;
}
</style>