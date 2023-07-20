<template>
  <div class="body">
    <transition name="block">
      <div class="wrapper" v-show="showForm">

        <div class="form-box login" v-if="model === 'cars'">
          <h2>Изменить автомобиль</h2>
          <form @submit.prevent="changeCar">
            <div class="input-login">
              <app-input required
                         :type="type"
                         v-model.trim="car.brand"
                         :class="{'invalid-wiggle': ($v.car.brand.$dirty && !$v.car.brand.maxLength)}"
              />
              <label>{{ placeholder.car.brand }}</label>
              <small class="helper-text" v-if="($v.car.brand.$dirty && !$v.car.brand.maxLength)">
                Длина превышает 50 символов
              </small>
            </div>
            <div class="input-login">
              <app-input required
                         :type="type"
                         v-model.trim="car.model"
                         :class="{'invalid-wiggle': ($v.car.model.$dirty && !$v.car.model.maxLength)}"
              />
              <label>{{ placeholder.car.model }}</label>
              <small class="helper-text" v-if="($v.car.model.$dirty && !$v.car.model.maxLength)">
                Длина превышает 50 символов
              </small>
            </div>
            <div class="input-login">
              <app-input required
                         :type="type"
                         v-model.number="car.price"
                         :class="{'invalid-wiggle': ($v.car.price.$dirty && !$v.car.price.minValue)}"
              />
              <label>{{ placeholder.car.price }}</label>
              <small class="helper-text" v-if="($v.car.price.$dirty && !$v.car.price.minValue)">
                Значение должно быть положительным
              </small>
            </div>
            <select required v-model.number="car.country" class="app-input">
              <option disabled>Выберите из списка</option>
              <option
                  v-for="country in objects.countries"
                  :key="country.id"
                  :value="country.id"
              >
                {{ country.name }}
              </option>
            </select>
            <div class="input-login" style="border-bottom: none">
              <select
                  required
                  multiple="multiple"
                  :size="5"
                  v-model="car.carParts"
                  style="height: auto; margin-top: -10px"
              >
                <option style="color: #2c2b2b" value="" disabled>Запчасти</option>
                <option
                    v-for="carPart in objects['car-parts']"
                    :key="carPart.id"
                    :value="carPart.id"
                >
                  {{ carPart.name }}
                </option>
              </select>
            </div>
            <app-button class="btn-success">Изменить</app-button>
          </form>
        </div>

        <div class="form-box login" v-if="model === 'car-parts'">
          <h2>Изменить запчасть</h2>
          <form @submit.prevent="changeCarPart">
            <div class="input-login">
              <app-input required
                         :type="type"
                         v-model.trim="carPart.name"
                         :class="{'invalid-wiggle': ($v.carPart.name.$dirty && !$v.carPart.name.maxLength)}"
              />
              <label>{{ placeholder.carPart.name }}</label>
              <small class="helper-text" v-if="($v.carPart.name.$dirty && !$v.carPart.name.maxLength)">
                Длина превышает 100 символов
              </small>
            </div>
            <div class="input-login">
              <app-input required
                         :type="type"
                         v-model.trim="carPart.brand"
                         :class="{'invalid-wiggle': ($v.carPart.brand.$dirty && !$v.carPart.brand.maxLength)}"
              />
              <label>{{ placeholder.carPart.brand }}</label>
              <small class="helper-text" v-if="($v.carPart.brand.$dirty && !$v.carPart.brand.maxLength)">
                Длина превышает 30 символов
              </small>
            </div>
            <div class="input-login">
              <app-input required
                         :type="type"
                         v-model.number="carPart.price"
                         :class="{'invalid-wiggle': ($v.carPart.price.$dirty && !$v.carPart.price.minValue)}"
              />
              <label>{{ placeholder.carPart.price }}</label>
              <small class="helper-text" v-if="($v.carPart.price.$dirty && !$v.carPart.price.minValue)">
                Значение должно быть положительным
              </small>
            </div>
            <select required v-model="carPart.country" class="app-input">
              <option disabled>Выберите из списка</option>
              <option
                  v-for="country in objects.countries"
                  :key="country.id"
                  :value="country.id"
              >
                {{ country.name }}
              </option>
            </select>
            <app-button class="btn-success">Изменить</app-button>
          </form>
        </div>

        <div class="form-box login" v-if="model === 'countries'">
          <h2>Изменить страну</h2>
          <form class="app-form" @submit.prevent="changeCountry">
            <div class="input-login">
              <app-input required
                         :type="type"
                         v-model.trim="country.name"
                         :class="{'invalid-wiggle': ($v.country.name.$dirty && !$v.country.name.maxLength)}"
              />
              <label>{{ placeholder.country.name }}</label>
              <small class="helper-text" v-if="($v.country.name.$dirty && !$v.country.name.maxLength)">
                Длина превышает 30 символов
              </small>
            </div>
            <div class="input-login">
              <app-input required
                         :type="type"
                         v-model.trim="country.capital"
                         :class="{'invalid-wiggle': ($v.country.capital.$dirty && !$v.country.capital.maxLength)}"
              />
              <label>{{ placeholder.country.capital }}</label>
              <small class="helper-text" v-if="($v.country.capital.$dirty && !$v.country.capital.maxLength)">
                Длина превышает 30 символов
              </small>
            </div>
            <div class="input-login">
              <app-input required
                         :type="type"
                         v-model.number="country.phoneCode"
                         :class="{'invalid-wiggle': ($v.country.phoneCode.$dirty && !$v.country.phoneCode.minValue)}"
              />
              <label>{{ placeholder.country.phoneCode }}</label>
              <small class="helper-text" v-if="($v.country.phoneCode.$dirty && !$v.country.phoneCode.minValue)">
                Значение должно быть положительным
              </small>
            </div>
            <app-button class="btn-success">Изменить</app-button>
          </form>
        </div>

      </div>
    </transition>
  </div>
