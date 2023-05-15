
<template>
    <div>
        <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
        
            <h3>{{isCollapse ? '后台':"后台管理通用系统"}}</h3>

            <el-menu-item @click="clickMenu(item)"  v-for="item in noChildren" :key="item.name" :index="item.name">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{item.label}}</span>
            </el-menu-item>

            <el-submenu  v-for="item in Children" :key="item.label" :index="item.label">
                <template slot="title">
                    <i :class="`el-icon-${item.icon}`"></i>
                    <span slot="title">{{item.label}}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item  @click="clickMenu(it)" v-for="it in  item.children" :key="it.label" :index="it.label">{{it.label}}</el-menu-item>
                </el-menu-item-group>   
            </el-submenu>
        </el-menu>
    </div>

</template>



<script>
import Cookie from 'js-cookie'
export default {
    name: "Aside",

    data() {
        return {
        // isCollapse: false,
        // menuData: [
        //     {
        //     path: "/home",
        //     name: "home",
        //     label: "首页",
        //     icon: "s-home",
        //     url: "Home/Home",
        //     },
        //     {
        //     path: "/mall",
        //     name: "mall",
        //     label: "商品管理",
        //     icon: "video-play",
        //     url: "MallManage/MallManage",
        //     },
        //     {
        //     path: "/user",
        //     name: "user",
        //     label: "用户管理",
        //     icon: "user",
        //     url: "UserManage/UserManage",
        //     },
        //     {
        //     label: "其他",
        //     icon: "location",
        //     children: [
        //         {
        //         path: "/page1",
        //         name: "page1",
        //         label: "页面1",
        //         icon: "setting",
        //         url: "Other/PageOne",
        //         },
        //         {
        //         path: "/page2",
        //         name: "page2",
        //         label: "页面2",
        //         icon: "setting",
        //         url: "Other/PageTwo",
        //         },
        //     ],
        //     },
        
        // ],
        menuData: [],
        };
    },
    computed:{
        // 没有子菜单
        noChildren(){
            return  this.menuData.filter(item => !item.children)
        },
        Children(){
            return  this.menuData.filter(item => item.children)
        },
        isCollapse(){
            return this.$store.state.Tab.isCollapse
        },
    },
    methods: {
        handleOpen(key, keyPath) {
        // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
        // console.log(key, keyPath);
        },
        clickMenu(item){
            // 防止相同路由跳转
            if (this.$route.path !== item.path && !(this.$route.path == '/home' && item.path == '/')){

                this.$router.push(item.path)
                // 切换Tab时，面包屑增加
                this.$store.commit("updataRouteList", item)
                // console.log(item)
            }   
            // 本来想把它挂载载Store上，全局调用，但后来发现需要的el的一个组件不支持点击事件，就放回去
            // this.$store.commit('clickMenu', {item:item, thiser:this})
        },
    },
    mounted(){
        // console.log(this.$store.state.Tab.menuData, 'menu of Aside')
        //  如果刷新了store没有就去Cookie加载
        // console.log(JSON.parse(Cookie.get('menuData')), '刷新之后的Cookie')
        this.menuData = JSON.parse(Cookie.get('menuData')) || this.$store.state.Tab.menuData // 后面目前貌似不需要，cookie与store都是在相同时间存在的，反而store会因为刷新而数据消失
    }
};
</script>

<style lang='less' ecoped>

    .el-menu {
        border-right: none !important;
        height: 100vh;
        h3 {
            color: #fff;
            text-align: center;
        }
    }
    .el-menu-item {
        width: 200px
    }
    .el-aside {
        overflow: hidden !important;
    }
// .el-menu-vertical-demo:not(.el-menu--collapse) {
//     /* width: 200px; */
    
//     /* min-height: 400px; */

// }
</style>