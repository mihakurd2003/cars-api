<template>
  <div>
    <div class="app-actions choose-link">
      <a class="inline-link" @click="activeTab = 'cars'">Авто</a>
      <a class="inline-link" @click="activeTab = 'carParts'">Запчасти</a>
      <a class="inline-link" @click="activeTab = 'countries'">Страны</a>
    </div>
    <div class="main-block">
      <div>
        <div v-if="activeTab === 'cars'">
          <app-dialog v-model="createFormVisible">
            <create-car @create="addObj" :countries="countries"></create-car>
          </app-dialog>
          <div class="app-actions">
            <app-select v-model="selectedSort" :options="sortOptions.car"></app-select>
            <app-input class="search-input" v-model="searchText"></app-input>
            <app-button
                @click="createFormVisible=true"
                style="margin-left: auto; margin-right: 10px"
                class="btn-success"
            >Добавить
            </app-button>
          </div>
          <transition name="block">
            <cars-list :cars="sortedAndSearched" @remove="removeObj"></cars-list>
          </transition>
        </div>

        <div v-else-if="activeTab === 'carParts'">
          <app-dialog v-model="createFormVisible">
            <car-part-create @create="addObj" :countries="countries"></car-part-create>
          </app-dialog>
          <div class="app-actions">
            <app-select v-model="selectedSort" :options="sortOptions.carPart"></app-select>
            <app-input class="search-input" v-model="searchText"></app-input>
            <app-button
                @click="createFormVisible=true"
                style="margin-left: auto; margin-right: 10px"
                class="btn-success"
            >Добавить
            </app-button>
          </div>
          <transition name="block">
            <car-parts-list :carParts="sortedAndSearched" @remove="removeObj"></car-parts-list>
          </transition>
        </div>

        <div v-else>
          <app-dialog v-model="createFormVisible">
            <create-country @create="addObj"></create-country>
          </app-dialog>
          <div class="app-actions">
            <app-select v-model="selectedSort" :options="sortOptions.country"></app-select>
            <app-input class="search-input" v-model="searchText"></app-input>
            <app-button
                @click="createFormVisible=true"
                style="margin-left: auto; margin-right: 10px"
                class="btn-success"
            >Добавить
            </app-button>
          </div>
          <transition name="block">
            <countries-list :countries="sortedAndSearched" @remove="removeObj"></countries-list>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateCar from "@/components/Cars/CreateCar";
import CarsList from "@/components/Cars/CarsList";
import CarPartCreate from "@/components/CarParts/CarPartCreate";
import CarPartsList from "@/components/CarParts/CarPartsList";
import CreateCountry from "@/components/Countries/CreateCountry";
import CountriesList from "@/components/Countries/CountriesList";

