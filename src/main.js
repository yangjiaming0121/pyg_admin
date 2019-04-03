import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/css/index.css'
import dayjs from 'dayjs'

Vue.filter('dataformat', function (value) {
  return dayjs(value).format('YYYY-MM-DD hh-mm-ss')
})
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
