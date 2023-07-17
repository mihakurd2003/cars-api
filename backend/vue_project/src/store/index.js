import Vue from "vue";
import Vuex from "vuex";
import {carsStore} from "@/store/carsStore";


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    car: carsStore
  },
})