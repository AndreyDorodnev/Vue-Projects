import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

export const eventEmitter = new Vue()

Vue.use(Vuelidate);

new Vue({
  render: h => h(App),
}).$mount('#app')
