<template>
  <div>
    <div v-show="carParts.length > 0">
      <div>
        <table id="app-table">
          <caption>Запчасти</caption>
          <thead is="transition-group" name="car-parts-list">
          <tr>
            <th>id</th>
            <th>Название</th>
            <th>Марка</th>
            <th>Цена</th>
            <th>Страна производства</th>
          </tr>
          </thead>
          <tbody is="transition-group" name="car-parts-list">
          <tr v-for="carPart in carParts" :key="carPart.id">
            <td>{{ carPart.id }}</td>
            <td>{{ carPart.name }}</td>
            <td>{{ carPart.brand }}</td>
            <td>{{ carPart.price }}</td>
            <td>{{ carPart.country.name }}</td>
            <td class="delete-buttons">
              <span @click="openChangePage(carPart.id)" class="change-button fa fa-edit inline-link"></span>
              <span @click="$emit('remove', carPart)" class="delete-button inline-link">&#x2718;</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <transition name="without-car-parts">
      <div v-show="carParts.length === 0" class="no-items">
        <div class="item-content">
          <img class="image" src="../../images/car-parts.png" alt="Car">
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
  name: "CarPartsList",
  props: {
    carParts: {
      type: Array,
      required: true,
    },
    isEnterDelete: Boolean
  },
  data() {
    return {}
  },
  methods: {
    openChangePage(idCarPart) {
      this.$router.push(`/change/car-parts/${idCarPart}`)
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

.car-parts-list-enter-active, .car-parts-list-leave-active {
  transition: all .6s;
}

.car-parts-list-enter, .car-parts-list-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.car-parts-list-move {
  transition: transform .6s;
}

.without-car-parts-enter-active, .without-car-parts-leave-active {
  transition: all .5s;
}

.without-car-parts-enter, .without-car-parts-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>