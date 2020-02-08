import Vue from 'vue'
import App from './App.vue'
import store from './components/store'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

export const eventEmitter = new Vue()

Vue.use(Vuelidate);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