</template>

<script>
import {maxLength, minValue} from 'vuelidate/lib/validators';

export default {
  name: "ChangePage",
  props: ['model', 'id'],
  data() {
    return {
      car: {
        brand: '',
        model: '',
        price: '',
        country: '',
        carParts: [],
      },
      carPart: {
        name: '',
        brand: '',
        price: '',
        country: '',
      },
      country: {
        name: '',
        capital: '',
        phoneCode: '',
      },
      placeholder: {
        car: {
          brand: 'Марка',
          model: 'Модель',
          price: 'Цена',
          country: 'Страна производства',
          carParts: 'Запчасти',
        },
        carPart: {
          name: 'Название',
          brand: 'Марка',
          price: 'Цена',
          country: 'Страна производства',
        },
        country: {
          name: 'Название',
          capital: 'Столица',
          phoneCode: 'Телефонный код',
        },
      },
      type: 'text',
      objects: {},
      error: '',
      showForm: false
    }
  },
  validations: {
    car: {
      brand: {maxLength: maxLength(50)},
      model: {maxLength: maxLength(50)},
      price: {minValue: minValue(0)},
    },
    carPart: {
      name: {maxLength: maxLength(100)},
      brand: {maxLength: maxLength(30)},
      price: {minValue: minValue(0)},
    },
    country: {
      name: {maxLength: maxLength(30)},
      capital: {maxLength: maxLength(30)},
      phoneCode: {minValue: minValue(0)},
    }
  },
  methods: {
    changeCar() {
      if (this.$v.car.$invalid) {
        this.$v.car.$touch()
        return
      }
      const car = JSON.parse(JSON.stringify(this.car))
      car.spare_parts = this.car.carParts
      this.$myAxios.put(`api/cars/${this.id}/`, car).then(() => {
        Object.keys(this.car).forEach((key) => {
          this.car[key] = ''
        })
        this.$router.push('/')
      }).catch(reject => {
        this.error = reject.response.data.spare_parts
      })
    },
    changeCarPart() {
      if (this.$v.carPart.$invalid) {
        this.$v.carPart.$touch()
        return
      }
      const carPart = JSON.parse(JSON.stringify(this.carPart))
      this.$myAxios.put(`api/car-parts/${this.id}/`, carPart).then(() => {
        Object.keys(this.carPart).forEach((key) => {
          this.carPart[key] = ''
        })
        this.$router.push('/')
      })
    },
    changeCountry() {
      if (this.$v.country.$invalid) {
        this.$v.country.$touch()
        return
      }
      const country = JSON.parse(JSON.stringify(this.country))
      country.phone_code = this.country.phoneCode
      this.$myAxios.put(`api/countries/${this.id}/`, country).then(() => {
        Object.keys(this.country).forEach((key) => {
          this.country[key] = ''
        })
        this.$router.push('/')
      })
    },
    refactorObj(object) {
      if (this.model === 'cars') {
        object.carParts = object.spare_parts
      }
      if (this.model === 'countries') {
        object.phoneCode = object.phone_code
      }
      return object
    }
  },
  beforeMount() {
    this.$store.dispatch('car/getList', 'countries')
    this.$store.dispatch('car/getList', 'car-parts')
    this.objects = this.$store.getters["car/getData"]
    console.log(this.objects)
  },
  mounted() {
    if (this.model === 'cars') {
      this.$myAxios.get(`api/${this.model}/${this.id}/`).then(response => {
        this.car = this.refactorObj(response.data)
      })
    } else if (this.model === 'car-parts') {
      this.$myAxios.get(`api/${this.model}/${this.id}/`).then(response => {
        this.carPart = this.refactorObj(response.data)
      })
    } else {
      this.$myAxios.get(`api/${this.model}/${this.id}/`).then(response => {
        this.country = this.refactorObj(response.data)
      })
    }
    this.showForm = true
  }
}
</script>

<style scoped>

.body {
  min-height: 80vh !important;
}

.wrapper {
  width: 570px !important;
  height: 610px !important;
}

.form-box h2 {
  margin: 0 auto 20px;
}


select {
  border: 1px solid #ffffff;
  background-color: transparent;
  color: #000000;
  font-size: 1em;
  font-weight: 500;
  height: 35px;
  width: -webkit-fill-available;
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

.app-btn {
  margin: 30px 190px 0 180px !important;
}

.block-enter-active, .block-leave-active {
  transition: all 1s;
}

.block-enter, .block-leave-to {
  opacity: 0;
}


</style>