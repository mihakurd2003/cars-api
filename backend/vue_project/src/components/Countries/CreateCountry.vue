<template>
  <div>
    <transition name="dialog">
      <div v-show="showDialog">
        <form class="app-form" @submit.prevent="addCountry">
          <h3>Добавить страну</h3>

          <small class="helper-text" v-if="($v.country.name.$dirty && !$v.country.name.maxLength)">
            Длина превышает 30 символов
          </small>
          <app-input required
                     :type="type"
                     :placeholder="placeholder.name"
                     :class="['app-input', {'invalid-wiggle': ($v.country.name.$dirty && !$v.country.name.maxLength)}]"
                     v-model.trim="country.name"
          />

          <small class="helper-text" v-if="($v.country.capital.$dirty && !$v.country.capital.maxLength)">
            Длина превышает 30 символов
          </small>
          <app-input required
                     :type="type"
                     :placeholder="placeholder.capital"
                     :class="['app-input', {'invalid-wiggle': ($v.country.capital.$dirty && !$v.country.capital.maxLength)}]"
                     v-model.trim="country.capital"
          />

          <small class="helper-text" v-if="($v.country.phoneCode.$dirty && !$v.country.phoneCode.minValue)">
            Значение должно быть положительным
          </small>
          <app-input required
                     :type="type"
                     :placeholder="placeholder.phoneCode"
                     :class="['app-input', {'invalid-wiggle': ($v.country.phoneCode.$dirty && !$v.country.phoneCode.minValue)}]"
                     v-model.number="country.phoneCode"
          />

          <app-button class="btn-success">Добавить</app-button>
          <small class="helper-text" v-if="error">
            Уникальность записей нарушена
          </small>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import {maxLength, minValue} from "vuelidate/lib/validators";

export default {
  name: "CreateCountry",

  data() {
    return {
      country: {
        name: '',
        capital: '',
        phoneCode: '',
      },
      placeholder: {
        name: 'Название',
        capital: 'Столица',
        phoneCode: 'Телефонный код',
      },
      type: 'text',
      showDialog: false,
      error: '',
    }
  },
  validations: {
    country: {
      name: {maxLength: maxLength(30)},
      capital: {maxLength: maxLength(30)},
      phoneCode: {minValue: minValue(0)},
    }
  },
  methods: {
    addCountry() {
      if (this.$v.country.$invalid) {
        this.$v.country.$touch()
        return
      }
      const country = JSON.parse(JSON.stringify(this.country))
      country.phone_code = this.country.phoneCode
      this.$myAxios.post('api/countries/', country).then((response) => {
        this.$emit('create', response.data)
        Object.keys(this.country).forEach((key) => {
          this.country[key] = ''
        })
      }).catch(reject => {
        this.error = reject.response.data
      })
    },
  },
  mounted() {
    this.showDialog = true
  }
}
</script>

<style scoped>
.helper-text {
  margin-top: 5px;
}

.dialog-enter-active, .dialog-leave-active {
  transition: all 1s;
}

.dialog-enter, .dialog-leave-to {
  opacity: 0;
}
</style>