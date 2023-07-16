<template>
  <div>
    <transition name="dialog">
      <div v-show="showDialog">
        <form class="app-form" @submit.prevent="addCarPart">
          <h3>Добавить запчасть</h3>
          <small class="helper-text" v-if="($v.carPart.name.$dirty && !$v.carPart.name.maxLength)">
            Длина превышает 100 символов
          </small>
          <app-input required
                     :type="type"
                     :placeholder="placeholder.name"
                     :class="['app-input', {'invalid-wiggle': ($v.carPart.name.$dirty && !$v.carPart.name.maxLength)}]"
                     v-model.trim="carPart.name"
          />

          <small class="helper-text" v-if="($v.carPart.brand.$dirty && !$v.carPart.brand.maxLength)">
            Длина превышает 30 символов
          </small>
          <app-input required
                     :type="type"
                     :placeholder="placeholder.brand"
                     :class="['app-input', {'invalid-wiggle': ($v.carPart.brand.$dirty && !$v.carPart.brand.maxLength)}]"
                     v-model.trim="carPart.brand"
          />

          <small class="helper-text" v-if="($v.carPart.price.$dirty && !$v.carPart.price.maxLength)">
            Значение должно быть положительным
          </small>
          <app-input required
                     :type="type"
                     :placeholder="placeholder.price"
                     :class="['app-input', {'invalid-wiggle': ($v.carPart.price.$dirty && !$v.carPart.price.minValue)}]"
                     v-model.number="carPart.price"
          />
          <select required v-model="carPart.country" class="app-input">
            <option value="" disabled>Страны</option>
            <option
                v-for="country in countries"
                :key="country.id"
                :value="country.id"
            >
              {{ country.name }}
            </option>
          </select>
          <app-button class="btn-success">Добавить</app-button>
        </form>
      </div>
    </transition>
  </div>
</template>

<script>
import {maxLength, minValue} from "vuelidate/lib/validators";

export default {
  name: "CarPartCreate",
  props: {
    countries: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      carPart: {
        name: '',
        brand: '',
        price: '',
        country: '',
      },
      placeholder: {
        name: 'Название',
        brand: 'Марка',
        price: 'Цена',
        country: 'Страна производства',
      },
      type: 'text',
      showDialog: false
    }
  },
  validations: {
    carPart: {
      name: {maxLength: maxLength(100)},
      brand: {maxLength: maxLength(30)},
      price: {minValue: minValue(0)},
    },
  },
  methods: {
    addCarPart() {
      if (this.$v.carPart.$invalid) {
        this.$v.carPart.$touch()
        return
      }
      this.$myAxios.post('api/car-parts/', JSON.parse(JSON.stringify(this.carPart))).then((response) => {
        this.$emit('create', response.data)
        Object.keys(this.carPart).forEach((key) => {
          this.carPart[key] = ''
        })
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