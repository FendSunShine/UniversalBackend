import Vue from 'vue'
import Vuex from 'vuex'
import Tab from './Tab'
// Vuex 必须先使用再创建
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        Tab,
    }
})