export default {
  name: "AppContent",
  components: {
    CountriesList,
    CreateCountry,
    CreateCar, CarsList,
    CarPartCreate, CarPartsList,
  },
  data() {
    return {
      activeTab: 'cars',
      cars: [],
      carParts: [],
      countries: [],
      list: [],
      createFormVisible: false,
      selectedSort: '',
      searchText: '',
      sortOptions: {
        car: [
          {value: 'id', name: 'По идентификатору'},
          {value: 'brand', name: 'По марке'},
          {value: 'model', name: 'По модели'},
          {value: 'price', name: 'По цене'},
          {value: 'countryName', name: 'По стране'},
        ],
        carPart: [
          {value: 'id', name: 'По идентификатору'},
          {value: 'name', name: 'По названию'},
          {value: 'brand', name: 'По марке'},
          {value: 'price', name: 'По цене'},
          {value: 'countryName', name: 'По стране'},
        ],
        country: [
          {value: 'id', name: 'По идентификатору'},
          {value: 'name', name: 'По названию'},
          {value: 'capital', name: 'По столице'},
          {value: 'phoneCode', name: 'По телефонному коду'},
        ]
      }
    }
  },
  computed: {
    sortedObjects() {
      this[this.activeTab] = this.refactorObjects(this[this.activeTab]);
      return [...this[this.activeTab]].sort((attr1, attr2) => {
        if (attr1[this.selectedSort] > attr2[this.selectedSort]) {
          return 1;
        }
        if (attr1[this.selectedSort] < attr2[this.selectedSort]) {
          return -1;
        }
        return 0;
      })
    },
    sortedAndSearched() {
      if (this.activeTab === 'cars') {
        return this.sortedObjects.filter(car => {
          return car.brand.toLowerCase().includes(this.searchText.toLowerCase())
              || car.model.toLowerCase().includes(this.searchText.toLowerCase())
              || car.price.toString().includes(this.searchText)
        })
      }
      if (this.activeTab === 'carParts') {
        return this.sortedObjects.filter(carPart => {
          return carPart.name.toLowerCase().includes(this.searchText.toLowerCase())
              || carPart.brand.toLowerCase().includes(this.searchText.toLowerCase())
              || carPart.price.toString().includes(this.searchText)
        })
      }
      return this.sortedObjects.filter(country => {
        return country.name.toLowerCase().includes(this.searchText.toLowerCase())
            || country.capital.toLowerCase().includes(this.searchText.toLowerCase())
            || country.phoneCode.toString().includes(this.searchText)
      })
    }
  },
  methods: {
    addObj(obj) {
      this[this.activeTab].push(obj)
      this.createFormVisible = false
    },
    removeObj(obj) {
      if (confirm('Вы действительно хотите удалить запись?')) {

        if (this.activeTab === 'cars') {
          this.$myAxios.delete(`api/cars/${obj.id}/`).then(() => {
            this.cars = this.cars.filter(car => car.id !== obj.id)
          }).catch(reject => {
            console.log(reject.response.data)
          })
        } else if (this.activeTab === 'carParts') {
          this.$myAxios.delete(`api/car-parts/${obj.id}/`).then(() => {
            this.carParts = this.carParts.filter(carPart => carPart.id !== obj.id)
          }).catch(reject => {
            console.log(reject.response.data)
          })
        } else {
          this.$myAxios.delete(`api/countries/${obj.id}/`).then(() => {
            this.countries = this.countries.filter(country => country.id !== obj.id)
          }).catch(reject => {
            console.log(reject.response.data)
          })
        }

      }
    },
    refactorObjects(objects) {
      // Для нормального отображения и добавления записей с полями, которые связаны с другими моделями
      // И чтобы не было конфликтов бэкенда и фронтенда в названиях полей

      return objects.map(obj => {
        if (this.activeTab === 'countries') {
          obj.phoneCode = obj.phone_code || obj.phoneCode
        }

        if (['cars', 'carParts'].includes(this.activeTab)) {
          const country = this.countries.find(country => {
            return country.id === obj.country || country.id === obj.country.id
          })
          obj.country = country || obj.country
          obj.countryName = country ? country.name : ''
        }

        if (this.activeTab === 'cars') {
          obj.carParts = obj.spare_parts || obj.carParts;
          const updatedCarParts = [];
          for (let part of this.carParts) {
            if (obj.carParts.includes(part.id)) {
              updatedCarParts.push(part.name)
            }
          }
          obj.carParts = updatedCarParts.join(',')
        }

        return obj
      })
    },
  },
  mounted() {
    this.$myAxios.get('api/cars').then(response => {
      this.cars = response.data
    })

    this.$myAxios.get('api/car-parts').then(response => {
      this.carParts = response.data
    })

    this.$myAxios.get('api/countries').then(response => {
      this.countries = response.data
    })
  }
}
</script>

<style scoped>

.main-block {

}

.app-actions {
  display: flex;
  margin-top: 15px;
}

.choose-link {
  justify-content: space-around;
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
  width: 65%;
  padding: 10px 5px 10px 5px;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.4);
}

.search-input {
  width: 100%;
  margin: 0 20px 0 20px;
  border-radius: 5px;
  border: 1px solid #bdbdbd;
  font-size: 16px;
  outline: 0;
}

.block-enter-active, .block-leave-active {
  transition: all .4s;
}

.block-enter, .block-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

</style>