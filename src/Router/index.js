
import VueRouter from 'vue-router'
import Cookie from 'js-cookie'
import Main from '../pages/Main.vue'
import Home from '../pages/Home.vue'
import User from '../pages/User.vue'
import Mall from '../pages/Mall.vue'
import Page1 from '../pages/PageOne.vue'
import Page2 from '../pages/PageTwo.vue'
import Login from '../pages/Login.vue'

// 创建路由
const router =  new VueRouter({
    model: 'hash',
    routes:[
        {
            path: '/',
            name:'main',
            component: Main,
            redirect: '/home',
            // children: [
            //     {
            //         path: '/home',
            //         component: Home
            //     },
            //     {
            //         path: 'user',
            //         component: User
            //     },
            //     {
            //         path: 'mall',   // 商品管理
            //         component: Mall
            //     },
            //     {
            //         path: 'page1',
            //         component: Page1
            //     },
            //     {
            //         path: 'page2',
            //         component: Page2
            //     },
            // ],

        },
        {
            path: '/login',
            component: Login,
        }
    ]
})

// 动态添加路由不能加在这里,只有Vue第一次挂载（每次刷新）才会用这个，需要在login里面刷新路由
// router

router.beforeEach((to, from, next) => {
    const token = Cookie.get('token')

    if (!token && to.path !== '/login'){
        next({path: '/login'})
    }   else if (token && to.path == '/login'){
        next({path: '/home'})
    }   else {
        next()
    }
    
})



export default router