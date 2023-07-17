import axios from "axios";
import store from "@/store";

axios.defaults.baseURL = 'https://mihakurd2003.pythonanywhere.com';

const instance = axios.create({
  baseURL: 'https://mihakurd2003.pythonanywhere.com'
})

instance.interceptors.request.use((config) => {
  const token = store.state.car.token
  if (token) {
    config.headers.Authorization = `Token ${token}`
  }
  return config
})

export default {
  install(Vue) {
    Vue.prototype.$myAxios = instance
  }
}