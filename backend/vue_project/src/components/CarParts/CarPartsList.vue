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
            <td>
              <router-link class="inline-link" :to="{name: 'change', params: {model: 'car-parts', id: carPart.id}}">
                {{ carPart.id }}
              </router-link>
            </td>
            <td>
              <router-link class="inline-link" :to="{name: 'change', params: {model: 'car-parts', id: carPart.id}}">
                {{ carPart.name }}
              </router-link>
            </td>
            <td>
              <router-link class="inline-link" :to="{name: 'change', params: {model: 'car-parts', id: carPart.id}}">
                {{ carPart.brand }}
              </router-link>
            </td>
            <td>
              <router-link class="inline-link" :to="{name: 'change', params: {model: 'car-parts', id: carPart.id}}">
                {{ carPart.price }}
              </router-link>
            </td>
            <td>
              <router-link class="inline-link" :to="{name: 'change', params: {model: 'car-parts', id: carPart.id}}">
                {{ carPart.country.name }}
              </router-link>
            </td>
            <td class="delete-buttons">
              <span @click="$emit('remove', carPart)" class="delete-button">&#x2716;</span>
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
    }
  }
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