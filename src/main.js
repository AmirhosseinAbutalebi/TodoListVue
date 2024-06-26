import { createApp } from 'vue'
import App from './App.vue'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css'
createApp(App)
.use(VueToast,{
    position : 'top-left' 
})
.mount('#app')
