<template>
    <div class="tags">
        <el-tag 
        v-for="tag,index in tags" :key="tag.name" 
        :closable="tag.label !== '首页'" 
        @close='closeTag(tag, index)'
        @click="toRoute(tag, index)"
        size="small"
        :effect='(($route.path == tag.path) 
        || ($route.path == "/home" && tag.path == "/")) ? "dark" : "light"'
        >
        {{ tag.label }}
        </el-tag>
    </div>
</template>

            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            },
<script>
export default {
    name: "Tags",
        data() {
            return {
            tags: this.$store.state.Tab.routeList
            };
        },
    mounted(){
    },
    methods:{
        closeTag(tag, index){

            // 操作routeList删除它
            this.$store.commit("CloseTag", tag)
            // 删除的是现在所显示的
            if(tag.path === this.$route.path){
                //  删除的是最后的则向前跳转
                if (this.tags.length == index) {
                    this.$router.push(this.tags[index-1].path)
                } else {
                    this.$router.push(this.tags[index].path)
                }
            }

            
        },
        toRoute(tag) {
            this.$router.push(tag.path)
        }
    }
};
</script>

<style lang="less" scoped>
    .tags {
        margin-bottom: 10px;
        .el-tag {
            margin-right: 10px;
            cursor: pointer;
        }
    }
</style>