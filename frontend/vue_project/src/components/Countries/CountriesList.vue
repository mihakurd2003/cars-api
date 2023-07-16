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
            <td>
              <router-link class="inline-link" :to="{name: 'change', params: {model: 'countries', id: country.id}}">
                {{ country.id }}
              </router-link>
            </td>
            <td>
              <router-link class="inline-link" :to="{name: 'change', params: {model: 'countries', id: country.id}}">
                {{ country.name }}
              </router-link>
            </td>
            <td>
              <router-link class="inline-link" :to="{name: 'change', params: {model: 'countries', id: country.id}}">
                {{ country.capital }}
              </router-link>
            </td>
            <td>
              <router-link class="inline-link" :to="{name: 'change', params: {model: 'countries', id: country.id}}">
                {{ country.phoneCode }}
              </router-link>
            </td>
            <td class="delete-buttons">
              <span @click="$emit('remove', country)" class="delete-button">&#x2716;</span>
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