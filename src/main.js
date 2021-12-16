import Vue from 'vue'
import App from './App.vue'

//navigation
import router from "./router";

//vuex(stores)
import store from "./store";

//css and responsive design
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
