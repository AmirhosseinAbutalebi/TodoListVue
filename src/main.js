import { createApp } from 'vue'
import App from './App.vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
createApp(App)
.use(Toast,{
    position : 'top-right',
    rtl : true 
})
.mount('#app')
