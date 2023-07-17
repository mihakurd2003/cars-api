<template>
  <div class="body">
    <transition name="block">
      <div class="wrapper" v-show="showForm">
        <div class="form-box login">
          <h2>Вход</h2>
          <form @submit.prevent="loginUser">
            <div class="input-login">
              <input type="text" required v-model="username">
              <label>Логин</label>
            </div>
            <div class="input-login">
              <input type="password" required v-model="password">
              <label>Пароль</label>
              <small v-if="response" v-for="msg in response" class="helper-text">
                {{ msg }}
              </small>
            </div>
            <button type="submit" class="btn-login">Войти</button>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "LoginPage",
  data() {
    return {
      username: '',
      password: '',
      response: '',
      showForm: false,
    }
  },
  methods: {
    ...mapActions(['car/login']),
    loginUser() {
      this.response = this['car/login']({
        username: this.username,
        password: this.password,
        router: this.$router,
      })
      this.response = this.response.then(result => {
        this.response = result
      })
    }
  },
  mounted() {
    this.showForm = true
  }
}
</script>

<style>

.wrapper {
  position: relative;
  width: 500px;
  height: 480px;
  margin: 170px auto 250px;
  background: transparent;
  border: 2px solid #3aa629;
  border-radius: 15px;
  backdrop-filter: blur(15px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-box {
  width: 100%;
  padding: 40px;
}

.form-box h2 {
  font-size: 2em;
  color: #dffcc2;
  text-align: center;
}

.input-login {
  position: relative;
  width: 100%;
  height: 50px;
  border-bottom: 2px solid;
  margin: 30px 0;
  color: #e5ffca;
}

.input-login label {
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  font-size: 1em;
  font-weight: 500;
  pointer-events: none;
  transition: .3s;
  color: #e5ffca;
}

.input-login input:focus ~ label,
.input-login input:valid ~ label {
  top: -5px;
}

.input-login input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-weight: 600;
  padding: 0 35px 0 5px;
  color: white;
}

.btn-login {
  width: 100%;
  height: 45px;
  background: rgba(194, 248, 118, 0.47);
  border: none;
  outline: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
  color: white;
  font-weight: 500;
}

.block-enter-active, .block-leave-active {
  transition: all 1s;
}

.block-enter, .block-leave-to {
  opacity: 0;
}
</style>