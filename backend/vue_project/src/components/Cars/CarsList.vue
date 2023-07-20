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
            <td>{{ car.id }}</td>
            <td>{{ car.brand }}</td>
            <td>{{ car.model }}</td>
            <td>{{ car.price }}</td>
            <td>{{ car.country.name }}</td>
            <td>{{ car.carParts }}</td>
            <td class="delete-buttons">
              <span @click="openChangePage(car.id)" class="change-button fa fa-edit inline-link"></span>
              <span @click="$emit('remove', car)" class="delete-button inline-link">&#x2718;</span>
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
  methods: {
    openChangePage(idCar) {
      this.$router.push(`/change/cars/${idCar}`)
    }
  }
}
</script>

<style scoped>

.inline-link {
  top: 0;
  font-size: 1em !important;
  transition: .2s;
}

.inline-link::after {
  background: #eee !important;
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