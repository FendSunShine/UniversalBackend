import Cookie from 'js-cookie'
export default {

    // 这里的state不写,Vue无法检测变化，不响应
    state:{
        isCollapse : false,
        // 面包屑
        routeList: [
            {
                path: "/home",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Main/Home",
            },
        ],
        // aside路由信息
        menuData:[]

    },
    mutations:{
        ClickCollapse(state){
            state.isCollapse = !state.isCollapse
        },
        // 定义切换Tab时，面包屑增加方法
        updataRouteList(state, item){
            // 这一句可以拿到已存在的path
            // console.log(state.routeList.map(it => it.path))
            
            if (item.lable !== '首页'  // 如果不为首页和已存在，才添加
            && state.routeList.findIndex(it => it.path === item.path) == -1)
            {
                state.routeList.push(item)
                // console.log(state.routeList)
            }
        },
        // 本来想把它挂载载Store上，全局调用，但后来发现需要的el的一个组件不支持点击事件，就放回去
        // clickMenu(state,{item, thiser}){
        //     // 防止相同路由跳转
        //     if (thiser.$route.path !== item.path && !(thiser.$route.path == '/home' && item.path == '/')){

        //         thiser.$router.push(item.path)
        //         // 切换Tab时，面包屑增加
        //         thiser.$store.commit("updataRouteList", item)
        //         // console.log(item)
        //     }   

        // },
        // tags 中删除tag
        CloseTag(state, tag){
            const delIndex = state.routeList.findIndex(item => item.name == tag.name)
            state.routeList.splice(delIndex, 1)
        },
        // 存入aside路由信息
        addMenu(state, data){
            state.menuData = data
        },
        // 刷新路由
        refreshRouter(state, router){
            if (Cookie.get('menuData')){
                
                console.log(JSON.parse(Cookie.get('menuData')), 'MenuData of Cookie')
                const newRouter = JSON.parse(Cookie.get('menuData'))
    
                console.log(router.getRoutes(), 'router of store 更新前')
    
                // 添加新路由
                const  newRouterList = []

                newRouter.forEach((item) => {
                    if (item.children) {
                        item.children = item.children.map(it => {
                            it.component = () => import (`../pages/${it.name.slice(0,1).toUpperCase() + it.name.slice(1)}.vue`)
                            return it
                        })
                        newRouterList.push(...item.children)
                    }   else {
                        item.component = () => import (`../pages/${item.url}`)
                        newRouterList.push(item)
                    }
                })
                newRouterList.forEach(item => {
                    router.addRoute('main', item)
                })
                console.log(router.getRoutes(), 'router of store 更新后')
    
            }

        }   
    }
}