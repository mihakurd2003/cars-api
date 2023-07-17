<template>
  <div>
    <div v-show="cars.length > 0">
      <div>
        <table id="app-table">
          <caption>Автомобили</caption>
          <thead is="transition-group" name="cars-list">
          <tr>
            <th>id</th>
            <th>Марка</th>
            <th>Модель</th>
            <th>Цена</th>
            <th>Страна производства</th>
            <th>Запчасти</th>
          </tr>
          </thead>

          <tbody is="transition-group" name="cars-list">
          <tr v-for="car in cars" :key="car.id">

            <td>
              <router-link class="inline-link" :to="{name: 'change', params: {model: 'cars', id: car.id}}">
                {{ car.id }}
              </router-link>
            </td>
            <td>
              <router-link class="inline-link" :to="{name: 'change', params: {model: 'cars', id: car.id}}">
                {{ car.brand }}
              </router-link>
            </td>
            <td>
              <router-link class="inline-link" :to="{name: 'change', params: {model: 'cars', id: car.id}}">
                {{ car.model }}
              </router-link>
            </td>
            <td>
              <router-link class="inline-link" :to="{name: 'change', params: {model: 'cars', id: car.id}}">
                {{ car.price }}
              </router-link>
            </td>
            <td>
              <router-link class="inline-link" :to="{name: 'change', params: {model: 'cars', id: car.id}}">
                {{ car.country.name }}
              </router-link>
            </td>
            <td>
              <router-link class="inline-link" :to="{name: 'change', params: {model: 'cars', id: car.id}}">
                {{ car.carParts }}
              </router-link>
            </td>
            <td class="delete-buttons">
              <div>
                <span @click="$emit('remove', car)" class="delete-button">&#x2716;</span>
              </div>
            </td>

          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <transition name="without-cars">
      <div v-show="cars.length === 0" class="no-items">
        <div class="item-content">
          <img class="image" src="../../images/cars.jpg" alt="Car">
        </div>
        <div class="text-content">
          <h2>Нет записей</h2>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "CarsList",
  props: {
    cars: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {}
  },
}
</script>

<style scoped>

.inline-link {
  top: 0;
  color: black !important;
  font-size: 1em !important;
  transform: translateY(-50%);
  transition: .2s;
}

.inline-link::after {
  background: black !important;
}

.inline-link:hover {
  top: -3px;
}

.cars-list-enter-active, .cars-list-leave-active {
  transition: all .6s;
}

.cars-list-enter, .cars-list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.cars-list-move {
  transition: transform .6s;
}

.without-cars-enter-active, .without-cars-leave-active {
  transition: all .5s;
}

.without-cars-enter, .without-cars-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

</style>