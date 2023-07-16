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
      <app-button class="exit-btn" @click="onLogout">Выход</app-button>
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
  backdrop-filter: blur(5px);
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.6);
}

.logo {
  font-size: 1.5em;
  user-select: none;
}

.exit-btn {
  background-color: #eec2c2 !important;
  border: 1px solid #ec0c0c !important;
  font-size: 1em;
}

.exit-btn:hover, .exit-btn:focus {
  border-color: rgb(236, 12, 12) !important;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgb(224, 17, 65) !important;
}

.dialog-enter-active, .dialog-leave-active {
  transition: all 1s;
}

.dialog-enter, .dialog-leave-to {
  opacity: 0;
}
</style>