<template>
  <div>
    <div v-show="countries.length > 0">
      <div>
        <table id="app-table">
          <caption>Страны</caption>
          <thead is="transition-group" name="countries-list">
          <tr>
            <th>id</th>
            <th>Название</th>
            <th>Столица</th>
            <th>Телефонный код</th>
          </tr>
          </thead>
          <tbody is="transition-group" name="countries-list">
          <tr v-for="country in countries" :key="country.id">
            <td>{{ country.id }}</td>
            <td>{{ country.name }}</td>
            <td>{{ country.capital }}</td>
            <td>{{ country.phoneCode }}</td>
            <td class="delete-buttons">
              <span @click="openChangePage(country.id)" class="change-button fa fa-edit inline-link"></span>
              <span @click="$emit('remove', country)" class="delete-button inline-link">&#x2718;</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <transition name="without-countries">
      <div v-show="countries.length === 0" class="no-items">
        <div class="item-content">
          <img class="image" src="../../images/countries.jpg" alt="Car">
        </div>
        <div class="text-content">
          <h3>Нет записей</h3>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "CountriesList",
  props: {
    countries: {
      type: Array,
      required: true,
    }
  },
  methods: {
    openChangePage(idCountry) {
      this.$router.push(`/change/countries/${idCountry}`)
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

.countries-list-enter-active, .countries-list-leave-active {
  transition: all .6s;
}

.countries-list-enter, .countries-list-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.countries-list-move {
  transition: transform .6s;
}

.without-countries-parts-enter-active, .without-countries-parts-leave-active {
  transition: all .5s;
}

.without-countries-parts-enter, .without-countries-parts-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>