<template>
  <div>
    <transition name="dialog">
      <div v-show="showDialog">
        <form class="app-form" @submit.prevent="addCar">
        <h3>Добавить автомобиль</h3>
        <small class="helper-text" v-if="($v.car.brand.$dirty && !$v.car.brand.maxLength)">
          Длина превышает 50 символов
        </small>
        <app-input required
                   :type="type"
                   :placeholder="placeholder.brand"
                   :class="['app-input', {'invalid-wiggle': ($v.car.brand.$dirty && !$v.car.brand.maxLength)}]"
                   v-model.trim="car.brand"
        />

        <small class="helper-text" v-if="($v.car.model.$dirty && !$v.car.model.maxLength)">
          Длина превышает 50 символов
        </small>
        <app-input required
                   :type="type"
                   :placeholder="placeholder.model"
                   :class="['app-input', {'invalid-wiggle': ($v.car.model.$dirty && !$v.car.model.maxLength)}]"
                   v-model.trim="car.model"
        />

        <small class="helper-text" v-if="($v.car.price.$dirty && !$v.car.price.minValue)">
          Значение должно быть положительным
        </small>
        <app-input required
                   :type="type"
                   :placeholder="placeholder.price"
                   :class="['app-input', {'invalid-wiggle': ($v.car.price.$dirty && !$v.car.price.minValue)}]"
                   v-model.number="car.price"
        />
        <select required v-model.number="car.country" class="app-input">
          <option value="" disabled>Страны</option>
          <option
              v-for="country in countries"
              :key="country.id"
              :value="country.id"
          >
            {{ country.name }}
          </option>
        </select>

        <small class="helper-text" v-if="($v.car.carParts.$dirty && !$v.car.carParts.validFormat) || error">
          Некорректный ввод: нужны числа(id) через запятую или id не найден
        </small>
        <app-input required
                   :type="type"
                   :placeholder="placeholder.carParts"
                   :class="['app-input', {'invalid-wiggle': ($v.car.carParts.$dirty && !$v.car.carParts.validFormat) || error}]"
                   v-model.trim="car.carParts"
        />
        <app-button class="btn-success">Добавить</app-button>
      </form>
      </div>
    </transition>
  </div>
</template>

<script>
import {maxLength, minValue} from "vuelidate/lib/validators";

export default {
  name: "CreateCar",
  props: {
    countries: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      car: {
        brand: '',
        model: '',
        price: '',
        country: '',
        carParts: '',
      },
      placeholder: {
        brand: 'Марка',
        model: 'Модель',
        price: 'Цена',
        country: 'Страна производства',
        carParts: 'Запчасти',
      },
      type: 'text',
      error: '',
      showDialog: false
    }
  },
  validations: {
    car: {
      brand: {maxLength: maxLength(50)},
      model: {maxLength: maxLength(50)},
      price: {minValue: minValue(0)},
      carParts: {
        validFormat: val => /^\d+(,\d+)*$/.test(val)
      },
    }
  },
  methods: {
    addCar() {
      if (this.$v.car.$invalid) {
        this.$v.car.$touch()
        return
      }
      const car = JSON.parse(JSON.stringify(this.car))
      car.spare_parts = this.car.carParts.split(',')
      this.$myAxios.post('api/cars/', car).then((response) => {
        this.$emit('create', response.data)
        Object.keys(this.car).forEach((key) => {
          this.car[key] = ''
        })
      }).catch(reject => {
        this.error = reject.response.data.spare_parts
      })

    }
  },
  mounted() {
    this.showDialog = true
  }
}
</script>

<style scoped>

.dialog-enter-active, .dialog-leave-active {
  transition: all 1s;
}

.dialog-enter, .dialog-leave-to {
  opacity: 0;
}
</style>