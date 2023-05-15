import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
Vue.config.productionTip = false
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// import { Button } from 'element-ui';
// Vue.component(Button.name, Button);
// Vue.use(Button)

Vue.use(VueRouter)

// 导入路由
import router from './Router'
// 导入Store
import store from './Store/index'
import './api/mock'

new Vue({
    render: h => h(App),
    router: router,
    store: store,
    mounted() {
        console.log('欸嘿，我渲染了')
        this.$store.commit('refreshRouter',router)
    },
    // bef(){
    //     

    // }
}).$mount('#app')
